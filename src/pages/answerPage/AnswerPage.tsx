import React from "react";
import Receiver from "../../Services/PC/VideoCall/Receiver";
import Stream from "../../components/Stream/Stream";
import Nav from "../../components/NavBar/Nav";
import Signaling from "../../Services/Signaling";



type Props = unknown;
type State = {
    stream:MediaStream,
    callID:string,
    ready: boolean
}

export default class AnswerPage extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            stream: null,
            callID: "",
            ready: false
        }
    }

    componentDidMount():void {
        const url = window.location.href;
        const callID = url.split("?")[1];
        if(callID !== undefined) {
            this.setState({
                callID: callID
            })
        }
    }

    private onInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            callID: event.currentTarget.value
        })
    }

    private async answerClickHandler() {
        // const receiver = new Receiver();
        // const mediaStream = await receiver.answer(this.state.callID)
        const signaling = new Signaling();
        await signaling.signalAnswer(this.state.callID);
        const mediaStream = await signaling.getStream();
        this.setState({
            stream: mediaStream,
            ready: true
        })
    }

    render():JSX.Element {

        if(!this.state.ready) {
            return (
                <>
                    <Nav />
                    <div id="answerPage_pre">
                        <input id="callID" onChange={this.onInputChangeHandler.bind(this)} value={this.state.callID} placeholder="Enter the call ID here" type="text"/>
                        <input id="answerBtn" value="Answer" type="button" onClick={this.answerClickHandler.bind(this)}/>
                    </div>
                </>
            )
        }

        return (
                <>
                    <Nav />
                    <div id="answerPage_post">
                        <Stream controls={true} mediaStream={this.state.stream}></Stream>
                    </div>
                </>
        )
    }
}