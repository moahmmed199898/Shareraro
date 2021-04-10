import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import Nav from "../../components/NavBar/Nav";
import Stream from "../../components/Stream/Stream";
import Caller from "../../Services/VideoCall/Caller";
import ScreenSharer from "../../Services/ScreenSharer";
import "./_callPage.scss"

type Props = unknown
type State = {
    stream:MediaStream,
    callID:string,
    copied:boolean
}
export default class CallPage extends React.Component<Props, State> {
    private screenSharer = new ScreenSharer();
    constructor(props:Props) {
        super(props);
        this.state = {
            stream: null,
            callID: null,
            copied: false
        }

        this.screenSharer = new ScreenSharer();
    }

    private async onClickHandler() {
        const mediaStream = await this.screenSharer.getScreenStream() 
        const caller = new Caller(mediaStream);
        const id = await caller.call();
        this.setState({
            stream:mediaStream,
            callID: id
        })
    }

    private async onCopyClickHandler() {
        const clipBoard = await navigator.permissions.query({name: "clipboard-write"});
        if(clipBoard.state == "granted") {
            await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/answer?${this.state.callID}`);  
            this.setState({
                copied:true
            })
        } else {
            console.log("no permission")
        }
    }

    componentWillUnmount():void {
        this.screenSharer.stop();
    }

    render():JSX.Element {

        if(this.state.stream == null ) {
            return (
                <>
                    <Nav />
                    <div id="callPage_pre">
                        <div>
                        <h1>Start by selecting which monitor you want to share</h1>
                        <button 
                            onClick={this.onClickHandler.bind(this)}>Click here to select which app/screen to share
                        </button>
                        </div>
                    </div>
                </>
            )
        }

        return (
            <div id="callPage_post">
                    <Nav />
                    <div>
                        <Stream className="stream" mediaStream={this.state.stream}></Stream>
                        <div className="info">
                            <h1>Send this link to your friends:</h1> 
                                <div className="link" onClick={this.onCopyClickHandler.bind(this)}>
                                    {`${window.location.protocol}//${window.location.host}/answer?${this.state.callID}`}
                                </div>
                            <button 
                            className={this.state.copied? 'copyButton copied' : 'copyButton'} 
                            onClick={this.onCopyClickHandler.bind(this)}>
                                {this.state.copied? <FontAwesomeIcon icon={faCheck} className="check"/> : null }
                                {this.state.copied? "copied" : "copy" }
                            </button>
                        </div>
                    </div>
            </div>
        )
    }
}