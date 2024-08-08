import React from 'react';
// import LoaderStyles from './Loader.style'

function Loader(props) {
    return (
        <div>
            <h1>Cooking in progress..</h1>
            <div id="cooking">
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div id="area">
                    <div id="sides">
                        <div id="pan"></div>
                        <div id="handle"></div>
                    </div>
                    <div id="pancake">
                        <div id="pastry"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;