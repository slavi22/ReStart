import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout.tsx";
import AssessmentRoute from "./routes/assessment";
import LoginRoute from "./routes/login";
import RegisterRoute from "./routes/register";
import { HomePage } from "@/features/home/home-page";
import { ProtectedRoute } from "@/components/protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "assessment",
        element: (
          <ProtectedRoute>
            <AssessmentRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "register",
        element: <RegisterRoute />,
      },
    ],
  },
]);
