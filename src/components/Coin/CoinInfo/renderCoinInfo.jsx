import { months } from "../../../utils/const";
import {formatDate} from "../../../utils/helpers"

export const renderCoinInfo = ({ data, label, type, addClass, separator }) => {
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
