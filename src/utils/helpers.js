export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  });

  let currency;
  const numberString = formatter
    .formatToParts(price)
    .map(({ type, value }) => {
      switch (type) {
        case "currency": {
          currency = value;
          return "";
        }
        default:
          return value;
      }
    })
    .reduce((string, part) => string + part);

  return `${currency}${numberString}`;
};

export const formatPercentage = (number) => {
  if (!Number(number)) {
    return '?';
  }
  return parseFloat(number).toFixed(1).concat("%");
};
