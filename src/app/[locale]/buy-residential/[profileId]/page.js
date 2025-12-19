// app/buy-residential/[profileId]/page.js
import Profile from "@/models/Profile";
import DetailsPage from "@/template/DetailsPage";
import connectDB from "@/utils/connectDB";
import { getTranslations } from "next-intl/server";

async function ProfileDetail({ params }) {
  const { profileId } = await params;
  const t = await getTranslations();
  await connectDB();

  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return (
      <h3 className="text-center text-red-600 text-2xl mt-10">
        {t("details.notFound")}
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
export const generateMetadata = async ({ params }) => {
  const { profileId } = await params;
  const t = await getTranslations();
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return {
      title: t("details.notFoundTitle"),
      description: t("details.notFoundDesc"),
    };
  }

  // اینجا هم باید تبدیل به plain object کنی
  const plainProfile = JSON.parse(JSON.stringify(profile));

  return {
    title: plainProfile.title || t("details.title"),
    description: plainProfile.description || t("details.description"),
  };
};
