// app/buy-residential/[profileId]/page.js
import DetailsPage from "@/template/DetailsPage";
import { getProfileById } from "@/lib/repository";

async function ProfileDetail({ params }) {
  const { profileId } = await params;
  const profile = await getProfileById(profileId);

  if (!profile) {
    return (
      <h3 className="text-center text-red-600 text-2xl mt-10">
        آگهی یافت نشد!
      </h3>
    );
  }

  return <DetailsPage data={profile} />;
}

export default ProfileDetail;

export const generateMetadata = async ({ params }) => {
  const { profileId } = await params;
  const profile = await getProfileById(profileId);

  if (!profile) {
    return {
      title: "آگهی یافت نشد",
      description: "آگهی مورد نظر در دسترس نیست",
    };
  }

  return {
    title: profile.title || "آگهی املاک",
    description: profile.description || "جزئیات آگهی املاک",
  };
};
