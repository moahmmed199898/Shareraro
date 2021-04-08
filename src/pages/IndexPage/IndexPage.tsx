import React from "react";
import "./_indexPage.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleDown, faLink, faDesktop, faDatabase, } from "@fortawesome/free-solid-svg-icons"
import Section from "../../components/Sections/Section";
import Nav from "../../components/NavBar/Nav";
export default class IndexPage extends React.Component {

    render():JSX.Element {
        return (
            <div className="IndexPage">

                <Nav />
                <section id="start">
                    <h1>Shareraro</h1>
                    <div id="hook">
                        <span>An easy way to </span>
                        <span id="screenShare">Share Your Screen</span>
                        <span> and</span>
                        <span id="transferFiles"> Transfer Files</span>
                    </div>
                    <FontAwesomeIcon id="downArrows" icon={faAngleDoubleDown}></FontAwesomeIcon>
                </section>


                <Section title="Peer Connection" icon={faLink} id="peerConnection">
                    We are using WebRTC technology to establish a real time peer  connection 
                    so you don&apos;t have to worry about our servers being slow or go down. Just 
                    enjoy your connection.
                </Section>


                <Section title="Screen Share" icon={faDesktop} id="screenShare">
                Since we are using a peer connection you can 
                 hare your screen at the highest quality possible. 
                 You are only limited by your internet connection.
                </Section>

                <Section title="Data Transfer" icon={faDatabase} id="dataTransfer">
                Since we are using a peer connection you can 
                 hare your screen at the highest quality possible. 
                 You are only limited by your internet connection.
                </Section>








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