const Home = () => {
  return (
    <>
      <div className="flex gap-2">
        <button className="py-2 px-4 bg-orange-700 rounded-lg font-semibold border-2 border-orange-700 hover:border-white">
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
