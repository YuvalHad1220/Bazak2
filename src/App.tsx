import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Navigate to={"/"} />,
      // children: [
      //   {
      //     path:
      //   }
      // ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
