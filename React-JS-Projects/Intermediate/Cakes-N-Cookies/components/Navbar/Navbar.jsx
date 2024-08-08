import React from 'react';

function Navbar() {
    return (
        <nav className="bg-pink-50 top-0 w-full flex px-10 py-4 lg:px-20 lg:py-6 z-10 ">
            <div style={{fontFamily:"var(--font-logo)"}} className="title"><h1 className={"text-5xl font-bold"}>CakesNCookies</h1></div>
        </nav>
    );
}

export default Navbar;