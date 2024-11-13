function Button({ text, width, bg, hover, focus, color, onClick, loading }) {

    const className = loading ? `pointer-events-none opacity-60 ${bg} ${hover} ${focus} ${width} ${color} text-sm px-4 py-2 md:px-6 md:py-3 rounded focus:ring-2 mt-4 flex items-center justify-center gap-3` :
                `${bg} ${hover} ${focus} ${width} ${color} text-sm px-4 py-2 md:px-6 md:py-3 rounded focus:ring-2 mt-4 flex items-center justify-center gap-3`

    return (
        <button
            className={className}
            onClick={onClick}
        >
            { loading ? "Loading..." : text}
        </button>
    )
}

export default Button;