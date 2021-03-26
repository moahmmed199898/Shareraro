import firebase from "firebase/app"
import "firebase/firestore";
import { User } from "../types/User";
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
        
        if(firebase.auth().currentUser) {
            await this.callDoc.set({offer})
        } else {
            await this.callDoc.set({
                uid: null,
                offer: offer
            })    
        } 
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

    /**
     * adds a user to the database
     * @param user the user to be added
     */
    public async addUser(user:firebase.User) {
        const collection = await this.firestore.collection("users").where("uid","==",user.uid).limit(1).get();
        if(collection.docs.length === 0) {
            let {uid, displayName, email, photoURL} = user;
            await this.firestore.collection("users").add({
                uid,
                displayName,
                email,
                photoURL,
                following:[],
                inACall: false,
            });
        }
    }

    /**
     * update the inACall user status
     * @param inACall weather the user is in a call or not
     */
    public async updateUserStatus(inACall: boolean) {
        const doc = await this.getUserDoc();
        await doc.ref.update({
            inACall: inACall
        }) 
    }

    /**
     * the a list of the people who follow the current user
     * @returns a list of users who follow the current user
     */
    public async getUserFollowing():Promise<User[]> {
        const userDoc = await this.getUserDoc();
        const data = userDoc.data();
        const followingUIDs:string[] = data.following;
        let following:Array<User> = new Array<User>();
        for(let uid of followingUIDs) {
            if(following.findIndex(user => user.uid === uid) > -1) continue;
            const userInfo:User = await this.getUIDInfo(uid)
            following.push(userInfo);
        }
        console.log(following)
        return [...following];
        
    }

    /**
     * takes a list of people who you follow and update the database with them, this will use the current list so anything that is not on the list will be removed. 
     * @param followingUIDs the users UIDs to follow
     */
    public async setFollowing(followingUIDs:string[]) {
        const docs = await this.getUserDoc();
        const docRef = docs.ref;
        docRef.update({
            following: followingUIDs
        })
    }

    /**
     * get a user based on their email address 
     * @param email the users email 
     * @returns A User that has the email
     */
    public async getEmailInfo(email:string):Promise<User> {
        const docs = await this.firestore.collection("users").where("email", "==", email).limit(1).get();
        if(docs.docs.length === 0) return Promise.reject("email not found");

        const doc = docs.docs[0];
        const info = doc.data() as User;
        return info;
    }

        /**
     * get a user based on their uid
     * @param uid the uid of the user who you need info about 
     * @returns A User that has this uid
     */
    public async getUIDInfo(uid:string):Promise<User> {
        const docs = await this.firestore.collection("users").where("uid", "==", uid).limit(1).get();
        if(docs.docs.length === 0) return Promise.reject("internal error");

        const doc = docs.docs[0];
        const info = doc.data() as User;
        return info;
    }

    /**
     * get the firebase doc reference about the current user
     * @returns the doc reference of the current user
     */
    private async getUserDoc() {
        const uid = firebase.auth().currentUser.uid;
        const docs = await this.firestore.collection("users").where("uid", "==", uid).limit(1).get();
        if(docs.docs.length === 0) return Promise.reject("internal error");
        return docs.docs[0];
    }
}