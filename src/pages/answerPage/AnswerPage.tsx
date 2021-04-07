import React from "react";
import Receiver from "../../Services/VideoCall/Receiver";
import Stream from "../../components/Stream/Stream";
import "./_answerPage.scss"
import Nav from "../../components/NavBar/Nav";



type Props = {};
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

    componentDidMount() {
        let url = window.location.href;
        let callID = url.split("?")[1];
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
        const receiver = new Receiver();
        const mediaStream = await receiver.answer(this.state.callID)
        this.setState({
            stream: mediaStream,
            ready: true
        })
    }

    render() {

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