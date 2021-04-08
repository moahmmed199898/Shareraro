import React from "react";
import { Link } from "react-router-dom";
import "./_nav.scss";

export default class Nav extends React.Component {

    render():JSX.Element {

        return (
            <nav id="nav">
            <h1><Link to="/">Shareraro</Link></h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/call">Screen Share</Link></li>
                <li>Data Transfer</li>
            </ul>
        </nav>

        )
    }
}