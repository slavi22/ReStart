import { RouterProvider } from "react-router";
import { router } from "@/app/router.tsx";
import { AuthProvider } from "@/features/auth/context/auth-context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
