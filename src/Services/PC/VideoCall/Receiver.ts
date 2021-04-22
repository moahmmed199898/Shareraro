import ExternalReceiverPC from "../ExternalReceiverPC";

export default class Receiver extends ExternalReceiverPC{

    public async answer(callID:string):Promise<MediaStream> {

        await this.prepConnection(callID);
        return this.stream;

    }

    protected setupPCEventListener():void {
        this.pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
              this.stream.addTrack(track);
            });
          };

        this.pc.onicecandidate = (event) => {
            event.candidate && this.answerCandidates.add(event.candidate.toJSON());
        };

    }
}