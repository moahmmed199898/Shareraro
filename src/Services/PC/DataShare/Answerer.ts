import ExternalReceiverPC from "../ExternalReceiverPC";

export default class Answerer extends ExternalReceiverPC{


    public async answer(callID:string):Promise<void> {
        await this.prepConnection(callID);        
    }

    
    protected setupPCEventListener():void {

        
        this.pc.ondatachannel = (event) => {
            const receiveChannel = event.channel;
            const receivedData:Array<BlobPart> = [];
            receiveChannel.onmessage = mes => {
                const data = mes.data;
                if(data !== "EOF") receivedData.push(data);
                else {
                      const blob = new Blob(receivedData);
                      this.downloadFile(blob, receiveChannel.label);
                    //   receiveChannel.close();
                }
                
            }
        }

        this.pc.onicecandidate = (event) => {
            event.candidate && this.answerCandidates.add(event.candidate.toJSON());
        };
    }


    private downloadFile(blob: Blob, fileName:string) {
        console.log(blob.size)
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove()
    }

}