import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function PersianDate({ date, withTime = false }) {
  if (!date) return <span>نامشخص</span>;

  const d = new DateObject(date)
    .set("calendar", persian)
    .set("locale", persian_fa);

  if (withTime) {
    return <span>{d.format("dddd D MMMM YYYY - HH:mm")}</span>;
  }

  return <span>{d.format("D MMMM YYYY")}</span>;
}
