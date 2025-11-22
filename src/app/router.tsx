import { createBrowserRouter } from "react-router";
import RootLayout from "@/components/layouts/root-layout.tsx";
import AssessmentRoute from "./routes/assessment";
import LoginRoute from "./routes/login";
import RegisterRoute from "./routes/register";
import CoursesPage from "@/features/courses/courses-page";
import ArticlePage from "@/features/courses/article-page";
import RecommendedCoursesPage from "@/features/courses/recommended-courses-page";
import { HomePage } from "@/features/home/home-page";
import { ProtectedRoute } from "@/components/protected-route";
import { PublicRoute } from "@/components/public-route";

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
        path: "personalized-articles",
        element: (
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "personalized-articles/:id",
        element: (
          <ProtectedRoute>
            <ArticlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "recommended-courses",
        element: (
          <ProtectedRoute>
            <RecommendedCoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginRoute />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <RegisterRoute />
          </PublicRoute>
        ),
      },
    ],
  },
]);
