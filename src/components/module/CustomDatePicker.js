import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function CustomDatePicker({ profileData, setProfileData }) {
  const changeHandler = (e) => {
    const date = new Date(e);
    setProfileData({ ...profileData, constructionDate: date });
  };

  return (
    <div className="mb-16 animate-fadeIn">
      <p className="mb-2 text-base">تاریخ ساخت</p>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.constructionDate}
        onChange={changeHandler}
        calendarPosition="bottom-right"
        inputClass="w-[110px] border border-dashed border-primary text-gray-600 rounded-md px-3 py-2 text-base h-[38px] text-center focus:border-solid focus:outline-none transition-all duration-200"
      />
    </div>
  );
}

export default CustomDatePicker;
