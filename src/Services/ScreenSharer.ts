export default class ScreenSharer {
    private stream: MediaStream;


    public async getScreenStream():Promise<MediaStream> {
        
        if(this.stream!=null) return this.stream;
        /*get display media has been deleted from lib.dom.d.ts per:
            https://github.com/microsoft/TypeScript/issues/33232
            https://github.com/microsoft/TypeScript/issues/31821#issuecomment-607474303
            and thus the easiest option is to ts ignore it until we end up with good typings for it

            Also, this method request the user's screen twice on the dev server but not in prod
            run npm run prod-serve to see the expected behavior
        */
        //@ts-ignore
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({audio:true, video: true});
        this.stream = mediaStream;
        return mediaStream;
    }

    public pause():MediaStream {
        return new MediaStream();
    }

    public resume():MediaStream {
        return this.stream;
    }

    public stop():void {
        let tracks = this.stream.getTracks();
        tracks.forEach(track=>track.stop());
        this.stream = null;    
    }

    public async selectDifferentScreen():Promise<MediaStream> {
        return this.getScreenStream();
    }

}