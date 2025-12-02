// app/buy-residential/[profileId]/page.js
import Profile from "@/models/Profile";
import DetailsPage from "@/template/DetailsPage";
import connectDB from "@/utils/connectDB";

async function ProfileDetail({ params: { profileId } }) {
  await connectDB();

  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return (
      <h3 className="text-center text-red-600 text-2xl mt-10">
        آگهی یافت نشد!
      </h3>
    );
  }

  // این خط جادویی مشکل رو حل می‌کنه
  const plainProfile = JSON.parse(JSON.stringify(profile));

  // یا می‌تونی از این روش هم استفاده کنی (کمی تمیزتر):
  // const plainProfile = profile.toObject ? profile.toObject() : profile;

  return <DetailsPage data={plainProfile} />;
}

export default ProfileDetail;

// متادیتا هم درست کن (همین مشکل رو داره!)
export const generateMetadata = async ({ params: { profileId } }) => {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return {
      title: "آگهی یافت نشد",
      description: "آگهی مورد نظر در دسترس نیست",
    };
  }

  // اینجا هم باید تبدیل به plain object کنی
  const plainProfile = JSON.parse(JSON.stringify(profile));

  return {
    title: plainProfile.title || "آگهی املاک",
    description: plainProfile.description || "جزئیات آگهی املاک",
  };
};
