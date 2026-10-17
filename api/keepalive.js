// Daily ping (Vercel Cron, schedule in vercel.json) so the free Supabase projects always show database
// activity and are not paused for inactivity. Uses only the public browser keys; reads nothing private.
const PROJECTS = [
  ['kz-language', 'https://xbppttgyxsyvitquemis.supabase.co', 'sb_publishable_TqyfKfW3yN1llgKUnC8m7A_tVyzBysI'],
  ['nihao', 'https://xoouiirwuxseazhyspkx.supabase.co', 'sb_publishable_WXdAkP8OruXyyfafivVQKA_gw3l6Wvl']
];

module.exports = async (req, res) => {
  const status = {};
  await Promise.all(PROJECTS.map(async ([name, url, key]) => {
    try {
      // A tiny query against a real table; row-level security returns nothing, but the database is touched.
      const r = await fetch(url + '/rest/v1/test_results?select=id&limit=1', { headers: { apikey: key }, signal: AbortSignal.timeout(10000) });
      status[name] = r.status;
    } catch (e) { status[name] = 'unreachable'; }
  }));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify({ ok: true, at: new Date().toISOString(), status }));
};
