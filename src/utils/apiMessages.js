export function translateApiCode(t, code) {
  if (!code) return "";
  const key = `api.${code}`;
  const translated = t(key);
  return translated === key ? code : translated;
}
