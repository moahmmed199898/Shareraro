import React from "react";
import Receiver from "../../Services/Receiver";
import Stream from "../../components/Stream/Stream";



type Props = {};
type State = {
    stream:MediaStream,
    callID:string
}

export default class AnswerPage extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            stream: null,
            callID: null
        }
    }

    private onInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            callID: event.currentTarget.value
        })
    }

    private async answerClickHandler() {
        console.log("hello")
        const receiver = new Receiver();
        const mediaStream = await receiver.answer(this.state.callID)
        this.setState({
            stream: mediaStream
        })
    }

    render() {

        return (
            <div>
                <input onChange={this.onInputChangeHandler.bind(this)} type="text"/>
                <input type="button" onClick={this.answerClickHandler.bind(this)}/>
                {this.state.stream === null ? <h1>Loading...</h1>: <Stream controls={true} mediaStream={this.state.stream}></Stream>}
            </div>
        )
    }
}