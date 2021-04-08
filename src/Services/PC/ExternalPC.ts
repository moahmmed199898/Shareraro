import Database from "../Database";
import PeerConnection from "./PeerConnection";

export default class ExternalPC extends PeerConnection {
    
    protected async setDatabaseProperties():Promise<void> {
        this.database = new Database();
        this.callDoc = await this.database.makeCallDoc();
        this.offerCandidates = this.callDoc.collection("offerCandidates");
        this.answerCandidates = this.callDoc.collection("answerCandidates");
    }

    protected async setupPCEventListener():Promise<void> {
         this.pc.onicecandidate = async (event) => {
            if(event.candidate) await this.offerCandidates.add(event.candidate.toJSON());
        };
    }


    protected async setupDatabaseEventListeners():Promise<void> {
        
        this.callDoc.onSnapshot(async (snapshot) => {
            const data = snapshot.data();
            if (!this.pc.currentRemoteDescription && data?.answer) {
              const answerDescription = new RTCSessionDescription(data.answer);
              await this.pc.setRemoteDescription(answerDescription);
            }
          });
        
          // When answered, add candidate to peer connection
          this.answerCandidates.onSnapshot(async (snapshot) => {
            snapshot.docChanges().forEach(async (change) => {
              if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                await this.pc.addIceCandidate(candidate);
              }
            });
          });
        
    }

    protected async getOfferDesc():Promise<RTCSessionDescriptionInit> {
        const offerDescription = await this.pc.createOffer();
        await this.pc.setLocalDescription(offerDescription);
        return offerDescription;
    }
}