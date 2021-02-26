import { months } from "./const";

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

export const formatPercentage = (data) => {
  if (!Number(data)) {
    return "?";
  }

  return parseFloat(data).toFixed(1).concat("%");
};

export const formatDate = (data) => {
  const dateConverted = new Date(data[0]);

  const month = dateConverted.getMonth() + 1;
  const day = dateConverted.getDate();
  const year = dateConverted.getFullYear();
  const hour = dateConverted.getHours();
  const minute = dateConverted.getMinutes();

  return { month, day, year, hour, minute };
};

export const renderInfo = (data, label, convertData) => {
  if (
    (typeof data === "object" && !Number(data[0])) ||
    (typeof data !== "object" && !Number(data))
  ) {
    return;
  }

  return (
    <div className="tagRow">
      <div className="tagLegend">{label}</div>
      {typeof data === "object" ? (
        <div className="info">
          {convertData(data[0])} / {convertData(data[1])}
        </div>
      ) : (
        <div className="info">{convertData(data)}</div>
      )}
    </div>
  );
};

export const renderBottomInfo = ({
  data,
  label,
  type,
  addClass,
  separator,
}) => {
  const addClassCategory = (data) => {
    const classes = [];
    classes.push(data.includes("-") ? "negative " : "");
    classes.push(data.includes("%") ? "percent " : "");
    classes.push(data.includes("$") ? "currency " : "");
    const classDate = () => {
      for (let month of months) {
        if (data.includes(month)) {
          return true;
        }
      }
      return false;
    };

    classes.push(classDate() ? "date" : "");
    classes.push();
    return classes.join("").toString();
  };

  const convertedData = [];
  const multiple = typeof data === "object" ? true : false;

  if (multiple) {
    data.map((data, indx) => {
      let converted;
      if (type[indx] === formatDate) {
        const { month, day, year } = type[indx](data);
        converted = `${day} ${months[month - 1]} ${year}`;
      } else {
        converted = type[indx](data);
      }
      convertedData.push(converted);
    });
  } else {
    convertedData.push(type(data));
  }

  return (
    <div key={label} className="tagRow">
      <div className="tagLegend">{label}</div>
      <div className={`info ${addClass}`}>
        {convertedData.map((data, indx) => (
          <span
            key={`${addClass}${label}${indx ** 2}`}
            className={`${addClassCategory(data)}`}
          >
            {data}
            {separator && <span className="separator">{separator[indx]}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};
