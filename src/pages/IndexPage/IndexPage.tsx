import React from "react";
import { Link } from "react-router-dom";
import "./_indexPage.scss"
export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="nav">
                <Link className={"link"} to={"/call"}>
                    <button className={"call"}>Call</button>
                </Link>
                <Link className={"link"} to={"/answer"}>
                    <button className={"answer"}>answer</button>
                </Link>
            </div>
        )
    }
}