import { formatDate } from "./helpers";

export async function getCoins(pageNum) {
  const coinReq = await fetch(`
  https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=${pageNum}&sparkline=true&price_change_percentage=1h,24h,7d`);
  return coinReq.json();
}

export async function getSelectedCoin(coin, days) {
  const interval = () => {
    if (days === 1) {
      return "hourly";
    }
    return "daily";
  };
  const coinReq = await fetch(`
  https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days.toString()}&interval=${interval()}`);

  const coinRes = await coinReq.json();
  const coinList = coinRes.prices.map((data) => {
    const { month, day, year, hour, minute } = formatDate(data);
    const price = data[1];

    switch (true) {
      case days === 1:
        return { date: `${hour}:${minute}`, price: price };
      case days <= 60:
        return {
          date: `${month}-${day}-${year}`,
          price: price,
        };
      case days <= 180:
        return {
          date: `${month}-${day}-${year - 2000}`,
          price: price,
        };
      default:
        return {
          date: `${month}-${year - 2000}`,
          price: price,
        };
    }
  });

  return coinList;
}

export async function getSelectedCoinData(coin) {
  const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
  return await coinReq.json();
}

export async function getAllCoinsList() {
  const coinReq = await fetch(
    "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
  );
  const coinRes = await coinReq.json();

  const coinList = coinRes.map(({ name, id }) => {
    const coin = { value: id, label: name };
    return coin;
  });

  return coinList;
}