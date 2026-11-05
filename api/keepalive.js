// Runs once a day (see vercel.json) so the free Supabase database never counts as idle and pauses.
// Uses only the public key, and reads nothing: the database rules return an empty list to anyone not signed in.
module.exports = async function handler(req, res) {
  const url = "https://kjwwrvuttizooownqyix.supabase.co/rest/v1/settings?select=owner_id&limit=1";
  const key = "sb_publishable_3pDMzKXzxSY61zZjfnt6EQ_42g-frJL";
  try {
    const r = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    res.status(200).json({ ok: r.ok, status: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
