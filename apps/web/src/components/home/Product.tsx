const Product = () => {
  return (
    <div className="bg-neutral-700 p-3 rounded-lg hover:bg-neutral-600 cursor-pointer">
      <div className="flex justify-between">
        <span className="font-medium">Filtro de Aceite</span>
        <span className="text-orange-700">$12.99</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Cód: REP-00123 | Stock: 15
      </div>
    </div>
  );
};

export default Product;
