function RadioList({ profileData, setProfileData }) {
  const { category } = profileData;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const radioItems = [
    { id: "villa", label: "ویلا" },
    { id: "apartment", label: "آپارتمان" },
    { id: "store", label: "مغازه" },
    { id: "office", label: "دفتر" },
  ];

  return (
    <div className="mb-10">
      <p className="text-lg mb-2">دسته بندی</p>
      <div className="flex flex-wrap gap-4">
        {radioItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-primary/10 text-primary px-3 py-1.5 rounded-md cursor-pointer min-w-[70px] hover:bg-primary/20 transition-colors duration-200"
          >
            <label htmlFor={item.id} className="cursor-pointer">
              {item.label}
            </label>
            <input
              type="radio"
              name="category"
              value={item.id}
              id={item.id}
              checked={category === item.id}
              onChange={changeHandler}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
      <input
        type="radio"
        name="category"
        value="office"
        id="office"
        checked={category === "office"}
        onChange={changeHandler}
      />
    </div>
  );
}

export default RadioList;
