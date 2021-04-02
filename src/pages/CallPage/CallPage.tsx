import React from "react";
import Stream from "../../components/Stream/Stream";
import Caller from "../../Services/Caller";
import ScreenSharer from "../../Services/ScreenSharer";
import "./_callPage.scss"

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
    }

    private async onClickHandler() {
        const screenSharer = new ScreenSharer();
        const mediaStream = await screenSharer.getScreenStream() 
        const caller = new Caller(mediaStream);
        let id = await caller.call();
        this.setState({
            stream:mediaStream,
            callID: id
        })
    
        console.log(id)
    }


    render() {

        if(this.state.stream == null ) {
            return (
                <div id="callPage_pre">
                    <div>
                    <h1>Start by selecting which monitor you want to share</h1>
                    <button onClick={this.onClickHandler.bind(this)}>Click here to select which app/screen to share</button>
                    </div>
                </div>
            )
        }

        return (
            <div id="callPage_post">
                    <Stream className="stream" mediaStream={this.state.stream}></Stream>
            </div>
        )
    }
}