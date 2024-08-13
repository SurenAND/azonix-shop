import DashboardLayout from "@/src/components/layout/dashboard-layout/Layout";
import DashboardTemplate from "@/src/components/templates/dashboard/Dashboard";
import { ReactElement } from "react";

export default function Dashboard() {
  return <DashboardTemplate />;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
