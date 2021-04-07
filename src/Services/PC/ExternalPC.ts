import Database from "../Database";
import PeerConnection from "./PeerConnection";

export default class ExternalPC extends PeerConnection {
    
    protected async setDatabaseProperties():Promise<void> {
        this.database = new Database();
        this.callDoc = await this.database.makeCallDoc();
        this.offerCandidates = this.callDoc.collection("offerCandidates");
        this.answerCandidates = this.callDoc.collection("answerCandidates");
    }

    protected setupPCEventListener():void {
        this.pc.onicecandidate = (event) => {
            if(event.candidate) this.offerCandidates.add(event.candidate.toJSON());
        };
    }


    protected setupDatabaseEventListeners():void {
        
        this.callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!this.pc.currentRemoteDescription && data?.answer) {
              const answerDescription = new RTCSessionDescription(data.answer);
              this.pc.setRemoteDescription(answerDescription);
            }
          });
        
          // When answered, add candidate to peer connection
          this.answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                this.pc.addIceCandidate(candidate);
              }
            });
          });
        
    }

    protected async getOfferDesc() {
        const offerDescription = await this.pc.createOffer();
        await this.pc.setLocalDescription(offerDescription);
        return offerDescription;
    }
}