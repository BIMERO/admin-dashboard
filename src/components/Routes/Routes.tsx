import APIKeys from "../../pages/apiKeys/APIKeys";
import ApiLogs from "../../pages/apiLogs/ApiLogs";
import APIManagementPage from "../../pages/apiManagement/Index";
import AuditLog from "../../pages/audit/AuditLog";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Notifications from "../../pages/notifications/Notifications";
import Reports from "../../pages/reports/Reports";
import SettingsPage from "../../pages/settings/Index";
import Support from "../../pages/support/Support";
import UserManagement from "../../pages/Users/Index";

export const RoutesData = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/logs",
    element: <ApiLogs />,
  },
  { path: "/api-management", element: <APIManagementPage /> },
  { path: "/users", element: <UserManagement /> },
  { path: "/api-keys", element: <APIKeys /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/reports", element: <Reports /> },
  { path: "/support", element: <Support /> },
  { path: "/audit-logs", element: <AuditLog /> },
];
