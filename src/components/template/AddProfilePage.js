"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import RadioList from "@/module/RadioList";
import TextInput from "@/module/TextInput";
import TextList from "@/module/TextList";
import CustomDatePicker from "@/module/CustomDatePicker";
import Loader from "@/module/Loader";

function AddProfilePage({ data }) {
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    size: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
    // اگر از قبل عکس داشته باشه (مثلاً آرایه از URLها)
    images: data?.images || [],
  });

  // فایل‌های جدید که کاربر انتخاب کرده
  const [newImages, setNewImages] = useState([]);
  // پیش‌نمایش برای فایل‌های جدید
  const [imagePreviews, setImagePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setProfileData(data);
      // اگر در حالت ویرایش هستیم، پیش‌نمایش عکس‌های قبلی رو هم نشون بده
      if (data.images?.length) {
        setImagePreviews(data.images.map((url) => ({ url, isExisting: true })));
      }
    }
  }, [data]);

  // هندل کردن انتخاب فایل‌ها
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);

    // ساخت پیش‌نمایش
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [
          ...prev,
          { url: reader.result, isExisting: false },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // حذف عکس (چه جدید چه قدیمی)
  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    // اگر عکس از قبل موجود بود، فقط از state اصلی حذفش کنیم
    if (imagePreviews[index]?.isExisting) {
      setProfileData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      // اگر عکس جدید بود، از آرایه فایل‌ها هم حذف کنیم
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const submitHandler = async () => {
    setLoading(true);

    const formData = new FormData();

    // اضافه کردن داده‌های متنی
    Object.keys(profileData).forEach((key) => {
      if (key === "images") return; // عکس‌های قدیمی رو جدا می‌فرستیم
      if (Array.isArray(profileData[key])) {
        profileData[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (profileData[key] instanceof Date) {
        formData.append(key, profileData[key].toISOString());
      } else {
        formData.append(key, profileData[key] || "");
      }
    });

    // اضافه کردن عکس‌های جدید
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    // اگر عکس‌های قدیمی هستن و کاربر بعضی‌هاشون رو حذف کرده، بفرستیم که سرور بدونه
    if (profileData.images?.length) {
      profileData.images.forEach((url) => {
        formData.append("existingImages", url);
      });
    }

    try {
      const res = await fetch("/api/profile", {
        method: data ? "PATCH" : "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        router.refresh();
        router.push("/dashboard/my-profiles");
      }
    } catch (err) {
      toast.error("خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mb-40 animate-fadeIn">
      <h3 className="text-2xl text-primary bg-primary/10 rounded-xl px-4 py-3 mb-10">
        {data ? "ویرایش آگهی" : "ثبت آگهی"}
      </h3>
      {/* ===== بخش آپلود عکس ===== */}
      <div className="mb-8">
        <label className="block text-lg font-medium mb-3">تصاویر آگهی</label>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer inline-block">
            <div className="bg-primary/10 text-primary px-6 py-3 rounded-lg hover:bg-primary/20 transition">
              انتخاب عکس‌ها (حداکثر ۱۰ عکس)
            </div>
          </label>
        </div>

        {/* پیش‌نمایش عکس‌ها */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={`preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* بقیه فیلدها */}
      <TextInput
        title="عنوان آگهی"
        name="title"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
      />
      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="متراژ (متر مربع)"
        name="size"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="ادرس"
        name="address"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <RadioList profileData={profileData} setProfileData={setProfileData} />

      <TextList
        title="امکانات رفاهی"
        type="amenities"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextList
        title="قوانین"
        type="rules"
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <Toaster />

      {loading ? (
        <Loader />
      ) : (
        <button
          onClick={submitHandler}
          className="bg-primary text-white text-base rounded-lg px-6 py-4 hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          {data ? "ویرایش آگهی" : "ثبت آگهی"}
        </button>
      )}
    </div>
  );
}

export default AddProfilePage;
