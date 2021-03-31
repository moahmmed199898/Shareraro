import Database from "./Database";
import PeerConnection from "./PeerConnection";

export default class Caller extends PeerConnection{

    
    constructor(mediaStream:MediaStream) {
        super();
        this.stream = mediaStream;
    }

    public async call() {
        await this.setDatabaseProperties();

        this.pushStreamTracksToPC();

        this.setupPCEventListener();

        const offerDescription = await this.getOfferDesc();

        await this.database.saveOffer(offerDescription)

        this.setupDatabaseEventListeners();

        await this.database.updateUserStatus(true);


        console.log(await this.pc.getStats());

        return this.callDoc.id;

    }

    public async hangup() {
        this.pc.close();
        await this.database.updateUserStatus(false);
    }

    protected async setDatabaseProperties():Promise<void> {
        this.database = new Database();
        this.callDoc = await this.database.makeCallDoc();
        console.log(this.callDoc)
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

    private pushStreamTracksToPC() {
        this.stream.getTracks().forEach(track => {
             this.pc.addTrack(track, this.stream);
        });
    }

    private async getOfferDesc() {
        const offerDescription = await this.pc.createOffer();
        await this.pc.setLocalDescription(offerDescription);
        return offerDescription;
    }



}