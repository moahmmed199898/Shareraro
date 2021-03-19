import firebase from 'firebase/app';
import "firebase/firestore"
import Database from "./Database";

export default abstract class PeerConnection {
    protected readonly iceCandidates:RTCConfiguration;
    protected stream:MediaStream;
    protected pc:RTCPeerConnection;
    protected database: Database
    protected callDoc:firebase.firestore.DocumentReference;
    protected offerCandidates:firebase.firestore.CollectionReference;
    protected answerCandidates:firebase.firestore.CollectionReference;

    constructor() {
        this.iceCandidates =  {
            iceServers: [{urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],},],
            iceCandidatePoolSize: 10,
        };

        this.setProperties();
    
    }


    protected setProperties() {
        this.setStreamProperties();
    }

    protected setStreamProperties() {
        this.stream = new MediaStream();
        this.pc = new RTCPeerConnection(this.iceCandidates);
    }

    protected abstract setDatabaseProperties():Promise<void>;
    protected abstract setDatabaseProperties():Promise<void>
    protected abstract setupPCEventListener():void
    protected abstract setupDatabaseEventListeners():void
} 