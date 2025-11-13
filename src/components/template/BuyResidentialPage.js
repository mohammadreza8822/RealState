import Card from "@/module/Card";
import SideBar from "@/module/SideBar";

function BuyResidentialPage({ data }) {
  return (
    <div className="flex justify-between mt-20 animate-fadeIn">
      <div className="flex flex-col items-center h-fit p-6 rounded-xl shadow-lg shadow-primary/20 ml-10 w-[220px]">
        <SideBar />
      </div>
      <div className="w-full flex flex-wrap justify-between">
        {data.length ? null : (
          <p className="w-full bg-red-100 text-red-600 text-xl px-4 py-3 rounded-xl">
            هیچ آگهی ثبت نشده است
          </p>
        )}
        {data?.map((profile) => (
          <Card key={profile._id} data={profile} />
        ))}
      </div>
    </div>
  );
}

export default BuyResidentialPage;
