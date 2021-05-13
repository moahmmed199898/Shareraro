import firebase from "firebase/app"
import "firebase/firestore";
import Database from './Database';
import { Signal, CallDocRef } from '../../types/Signal';
import Caller from "./PC/VideoCall/Caller";
import Receiver from "./PC/VideoCall/Receiver";

export default class Signaling {
    private database:Database;
    private signalDoc:firebase.firestore.DocumentReference;
    private mediaStream:MediaStream;
    private gotStream:boolean;

    constructor() {
        this.database = new Database();
        this.gotStream = false;
    }

    public async signalCall(mediaStream:MediaStream):Promise<string> {
        const signalDoc = await this.database.makeSignalDoc();
        signalDoc.onSnapshot(this.callRequestListener.bind(this))
        this.signalDoc = signalDoc;
        this.mediaStream = mediaStream;
        return signalDoc.id;    
    }

    public async signalAnswer(id:string):Promise<void> {
        const doc = this.database.getSignalDoc(id);
        const docData = await doc.get();
        const data:Signal = <Signal> docData.data();
        const callDocRef:CallDocRef = {
            waitingCallDoc: true,
            callDocRef: null,
        }
        this.signalDoc = doc;
        data.waitingCalls.push(callDocRef);
        await doc.update(data);
        doc.onSnapshot(this.answerResponseListener.bind(this))
        
    }


    private async callRequestListener(doc:firebase.firestore.DocumentData) {
        const data:Signal = <Signal> doc.data();
        const caller = new Caller(this.mediaStream);
        for(let i = 0; i<data.waitingCalls.length; i++) {
            console.log(!data.waitingCalls[i])
            if(!data.waitingCalls[i].callDocRef) {
                console.log("hello")
                data.waitingCalls[i].callDocRef = await caller.call();
            }
        }
        await this.signalDoc.update(data);
    }

    private async answerResponseListener(doc:firebase.firestore.DocumentData) {
        if(this.gotStream) return;
        const data:Signal = <Signal> doc.data();
        const receiver = new Receiver();
        const signalDocRef = data.waitingCalls.filter(v=>v.callDocRef)[0];
        if(signalDocRef) {
            const callDocRef = signalDocRef.callDocRef;
            const mediaStream = await receiver.answer(callDocRef);
            this.mediaStream = mediaStream;
            this.gotStream = true;
            data.waitingCalls = data.waitingCalls.slice(1,data.waitingCalls.length);
            await this.signalDoc.update(data);
        }
    }

    public async getStream():Promise<MediaStream> {
        return new Promise((res)=>{
            setInterval(()=>{
                if(this.mediaStream) res(this.mediaStream);
            },500)
        })
    }
}