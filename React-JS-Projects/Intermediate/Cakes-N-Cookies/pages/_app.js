import {useEffect, useState} from "react";
import '../styles/globals.css'

import Loader from "components/Loader/Loader"
import LoaderStyle from "/components/Loader/Loader.style";

function MyApp({Component, pageProps}) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1200)
    }, [])
    if (isLoading) {

        return <div><LoaderStyle/><Loader/></div>
    }
    return <Component {...pageProps} />
}

export default MyApp
