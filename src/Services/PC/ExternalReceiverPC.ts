import Database from "../Database";
import PeerConnection from "../PC/PeerConnection";

export default abstract class ExternalReceiverPC extends PeerConnection {
    protected callID:string

    public async prepConnection(callID:string):Promise<void> {
        this.callID = callID
        await this.setDatabaseProperties();

        this.setupPCEventListener();

        await this.setOfferDesc();
        const answerDescription = await this.setAnswerDesc();
        await this.database.saveAnswer(answerDescription);
        
        this.setupDatabaseEventListeners();
    }

    protected async setDatabaseProperties():Promise<void> {
        this.database = new Database();
        this.callDoc =  this.database.getCallDoc(this.callID);
        this.offerCandidates = this.callDoc.collection("offerCandidates");
        this.answerCandidates = this.callDoc.collection("answerCandidates");
        return Promise.resolve();
    }

    protected abstract setupPCEventListener():void;

    protected async setOfferDesc():Promise<RTCSessionDescription> {
        const callData = (await this.callDoc.get()).data();
        const offerDescription = callData.offer as RTCSessionDescription;
        await this.pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
        return offerDescription;
    }

    protected setupDatabaseEventListeners():void {
        this.offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              if (change.type === 'added') {
                const data = change.doc.data();
                await this.pc.addIceCandidate(new RTCIceCandidate(data));
              }
            });
          });
    }

    protected async setAnswerDesc():Promise<RTCSessionDescriptionInit> {
        const answerDescription = await this.pc.createAnswer();
        await this.pc.setLocalDescription(answerDescription);
        return answerDescription;
    }
}