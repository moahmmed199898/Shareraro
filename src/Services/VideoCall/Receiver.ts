import Database from "../Database";
import PeerConnection from "../PC/PeerConnection";

export default class Receiver extends PeerConnection{
    private callID:string

    public async answer(callID:string):Promise<MediaStream> {
        this.callID = callID
        await this.setDatabaseProperties();

        this.setupPCEventListener();

        await this.setOfferDesc();
        const answerDescription = await this.setAnswerDesc();
        await this.database.saveAnswer(answerDescription);
        
        this.setupDatabaseEventListeners();

        return this.stream;
    }


    
    protected async setDatabaseProperties():Promise<void> {
        this.database = new Database();
        this.callDoc =  this.database.getCallDoc(this.callID);
        this.offerCandidates = this.callDoc.collection("offerCandidates");
        this.answerCandidates = this.callDoc.collection("answerCandidates");
        return Promise.resolve();
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

    protected async setOfferDesc():Promise<RTCSessionDescription> {
        const callData = (await this.callDoc.get()).data();
        const offerDescription = callData.offer as RTCSessionDescription;
        await this.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
        return offerDescription;
    }

    protected setupDatabaseEventListeners():void {
        this.offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              console.log(change);
              if (change.type === 'added') {
                const data = change.doc.data();
                await this.pc.addIceCandidate(new RTCIceCandidate(data));
              }
            });
          });
    }

    private async setAnswerDesc() {
        const answerDescription = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answerDescription);
        return answerDescription;
    }
}