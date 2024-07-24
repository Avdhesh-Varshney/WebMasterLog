import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../redux/CartSlice"
import EmptyCart from "../components/EmptyCart"
import CartItem from "../components/CartItem"

function Cart() {

    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()

    const onclear = () => {
        dispatch(clearCart())
        alert.success(`Cart successfully cleared!`)
    }

    const itemsTotal = cartItems.reduce((acc, item) => acc + item.total, 0).toFixed(2);

    return (
        <section className="relative py-5">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                </h2>

                {
                    cartItems.length === 0 ? <EmptyCart /> : (
                        <>

                            {cartItems.map((product) => <CartItem product={product} key={product.id} />)}

                            < div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                                <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>

                                <div className="flex items-center justify-between gap-5 ">
                                    <button
                                        className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100"
                                        onClick={onclear}
                                    >Clear cart</button>
                                    <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">${itemsTotal}</h6>
                                </div>
                            </div>
                            <div className="max-lg:max-w-lg max-lg:mx-auto">
                                <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts
                                    calculated
                                    at checkout</p>
                                <button
                                    className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout</button>

                            </div>
                        </>

                    )
                }



            </div>
        </section >

    )

}

export default Cart;