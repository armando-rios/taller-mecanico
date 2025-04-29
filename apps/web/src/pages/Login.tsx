import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../config/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });
      login(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
      <h1 className="text-2xl font-bold">Inicio de sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" font-bold p-2 rounded-xl border border-gray-300 outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" font-bold p-2 rounded-xl border border-gray-300 outline-none"
        />
        <button
          type="submit"
          className=" font-bold p-2 bg-orange-700 rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
