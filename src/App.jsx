import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

import Home from "./pages/Home"
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreatePack from "./pages/Admin/CreatePack"
import PacksPage from "./pages/PacksPage"
import PackIdPage from "./pages/PackIdPage"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/packs/:id" element={<PackIdPage />} />

          <Route
            path="/admin"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-pack"
            element={
              <ProtectedRoute>
                <CreatePack />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App