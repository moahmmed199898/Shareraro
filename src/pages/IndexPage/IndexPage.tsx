import React from "react";
import Button from "../../components/Buttons/Button";
import Nav from "../../components/NavBar/Nav";
export default class IndexPage extends React.Component {

    render(): JSX.Element {
        return (
            <div className="h-screen grid bg-gray-900 text-white">
                <Nav />
                <section className="text-center m-auto grid gap-10">
                    <h1 className="font-bold text-8xl tracking-widest text-red-600">Shareraro</h1>
                    <div id="hook" className="text-4xl">
                        <span className="">An easy way to </span>
                        <span className="font-bold text-green-600">Share Your Screen </span>
                        <span>using </span>
                        <span className="text-blue-500 font-bold">WebRTC </span>
                    </div>
                    <Button href="/call" className="text-3xl my-5 py-5 px-10 rounded-full">Start Sharing Now!</Button>
                    

                </section>

            </div>
        )
    }
}