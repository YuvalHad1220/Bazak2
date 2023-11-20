import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import PATHS from "./paths";
import Form from "./Components/Form";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Navigate to={"/"} />,
      children: [
        {
          path: PATHS.DASHBOARD,
          element: <Form />
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
          element: "Sub Unit",
        },
        {
          path: PATHS.ZMINOT_TABLE,
          element: "Zminot Table",
        },
        {
          path: PATHS.UNIT_TREE,
          element: "Unit Tree Table",
        },
        {
          path: PATHS.RAMAM_TABLE,
          element: "Ramam Table"
        },
        {
          path: PATHS.TKINOT_HAZANOT,
          element: "Tkinot Hazanot",
        },
        {
          path: PATHS.SYSTEM_MANAGEMENT,
          element: "System Management",
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
