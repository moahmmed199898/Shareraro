import Database from "./Database";

export default class Caller{
    private stream:MediaStream

    constructor(stream:MediaStream) {
        this.stream = stream;
    }

    public async call() {
        let pc = new RTCPeerConnection();
        this.stream.getTracks().forEach(track => pc.addTrack(track, this.stream))
        let data = await pc.createOffer();
        let database = new Database();
        let callID = await database.saveCallData(data);
        console.log(callID)
        return callID

    }
}