import firebase from "firebase/app"
import "firebase/firestore";
import firebaseConfig from "./../firebaseConfig.json";

type CallInfo = {
    call: {
        sdp:string
        type: string
    }
}

export default class Database {
    private readonly firestore;
    constructor() {
        if(firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        this.firestore = firebase.firestore();
    }


    public async saveCallData(callData:RTCSessionDescriptionInit):Promise<string> {
        var callInfo:CallInfo = {
            call: {
                sdp:callData.sdp,
                type: callData.type
            }
        }
        const collection = await this.firestore.collection("calls").add(callInfo);
        return collection.id;
    }

    public async getCallData(callID:string):Promise<RTCSessionDescriptionInit> {
        const doc = await this.firestore.collection("calls").doc(callID).get();
        const data = await doc.data();
        const results:RTCSessionDescriptionInit = {
            sdp: data.call.sdp,
            type: data.call.type
        }
        console.log(results)
        return results;

    }

}