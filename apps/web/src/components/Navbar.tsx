import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Inventario", href: "/inventario" },
  { name: "Clientes", href: "/clientes" },
];

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold text-orange-600">Taller Mecanico</h1>
      <nav className="flex gap-4 items-center">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`${
              location.pathname === item.href
                ? "text-orange-600"
                : "text-gray-300"
            } hover:text-orange-600 font-semibold`}
          >
            {item.name}
          </Link>
        ))}
        <button
          className="text-sm font-semibold cursor-pointer text-gray-300 hover:text-white border border-gray-300 px-2 py-1 rounded-lg"
          onClick={handleLogout}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
