import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "@/components/layouts/root-layout.tsx";
import AssessmentRoute from "./routes/assessment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/assessment" replace />,
      },
      {
        path: "assessment",
        element: <AssessmentRoute />,
      },
    ],
  },
]);
