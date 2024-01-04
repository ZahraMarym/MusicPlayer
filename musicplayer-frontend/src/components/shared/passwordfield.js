const passwordfield = ({label,placeholder,value,setValue}) => {
    return (
      <div className="passWordfieldsDiv flex flex-col space-y-2  w-full">
        <label htmlFor={label} className="font-semibold">
          {label}
        </label>
        <input
          type="password"
          placeholder={placeholder}
          className="p-2 border border-blue-600 border-solid rounded bg-gray-900 placeholder-grey-200 w-full"
          id={label}
          value={value}
        onChange={(e)=>{
          setValue(e.target.value);
        }}
        />
      </div>
    );
  };
  export default passwordfield;
  