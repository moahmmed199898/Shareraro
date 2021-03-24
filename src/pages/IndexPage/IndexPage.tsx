import React from "react";
import "./_indexPage.scss"
import Card from "../../components/Cards/Card";
import {faDesktop, faDatabase} from "@fortawesome/free-solid-svg-icons"
export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="IndexPage">
                <h1 className="title">Shareraro</h1>
                <p className="description">Share your screen and send large files to your friends with one button <br/>
                What do you want to do?
                </p>
                <div className="cards">
                    <Card
                        title="Screen Share"
                        icon={faDesktop}
                        description="Share your screen in high quality with all your friends"
                        color="greenBackground"
                    />
                    <Card
                        title="Data Transfer"
                        icon={faDatabase}
                        description="Send large files to your friends easily"
                        color="purpleBackground"
                    />
                </div>


                {/* <Link className={"link"} to={"/call"}>
                    <button className={"call"}>Call</button>
                </Link>
                <Link className={"link"} to={"/answer"}>
                    <button className={"answer"}>answer</button>
                </Link> */}
            </div>
        )
    }
}