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


    /**
     * makes a call doc and return it to be used as a reference 
     * @returns a firebase doc
     */
    public async makeCallDoc() {
        this.callDoc = this.firestore.collection("calls").doc();
        return this.callDoc;
    }

    /**
     * gets a doc that handles the call with the callID
     * @param callID the ID of the call 
     * @returns a firebase doc
     */
    public getCallDoc(callID:string) {
        this.callDoc = this.firestore.collection('calls').doc(callID);
        return this.callDoc;
    }

    /**
     * saves the call offer
     * @param offerDescription the offer to be saved 
     */
    public async saveOffer(offerDescription:RTCSessionDescriptionInit) {
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
    public async saveAnswer(answerDescription:RTCSessionDescriptionInit) {
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };
        
        await this.callDoc.update({ answer });
    }


}