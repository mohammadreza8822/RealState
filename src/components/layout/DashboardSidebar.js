import DashboardSidebarClient from "./DashboardSidebarClient";

function DashboardSidebar({ children, role, email }) {
  return (
    <DashboardSidebarClient role={role} email={email}>
      {children}
    </DashboardSidebarClient>
  );
}

export default DashboardSidebar;
