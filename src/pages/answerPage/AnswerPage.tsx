import React from "react";
import Stream from "../../components/Stream/Stream";
import Nav from "../../components/NavBar/Nav";
import Signaling from "../../Services/Signaling";



type Props = unknown;
type State = {
    stream: MediaStream,
    callID: string,
    ready: boolean
}

export default class AnswerPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            stream: null,
            callID: "",
            ready: false
        }
    }

    async componentDidMount() {
        const url = window.location.href;
        const callID = url.split("?")[1];
        

        const signaling = new Signaling();
        await signaling.signalAnswer(callID);
        const mediaStream = await signaling.getStream();
        this.setState({
            stream: mediaStream,
            ready: true
        })
    }

    private onInputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            callID: event.currentTarget.value
        })
    }


    render(): JSX.Element {
        if (!this.state.ready) {
            return (
                <div className="h-screen grid bg-gray-900 text-white text-center">
                    <Nav />
                    <div className="block m-auto text-7xl">
                        Loading....
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Nav />
                <div className="h-screen bg-gray-900 text-white block items-center pt-40">
                    <Stream className="w-8/12 m-auto" controls={true} autoPlay mediaStream={this.state.stream}></Stream>
                </div>
            </div>
        )
    }
}