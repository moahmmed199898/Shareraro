import ExternalPC from "../PC/ExternalPC";

export default class Caller extends ExternalPC{

    
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

        return this.callDoc.id;

    }

    public async hangup() {
        this.pc.close();
        await this.database.updateUserStatus(false);
    }

    private pushStreamTracksToPC() {
        this.stream.getTracks().forEach(track => {
             this.pc.addTrack(track, this.stream);
        });
    }

}