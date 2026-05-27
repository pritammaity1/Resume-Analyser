import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import HistoryPage from "@/pages/HistoryPage";
import SettingsPage from "@/pages/SettingsPage";
import JobMatchPage from "@/pages/JobMatchPage";
import SkillPage from "@/pages/SkillPage";

type ProtectedRouterProps = {
  children: React.ReactNode;
};

// function ProtectedRoute({children} : ProtectedRouterProps) {
//   const {user, loading} = useAuth()

//   if (loading) return null

//   if(!user) return <Navigate to="/" replace />

//   return {children}
// }

function ProtectedRoute({ children }: ProtectedRouterProps) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/match" element={<JobMatchPage />} />
        <Route path="/skills" element={<SkillPage />} />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
