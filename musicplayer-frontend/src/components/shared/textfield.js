const textfield = ({label,placeholder,className}) => {
  return (
    <div className={`textfieldsDiv flex flex-col space-y-2 w-full ${className}`}>
      <label for={label} className="font-semibold">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-blue-600 border-solid rounded bg-gray-900 placeholder-grey-200 w-full"
        id={label}
      />
    </div>
  );
};
export default textfield;
