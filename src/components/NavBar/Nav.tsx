import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {

    render():JSX.Element {

        return (
            <nav className="flex justify-around mt-5 absolute w-screen text-white">
            <h1 className="font-bold text-4xl cursor-pointer tracking-widest"><Link to="/">Shareraro</Link></h1>
            <ul className="flex gap-5 text-2xl">
                <li className="cursor-pointer"><Link to="/">Home</Link></li>
                <li className="cursor-pointer hover:text-green-600 transition-all"><Link to="/call">Start a Share</Link></li>
            </ul>
        </nav>

        )
    }
}