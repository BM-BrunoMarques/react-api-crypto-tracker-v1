export const formatPrice = (price) => {
  if (!Number(price)) {
    return "?";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let currency;
  let numberString = formatter
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

  const decimalsOverZero = numberString.split(".")[1] === "00";

  if (decimalsOverZero) {
    numberString = numberString.substring(0, numberString.length - 3);
  }

  return `${currency}${numberString}`;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatPercentage = (number) => {
  if (!Number(number)) {
    return "?";
  }
  return parseFloat(number).toFixed(1).concat("%");
};
