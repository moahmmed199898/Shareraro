import React from "react";
import Stream from "../components/Stream/Stream";
import Caller from "../Services/Caller";
import ScreenSharer from "../Services/ScreenSharer";

type Props = {}
type State = {
    stream:MediaStream,
    callID:string
}
export default class CallPage extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            stream: null,
            callID: null,
        }
        this.init();
    }

    private async init() {
        const screenSharer = new ScreenSharer();
        const mediaStream = await screenSharer.getScreenStream() 
        const caller = new Caller(mediaStream);
        let id = await caller.call();
        this.setState({
            stream:mediaStream,
            callID: id
        })
    
    }


    render() {
        return (
            <div>
                {this.state.stream === null ? <h1>Loading...</h1>: 
                <div>
                    <h1>{this.state.callID}</h1>
                    <Stream mediaStream={this.state.stream}></Stream>
                </div>
                }
            </div>
        )
    }
}