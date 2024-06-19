import React from 'react';

function AuthContainer({ children, onSubmit, title }) {
    return (
        <section className="grid place-items-center w-100 min-h-screen p-4">
            <form className="w-full sm:w-2/3 lg:w-1/3 bg-pink-900 p-3 text-white" onSubmit={onSubmit}>
                <h1 className="text-xl mt-1 mb-3 font-medium">{title}</h1>
                {children}
            </form>
        </section>
    );
}

export default AuthContainer;
