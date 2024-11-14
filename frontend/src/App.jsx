// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Clientes from './pages/Clientes';
import DetalleCliente from './pages/DetalleCliente';


const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </div>
        </>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <ProtectedRoute>

                                <Layout />

                            </ProtectedRoute>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="inventario" element={<Inventario />} />
                            <Route path="ventas" element={<Ventas />} />
                            <Route path="clientes" element={<Clientes />} />
                            <Route path="clientes/:id" element={<DetalleCliente />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
