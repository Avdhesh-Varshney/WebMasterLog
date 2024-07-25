import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        await axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <section className="grid place-items-center border-b p-4">
            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Our Products
            </h2>            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 px-5">
                {
                    products.map(product => <ProductCard product={product} key={product.id} />)
                }
            </div>
        </section>
    )
}

export default Products;