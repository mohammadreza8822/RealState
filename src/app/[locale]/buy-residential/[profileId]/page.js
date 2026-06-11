// app/buy-residential/[profileId]/page.js
import DetailsPage from "@/template/DetailsPage";
import { getProfileById } from "@/lib/repository";
import { getTranslations } from "next-intl/server";

async function ProfileDetail({ params }) {
  const { profileId } = await params;
  const t = await getTranslations();

  const profile = await getProfileById(profileId);

  if (!profile) {
    return (
      <h3 className="text-center text-red-600 text-2xl mt-10">
        {t("details.notFound")}
      </h3>
    );
  }

  return <DetailsPage data={profile} />;
}

export default ProfileDetail;

export const generateMetadata = async ({ params }) => {
  const { profileId } = await params;
  const t = await getTranslations();
  const profile = await getProfileById(profileId);

  if (!profile) {
    return {
      title: t("details.notFoundTitle"),
      description: t("details.notFoundDesc"),
    };
  }

  return {
    title: profile.title || t("details.title"),
    description: profile.description || t("details.description"),
  };
};
