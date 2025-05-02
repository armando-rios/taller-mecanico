const Input = ({
  title,
  type = "string",
  value,
  setValue,
}: {
  title: string;
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{title}</label>
      <input
        type={type}
        value={value}
        className="w-full bg-neutral-700 border border-gray-600 rounded-lg p-2.5 outline-none"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
