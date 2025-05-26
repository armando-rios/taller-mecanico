import SaleSummary from "./SaleSummary";

const CreateClient = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 md:w-2/3 border-r border-neutral-700"></div>
      <SaleSummary />
    </div>
  );
};

export default CreateClient;
