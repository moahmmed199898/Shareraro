import React, { VideoHTMLAttributes } from "react";
import Video from "./Video";
import "./_stream.scss"

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
    mediaStream:MediaStream,
}

type State = {}

export default class Stream extends React.Component<Props,State> {


    render() {
        return <Video id="stream" autoPlay={true} srcObject={this.props.mediaStream}> </Video>
    }
}


