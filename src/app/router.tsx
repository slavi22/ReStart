import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "@/components/layouts/root-layout.tsx";
<<<<<<< Updated upstream
import AssessmentRoute from "./routes/assessment";
=======
import { NavUsers } from "@/components/account";
const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };
>>>>>>> Stashed changes

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
  {
    path: "/account",
    element: <NavUsers user={user} />,
    children: [],
  },
]);
