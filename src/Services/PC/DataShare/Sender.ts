import ExternalPC from "../ExternalPC";

export default class DataSender extends ExternalPC{

    constructor() {
        super();
    }

    public async call(file:File):Promise<string> {
        const dataChannel = this.pc.createDataChannel(file.name);
        await this.setDatabaseProperties();
        await this.setupPCEventListener();
        const offerDescription = await this.getOfferDesc();
        await this.database.saveOffer(offerDescription)
        await this.setupDatabaseEventListeners();


        dataChannel.binaryType = "arraybuffer";
        dataChannel.addEventListener('open', () => {
            
            setTimeout(async () => {
                console.log("open")
                const arrayBuffer = await file.arrayBuffer();
                for(let i = 0; i<arrayBuffer.byteLength; i += 65535) {
                    dataChannel.send(arrayBuffer.slice(i, i + 65535));
                }
                dataChannel.send("EOF");
                // dataChannel.send(arrayBuffer)    
            }, 3000);
            
        });

        dataChannel.addEventListener('close', () => {
            console.log("closed");
        })

        
        return this.callDoc.id;
    }


    
}