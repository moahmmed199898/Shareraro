import ExternalPC from "../ExternalPC";

export default class Caller extends ExternalPC{

    
    constructor(mediaStream:MediaStream) {
        super();
        this.stream = mediaStream;
    }

    public async call():Promise<string> {
        await this.setDatabaseProperties();

        this.pushStreamTracksToPC();

        await this.setupPCEventListener();

        const offerDescription = await this.getOfferDesc();

        await this.database.saveOffer(offerDescription)

        await this.setupDatabaseEventListeners();

        return this.callDoc.id;

    }

    public hangup():void {
        this.pc.close();
    }

    private pushStreamTracksToPC() {
        this.stream.getTracks().forEach(track => {
             this.pc.addTrack(track, this.stream);
        });
    }

}