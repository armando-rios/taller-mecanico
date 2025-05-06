import { useState, useEffect } from "react";
import MakeSaleModal from "../components/home/MakeSaleModal";
import api from "../config/axios";
import { Part } from "../types/invetory";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);

  const fetchParts = async () => {
    try {
      const { data } = await api.get("/parts");
      setParts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return (
    <>
      {isModalOpen && <MakeSaleModal parts={parts} />}
      <div className="flex gap-2">
        <button
          className="py-2 px-4 bg-orange-700 rounded-lg font-semibold border-2 border-orange-700 hover:border-white"
          onClick={() => setIsModalOpen(true)}
        >
          Realizar Venta
        </button>
        <button className="py-2 px-4 border rounded-lg font-semibold hover:text-orange-700">
          Registrar Servicio
        </button>
      </div>
    </>
  );
};

export default Home;
