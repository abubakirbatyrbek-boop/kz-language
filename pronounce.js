// Vercel serverless function: pronunciation scoring for signed-in learners.
// The Azure key lives only in Vercel's environment variables (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION);
// browsers send a 16 kHz WAV and get scores back, never the key.
// Each account may score DAILY_LIMIT recordings per day (Almaty time), counted in Supabase table pron_usage.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xbppttgyxsyvitquemis.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_TqyfKfW3yN1llgKUnC8m7A_tVyzBysI'; // public browser key
const DAILY_LIMIT = 10;
const MAX_WAV_BYTES = 44 + 16000 * 2 * 16; // 16 seconds of 16 kHz mono 16-bit audio
const LOCALES = { kk: 'kk-KZ', ru: 'ru-RU' };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// Start of today in Almaty (UTC+5), as an ISO timestamp.
function dayStart() {
  const offset = 5 * 3600e3;
  return new Date(Math.floor((Date.now() + offset) / 86400e3) * 86400e3 - offset).toISOString();
}

async function supabase(path, token, init = {}) {
  return fetch(SUPABASE_URL + path, { ...init, headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token, ...(init.headers || {}) } });
}

async function assess(wav, locale, text, key, region) {
  const config = { ReferenceText: text, GradingSystem: 'HundredMark', Granularity: 'Word', Dimension: 'Comprehensive', EnableMiscue: true };
  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${locale}&format=detailed`;
  let last = null;
  for (let attempt = 0; attempt < 2; attempt++) { // Azure occasionally stalls; one retry
    try {
      const r = await fetch(url, {
        method: 'POST', body: wav, signal: AbortSignal.timeout(12000),
        headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          'Pronunciation-Assessment': Buffer.from(JSON.stringify(config), 'utf8').toString('base64') }
      });
      if (r.status === 401 || r.status === 403) return { error: 'azure_key' };
      if (r.status === 429) return { error: 'azure_quota' };
      if (!r.ok) { last = 'azure_' + r.status; continue; }
      return { data: await r.json() };
    } catch (e) { last = 'azure_timeout'; }
  }
  return { error: last || 'azure_failed' };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'method' });
  const key = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) return send(res, 503, { error: 'not_configured' });

  // 1. Signed-in users only: the browser forwards its Supabase session token.
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return send(res, 401, { error: 'login' });
  const who = await supabase('/auth/v1/user', token);
  if (!who.ok) return send(res, 401, { error: 'login' });
  const user = await who.json();

  // 2. Input: {lang: 'kk'|'ru', text, audio: base64 WAV}
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  const locale = LOCALES[body?.lang], text = String(body?.text || '').trim().slice(0, 300);
  if (!locale || !text || typeof body.audio !== 'string') return send(res, 400, { error: 'input' });
  const wav = Buffer.from(body.audio, 'base64');
  if (wav.length < 1000 || wav.length > MAX_WAV_BYTES || wav.toString('ascii', 0, 4) !== 'RIFF') return send(res, 400, { error: 'audio' });

  // 3. Daily limit, counted with the user's own token (row-level security: users see only their rows).
  const since = encodeURIComponent(dayStart());
  const countRes = await supabase(`/rest/v1/pron_usage?select=id&user_id=eq.${user.id}&created_at=gte.${since}`, token, { headers: { Prefer: 'count=exact', Range: '0-0' } });
  if (!countRes.ok) return send(res, 500, { error: 'usage' });
  const used = Number((countRes.headers.get('content-range') || '').split('/')[1]) || 0;
  if (used >= DAILY_LIMIT) return send(res, 429, { error: 'limit', limit: DAILY_LIMIT, left: 0 });

  // 4. Score with Azure.
  const result = await assess(wav, locale, text, key, region);
  if (result.error) return send(res, 502, { error: result.error });
  const best = result.data?.NBest?.[0];
  if (result.data?.RecognitionStatus !== 'Success' || !best) return send(res, 200, { error: 'nomatch', left: DAILY_LIMIT - used });
  const pa = best.PronunciationAssessment || best;
  const words = (best.Words || []).map(w => {
    const p = w.PronunciationAssessment || w;
    return { word: w.Word, score: Math.round(p.AccuracyScore ?? 0), error: p.ErrorType || 'None' };
  });
  const total = Math.round(pa.PronScore ?? pa.AccuracyScore ?? 0);

  // 5. Count this attempt only after a real score.
  await supabase('/rest/v1/pron_usage', token, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ user_id: user.id, lang: body.lang, score: total })
  }).catch(() => {});

  send(res, 200, {
    total, accuracy: Math.round(pa.AccuracyScore ?? 0), fluency: Math.round(pa.FluencyScore ?? 0),
    completeness: Math.round(pa.CompletenessScore ?? 0), words, limit: DAILY_LIMIT, left: Math.max(0, DAILY_LIMIT - used - 1)
  });
};
