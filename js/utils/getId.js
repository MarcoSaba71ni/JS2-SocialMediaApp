export function getIdFromUrl(param = "id") {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}
