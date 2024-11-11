function Input({label, type, name, placeholder, value, error, onChange}) {

    return (
        <div className="mb-3">
            <label 
                className="block mb-1 text-sm"
            >{label}</label>
            <input 
                type={type}
                name={name}
                className="w-full p-3 bg-transparent rounded outline-none border-2 border-gray-300 focus:border-pink-500 text-sm"
                placeholder={placeholder} 
                value={value}
                onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <small 
                className="text-red-300"
            >{error}</small>
        </div>
    )
}

export default Input;