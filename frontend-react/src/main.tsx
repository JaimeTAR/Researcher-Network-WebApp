import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginSignup from "./pages/LoginSignup.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { CategoriesProvider } from "./context/CategoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
