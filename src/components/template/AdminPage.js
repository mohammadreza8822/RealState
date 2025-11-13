import AdminCard from "@/module/AdminCard";

function AdminPage({ profiles }) {
  return (
    <div className="animate-fadeIn">
      {profiles.length ? null : (
        <p className="text-center text-lg text-gray-500 my-10">
          هیچ آگهی در انتظار تاییدی وجود ندارد
        </p>
      )}
      {profiles.map((i) => (
        <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
