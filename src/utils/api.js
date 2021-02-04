import { params } from "./params.js";

// export function servicePing() {
//   return fetch("https://api.coingecko.com/api/v3/ping")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

// let allCoins = async () => {
//   return fetch("https://api.coingecko.com/api/v3/coins/list")
//     .then((response) => response.json())
//     .then((data) => data.length);
// };

export async function getCoins(pageNum) {
  console.log("returnFunc", pageNum);
  return fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${pageNum}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  ).then((response) => {
    return response.json();
  });
}

export async function getAllCoinsList() {
  return fetch("https://api.coingecko.com/api/v3/coins/list").then((response) =>
    response.json()
  );
}

// export const getFirstCoins = () => {
//   return firstFetch().then((result) => result);
// }

// export function getAllCoins() {
//   allCoins().then((numOfCoins) => {
//     console.log(numOfCoins.length)
//     let numOfFetch = Math.ceil(numOfCoins / params.maxApiListCalls)
//     console.log(numOfFetch)
//     for (let i = 0; i < numOfFetch; i++)
//     {
//       let fetchPage = i + 1;
//       fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${fetchPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
//       )
//       .then((response) => response.json())
//       .then((data) => console.log('allcoins: ',data));
//     }
//     return
//   });
// }
