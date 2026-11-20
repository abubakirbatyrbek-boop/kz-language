// Vercel serverless function: reads a machine-translated sentence aloud (translate.html), for signed-in learners.
// Sentences from the courses have recorded clips; this is only for text that has none. Same Azure Speech key,
// voices and rate as the course recordings (tools\gen-audio.ps1). Returns audio/mpeg.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xbppttgyxsyvitquemis.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_TqyfKfW3yN1llgKUnC8m7A_tVyzBysI'; // public browser key
const VOICES = { kk: ['kk-KZ', 'kk-KZ-AigulNeural'], ru: ['ru-RU', 'ru-RU-SvetlanaNeural'] };
const MAX_CHARS = 300;

function fail(res, status, error) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ error }));
}
const escapeXml = s => s.replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') return fail(res, 405, 'method');
  const key = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) return fail(res, 503, 'not_configured');

  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return fail(res, 401, 'login');
  const who = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token } });
  if (!who.ok) return fail(res, 401, 'login');

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  const voice = VOICES[body?.lang], text = String(body?.text || '').trim();
  if (!voice || !text || text.length > MAX_CHARS) return fail(res, 400, 'input');

  const ssml = `<speak version='1.0' xml:lang='${voice[0]}'><voice name='${voice[1]}'><prosody rate='-20%'>${escapeXml(text)}</prosody></voice></speak>`;
  try {
    const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST', body: ssml, signal: AbortSignal.timeout(15000),
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'kz-language' }
    });
    if (r.status === 401 || r.status === 403) return fail(res, 502, 'azure_key');
    if (r.status === 429) return fail(res, 429, 'azure_quota');
    if (!r.ok) return fail(res, 502, 'azure_' + r.status);
    const audio = Buffer.from(await r.arrayBuffer());
    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'private, max-age=86400');
    res.end(audio);
  } catch (e) {
    return fail(res, 502, 'azure_timeout');
  }
};
