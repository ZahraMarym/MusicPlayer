const textfield = ({label,placeholder,className, value, setValue, labelClassName}) => {
  return (
    <div className={`textfieldsDiv flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-blue-600 border-solid rounded bg-gray-900 placeholder-grey-200 w-full"
        id={label}
        value={value}
        onChange={(e)=>{
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
export default textfield;
