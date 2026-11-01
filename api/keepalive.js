// Daily ping (Vercel Cron, schedule in vercel.json) so the free Supabase projects always show database
// activity and are not paused for inactivity. Uses only the public browser keys; reads nothing private.
// A query the database refuses (e.g. "permission denied", HTTP 401) may not count as activity — the
// kz-language project was paused on 2026-10-30 while every ping got 401 — so each ping must succeed.
const PROJECTS = [
  // public.keepalive() returns 1 and is executable by anon (D:\claude\kz保持数据库活跃.sql).
  ['kz-language', 'https://xbppttgyxsyvitquemis.supabase.co', 'sb_publishable_TqyfKfW3yN1llgKUnC8m7A_tVyzBysI', 'rpc'],
  // test_results is readable by anon in this project, so a one-row select succeeds.
  ['nihao', 'https://xoouiirwuxseazhyspkx.supabase.co', 'sb_publishable_WXdAkP8OruXyyfafivVQKA_gw3l6Wvl', 'table']
];

async function ping(url, key, how) {
  const opts = { headers: { apikey: key, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(10000) };
  if (how === 'rpc') {
    const r = await fetch(url + '/rest/v1/rpc/keepalive', { ...opts, method: 'POST', body: '{}' });
    if (r.status !== 404) return r.status;
    // The function is not created yet: fall back to touching a table so the ping is not empty.
  }
  return (await fetch(url + '/rest/v1/test_results?select=id&limit=1', opts)).status;
}

module.exports = async (req, res) => {
  const status = {};
  await Promise.all(PROJECTS.map(async ([name, url, key, how]) => {
    try { status[name] = await ping(url, key, how); } catch (e) { status[name] = 'unreachable'; }
  }));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  // ok only when every project answered 200, so a failing ping shows up when someone checks the URL.
  res.end(JSON.stringify({ ok: Object.values(status).every(s => s === 200), at: new Date().toISOString(), status }));
};
