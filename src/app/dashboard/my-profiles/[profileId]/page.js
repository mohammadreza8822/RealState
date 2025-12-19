import Profile from "@/models/Profile";
import AddProfilePage from "@/template/AddProfilePage";
import connectDB from "@/utils/connectDB";

async function Edit({ params: { profileId } }) {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profile) {
    return <h3>Something went wrong, please try again</h3>;
  }

  return (
    <div>
      <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />
    </div>
  );
}

export default Edit;
