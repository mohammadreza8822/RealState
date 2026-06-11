import AddProfilePage from "@/template/AddProfilePage";
import { getProfileById } from "@/lib/repository";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

async function Edit({ params }) {
  const { profileId } = await params;
  const t = await getTranslations();
  const profile = await getProfileById(profileId);

  if (!profile) {
    return <h3>{t("dashboard.errorRetry")}</h3>;
  }

  return (
    <div>
      <AddProfilePage data={profile} />
    </div>
  );
}

export default Edit;
