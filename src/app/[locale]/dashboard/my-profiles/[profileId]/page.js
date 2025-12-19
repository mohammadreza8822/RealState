import Profile from "@/models/Profile";
import AddProfilePage from "@/template/AddProfilePage";
import connectDB from "@/utils/connectDB";
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

async function Edit({ params: { profileId } }) {
  const t = await getTranslations();
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return <h3>{t("dashboard.errorRetry")}</h3>;
  }

  return (
    <div>
      <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />
    </div>
  );
}

export default Edit;
