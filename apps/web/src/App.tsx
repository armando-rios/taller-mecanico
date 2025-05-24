import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Invetory from "./pages/Invetory";
import Clients from "./pages/Clients";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="p-4 flex-1 flex flex-col h-13/14">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/inventario" element={<Invetory />} />
            <Route path="/clientes" element={<Clients />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
