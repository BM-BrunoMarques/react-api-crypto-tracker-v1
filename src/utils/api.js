export function servicePing() {
  return fetch("https://api.coingecko.com/api/v3/ping")
    .then((response) => response.json())
    .then((data) => console.log(data));
}