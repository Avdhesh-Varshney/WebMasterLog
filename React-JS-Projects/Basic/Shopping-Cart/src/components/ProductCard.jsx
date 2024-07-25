import { useDispatch, useSelector } from "react-redux";
import { manageCartItem } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom"

function ProductCard({ product }) {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items)
    const navigate = useNavigate()

    const onAddToCart = (product) => {
        const quantity = 1;
        dispatch(manageCartItem({ product, quantity }))
        alert(`${product.title} successfully added to cart!`)
        navigate("/cart")
    }


    return (
        <div className="bg-white sm:w-350 w-full hover:shadow-lg border-2 transition duration-200 relative cursor-pointer rounded overflow-hidden group">
            <img className="w-full h-64 transition-transform duration-300 ease-in-out group-hover:scale-110" src={product.image} alt="product image" />
            <div className="p-2">
                <div className="flex mb-auto">
                    <div className="mr-auto font-bold">{product.title}</div>
                    <div className="font-bold">${product.price}</div>
                </div>
                <p className="w-full text-justify text-sm">{product.description.substring(0, 200)}</p>
                <button 
                    className="bg-blue-500 w-full py-2 mt-4 rounded hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-300 disabled:opacity-45 disabled:pointer-events-none"
                    onClick={() => { onAddToCart(product) }}
                    disabled={cartItems.find(item => item.id === product.id)}
                >
                    {cartItems.find(item => item.id === product.id) ? "Added to cart" : "Add to Cart" }
                </button>
            </div>
        </div>
    )
}

export default ProductCard;