import { p2e } from "@/utils/replaceNumber";

function TextInput({
  title,
  name,
  profileData,
  setProfileData,
  textarea = false,
}) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: p2e(value) });
  };

  const baseInputClasses =
    "w-full md:w-[300px] text-gray-700 text-base border border-dashed border-primary rounded-md px-3 py-2 mb-10 focus:border-solid focus:outline-none transition-all duration-200";

  return (
    <div className="flex flex-col">
      <p className="text-lg mb-2 font-medium">{title}</p>
      {textarea ? (
        <textarea
          type="text"
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
          className={`${baseInputClasses} h-[100px] resize-y`}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={profileData[name]}
          onChange={changeHandler}
          className={`${baseInputClasses} h-10`}
        />
      )}
    </div>
  );
}

export default TextInput;
