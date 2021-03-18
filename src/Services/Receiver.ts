import Database from "./Database";

export default class Receiver {
    private stream:MediaStream

    constructor() {
        this.stream = new MediaStream();
    }

    public async answer(callID:string) {
        const pc = new RTCPeerConnection();
        const database = new Database();
        const callInfo = await database.getCallData(callID);
        await pc.setRemoteDescription(callInfo);
        pc.addEventListener("track", event=>{
            this.stream.addTrack(event.track);
        })
        return this.stream;
    }
}