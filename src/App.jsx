import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

import Home from "./pages/Home"
import AdminLogin from "./pages/Admin/AdminLogin"
import CreatePack from "./pages/Admin/CreatePack"
import SalesAdmin from "./pages/Admin/SalesAdmin"
import DashboardContent from "./pages/Admin/AdminDashboard"
import PacksPage from "./pages/PacksPage"
import PackIdPage from "./pages/PackIdPage"

import { PacksProvider } from "./context/PacksContext"
import { CartProvider } from "./context/CartContext" // <-- importa el nuevo context
import NotFoundPage from "./pages/NotFoundPage"
import { ThemeProvider } from "./context/ThemeContext"
import Checkout from "./pages/Checkout"
import Success from "./pages/Success"

function App() {
  return (
    <ThemeProvider>
    <PacksProvider>  {/* packs context */}
      <CartProvider>  {/* carrito context */}
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/packs" element={<PacksPage />} />
              <Route path="/packs/:id" element={<PackIdPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />

              <Route
                path="/admin"
                element={
                  <PublicRoute>
                    <AdminLogin />
                  </PublicRoute>
                }
              />

              <Route element={<AdminLayout />}>
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <div className="w-full">
                        <DashboardContent />
                      </div>
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
                <Route
                  path="/admin/sales"
                  element={
                    <ProtectedRoute>
                      <SalesAdmin />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </PacksProvider>
    </ThemeProvider>
  )
}

export default App