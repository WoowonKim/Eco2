function updateOptions(options) {
  const update = { ...options };
  if (!!options) {
    update.headers = {
      ...update.headers,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
