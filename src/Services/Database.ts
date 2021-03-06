import firebase from "firebase/app"
import "firebase/firestore";
import { Signal } from './../../types/Signal';
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


    /**
     * makes a call doc and return it to be used as a reference 
     * @returns a firebase doc
     */
    public makeCallDoc():firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
        this.callDoc = this.firestore.collection("calls").doc();
        return this.callDoc;
    }

    /**
     * gets a doc that handles the call with the callID
     * @param callID the ID of the call 
     * @returns a firebase doc
     */
    public getCallDoc(callID:string):firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
        this.callDoc = this.firestore.collection('calls').doc(callID);
        return this.callDoc;
    }

    /**
     * saves the call offer
     * @param offerDescription the offer to be saved 
     */
    public async saveOffer(offerDescription:RTCSessionDescriptionInit):Promise<void> {
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        }
    
        await this.callDoc.set({
            uid: null,
            offer: offer
        })    
    }

    /**
     * saves the answer ice credentials 
     * @param answerDescription the answer to be saved
     */
    public async saveAnswer(answerDescription:RTCSessionDescriptionInit):Promise<void> {
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };
        
        await this.callDoc.update({ answer });
    }


    public async makeSignalDoc():Promise<firebase.firestore.DocumentReference> {
        const signal:Signal = {
            waitingCalls:[]
        }

        const doc = await this.firestore.collection("signals").add(signal);
        return doc;
    }

    public getSignalDoc(id:string):firebase.firestore.DocumentReference {
        const doc = this.firestore.collection("signals").doc(id);
        return doc;
    }


}