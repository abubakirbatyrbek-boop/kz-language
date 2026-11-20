// Vercel serverless function: machine translation for signed-in learners (translate.html).
// Chinese goes to Kazakh and Russian; Kazakh or Russian goes to Chinese. Azure Translator does the work; its key
// lives only in Vercel's environment variables (AZURE_TRANSLATOR_KEY, plus AZURE_TRANSLATOR_REGION unless the
// resource is "global"). Sign-in keeps strangers from using up the free monthly quota.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xbppttgyxsyvitquemis.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_TqyfKfW3yN1llgKUnC8m7A_tVyzBysI'; // public browser key
const MAX_CHARS = 200;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return send(res, 405, { error: 'method' });
  const key = process.env.AZURE_TRANSLATOR_KEY, region = process.env.AZURE_TRANSLATOR_REGION;
  if (!key) return send(res, 503, { error: 'not_configured' });

  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return send(res, 401, { error: 'login' });
  const who = await fetch(SUPABASE_URL + '/auth/v1/user', { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token } });
  if (!who.ok) return send(res, 401, { error: 'login' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  const text = String(body?.text || '').trim();
  if (!text) return send(res, 400, { error: 'input' });
  if (text.length > MAX_CHARS) return send(res, 400, { error: 'too_long', max: MAX_CHARS });

  const chinese = /[㐀-鿿]/.test(text);
  const params = chinese ? 'from=zh-Hans&to=kk&to=ru' : 'to=zh-Hans';
  const headers = { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json; charset=UTF-8' };
  if (region) headers['Ocp-Apim-Subscription-Region'] = region;
  try {
    const r = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&' + params, {
      method: 'POST', headers, body: JSON.stringify([{ Text: text }]), signal: AbortSignal.timeout(10000)
    });
    if (r.status === 401 || r.status === 403) return send(res, 502, { error: 'azure_key' });
    if (r.status === 429) return send(res, 429, { error: 'azure_quota' });
    if (!r.ok) return send(res, 502, { error: 'azure_' + r.status });
    const [out] = await r.json();
    const by = Object.fromEntries((out?.translations || []).map(t => [t.to, t.text]));
    if (chinese) return send(res, 200, { kk: by.kk || '', ru: by.ru || '' });
    return send(res, 200, { zh: by['zh-Hans'] || '', from: out?.detectedLanguage?.language || '' });
  } catch (e) {
    return send(res, 502, { error: 'azure_timeout' });
  }
};
