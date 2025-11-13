function DashboardPage({ createdAt }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-blue-600 font-normal text-2xl mb-5">سلام 👋</h3>
      <p className="text-gray-600">
        آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند.{" "}
      </p>
      <div className="mt-24 flex bg-blue-50 w-fit px-3 py-1 rounded-md transition-all duration-300 hover:bg-blue-100">
        <p className="m-0 font-normal ml-3">تاریخ عضویت:</p>
        <span className="text-blue-600">
          {new Date(createdAt).toLocaleDateString("fa-ir")}
        </span>
      </div>
    </div>
  );
}

export default DashboardPage;
