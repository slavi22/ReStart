import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [],
  },
]);
