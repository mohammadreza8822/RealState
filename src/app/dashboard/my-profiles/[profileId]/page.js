import AddProfilePage from "@/template/AddProfilePage";
import { getProfileById } from "@/lib/repository";

export const dynamic = "force-dynamic";

async function Edit({ params }) {
  const { profileId } = await params;
  const profile = await getProfileById(profileId);

  if (!profile) {
    return <h3>خطایی رخ داده است. لطفاً دوباره تلاش کنید.</h3>;
  }

  return (
    <div>
      <AddProfilePage data={profile} />
    </div>
  );
}

export default Edit;
