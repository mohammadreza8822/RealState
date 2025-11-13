import DashboardCard from "@/module/DashboardCard";

function MyProfilesPage({ profiles }) {
  return (
    <div className="space-y-4 p-4">
      {profiles.length ? null : (
        <p className="text-center text-gray-500 text-lg mt-10">
          هیچ آگهی ثبت نشده است
        </p>
      )}
      {profiles.map((item) => (
        <DashboardCard key={item._id} data={JSON.parse(JSON.stringify(item))} />
      ))}
    </div>
  );
}

export default MyProfilesPage;
