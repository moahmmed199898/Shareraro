import React from "react";
import Stream from "../components/Stream/Stream";
import Caller from "../Services/Caller";
import ScreenSharer from "../Services/ScreenSharer";

type Props = {}
type State = {
    stream:MediaStream
}
export default class CallPage extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            stream: null
        }
        this.init();
    }

    private async init() {
        const screenSharer = new ScreenSharer();
        const mediaStream = await screenSharer.getScreenStream();
        this.setState({
            stream:mediaStream
        })
        
        const caller = new Caller(mediaStream);
        await caller.call();
    }


    render() {
        return (
            <div>
                {this.state.stream === null ? <h1>Loading...</h1>: <Stream mediaStream={this.state.stream}></Stream>}
            </div>
        )
    }
}