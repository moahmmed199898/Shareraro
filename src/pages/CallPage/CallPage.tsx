import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Nav from "../../components/NavBar/Nav";
import Stream from "../../components/Stream/Stream";
import ScreenSharer from "../../Services/ScreenSharer";
import Signaling from "../../Services/Signaling";
import Button from "../../components/Buttons/Button";

type Props = unknown
type State = {
    stream: MediaStream,
    callID: string,
    copied: boolean
}
export default class CallPage extends React.Component<Props, State> {
    private screenSharer = new ScreenSharer();
    constructor(props: Props) {
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
        // const caller = new Caller(mediaStream);
        // const id = await caller.call();
        const signaling = new Signaling();
        const id = await signaling.signalCall(mediaStream);
        this.setState({
            stream: mediaStream,
            callID: id
        })
    }

    private async onCopyClickHandler() {
        const permissionName = "clipboard-write" as PermissionName;
        const clipBoard = await navigator.permissions.query({ name: permissionName });
        if (clipBoard.state == "granted") {
            await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/answer?${this.state.callID}`);
            this.setState({
                copied: true
            })
        } else {
            console.log("no permission")
        }
    }

    componentWillUnmount(): void {
        this.screenSharer.stop();
    }

    render(): JSX.Element {

        if (this.state.stream == null) {
            return (
                <>
                    <Nav />
                    <div className="h-screen grid bg-gray-900 text-white items-center text-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-10">Start by selecting which monitor you want to share</h1>
                            <Button 
                                className="py-16 px-36 rounded-3xl font-bold text-xl transform hover:scale-125 transition-all duration-500 hover:bg-green-600 border-0"
                                onClick={this.onClickHandler.bind(this)}>Click here to select which app/screen to share
                            </Button>
                        </div>
                    </div>
                </>
            )
        }

        return (
            <div className="h-screen grid bg-gray-900 text-white">
                <Nav />
                <div className="grid justify-center items-center text-center">
                    <div>
                        <Stream className="w-5/12 block m-auto" mediaStream={this.state.stream}></Stream>
                        <div className="info">

                            <h1 className="text-4xl font-bold tracking-widest mt-8">Send this link to your friends:</h1>

                            <div className={this.state.copied ? "bg-green-800" : null}>
                                <div className="inline" onClick={this.onCopyClickHandler.bind(this)}>
                                    {`${window.location.protocol}//${window.location.host}/answer?${this.state.callID}`}
                                </div>
                                <Button
                                    className={`mx-5 py-2 px-10 my-5 rounded-full border-0 ${this.state.copied ? "bg-green-800" : null}`}
                                    onClick={this.onCopyClickHandler.bind(this)}>
                                    {this.state.copied ? <FontAwesomeIcon icon={faCheck} className="check" /> : null}
                                    {this.state.copied ? "copied" : "copy"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}