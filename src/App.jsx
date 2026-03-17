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

import { PacksProvider } from "./context/PacksContext"
import { CartProvider } from "./context/CartContext" // <-- importa el nuevo context
import NotFoundPage from "./pages/NotFoundPage"
import { ThemeProvider } from "./context/ThemeContext"
import Checkout from "./pages/Checkout"

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