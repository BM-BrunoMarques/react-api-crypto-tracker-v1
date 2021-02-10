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
  const coinReq = await fetch(`
  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${pageNum}&sparkline=true&price_change_percentage=1h,24h,7d`);
  return coinReq.json();
}

export async function getAllCoinsList() {
  const coinReq = await fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false");
  const coinRes = await coinReq.json();

  const coinList = coinRes.map(({ name, id }) => {
    const coin = {value: id, label: name}
    return coin;
  });

  return coinList
  };

  // .then(({ name, id }) => {
  //   test.push({ name, id });
  //   console.log("here : ", test);
  //   // return test.push({name, id})
  // });
  // .then((response) => {
  //   // return response
  //   let searchCoins = [];
  //   response.map((coin) => {
  //     searchCoins.push({ coin });
  //   });
  //   return searchCoins;
  // });
// }

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
