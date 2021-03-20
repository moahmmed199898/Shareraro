import firebase from "firebase/app"
import "firebase/firestore";
import firebaseConfig from "./../firebaseConfig.json";

export default class Database {
    private readonly firestore;
    private callDoc: firebase.firestore.DocumentReference
    constructor() {
        if(firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        this.firestore = firebase.firestore();
    }


    public makeCallDoc() {
        this.callDoc = this.firestore.collection("calls").doc();
        return this.callDoc;
    }

    public getCallDoc(callID:string) {
        this.callDoc = this.firestore.collection('calls').doc(callID);
        return this.callDoc;
    }

    public async saveOffer(offerDescription:RTCSessionDescriptionInit) {
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        }

        await this.callDoc.set({offer})
    }

    public async saveAnswer(answerDescription:RTCSessionDescriptionInit) {
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };
        
        await this.callDoc.update({ answer });
    }

}