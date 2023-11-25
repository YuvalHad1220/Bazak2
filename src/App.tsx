import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import PATHS from "./paths";
import ZminotView from "./Views/Zminot";
import ZminotTatYehidotView from "./Views/ZminotTatYehidot";
import RamamView from "./Views/Ramam";
import UnitTreeView from "./Views/UnitTree";
import DashboardView from "./Views/Dashboard";
import ManageView from "./Views/Manage";
import SignUpView from "./Views/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Navigate to={"/"} />,
      children: [
        {
          path: PATHS.DASHBOARD,
          element: <DashboardView />
        },
        {
          path: PATHS.SIGN_IN,
          element: "Sign in",
        },
        {
          path: PATHS.SIGN_UP,
          element: "Sign up",
        },
        {
          path: PATHS.ADMIN_SIGN_IN,
          element: "Admin Sign in",
        },
        {
          path: PATHS.SUB_UNIT_ZMINOT,
          element: <ZminotTatYehidotView />
        },
        {
          path: PATHS.ZMINOT_TABLE,
          element: <ZminotView />
        },
        {
          path: PATHS.UNIT_TREE,
          element: <UnitTreeView />
        },
        {
          path: PATHS.RAMAM_TABLE,
          element: <RamamView />
        },
        {
          path: PATHS.TKINOT_HAZANOT,
          element: <SignUpView />
        },
        {
          path: PATHS.SYSTEM_MANAGEMENT,
          element: <ManageView />
        },
        {
          path: PATHS.ABOUT,
          element: "About",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
