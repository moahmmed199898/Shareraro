import { User } from '../types/User';
import Database from './Database';
import firebase from "firebase/app"


/**
 * A singleton that manages the user needs
 */
export default class UserManager {
    private user:User;
    private followers: User[];
    private database: Database;

    constructor() {
        this.database = new Database();
        this.user = this.getUserFromFirebase();
    }

    /**
     * 
     * @returns the current user
     */
    public getUser() {
        return this.user;
    }

    /**
     * follows a user 
     * @param email the email of the user to follow
     */
    public async follow(email: string):Promise<void> {
        const emailInfo = await this.database.getEmailInfo(email)
        const following = await this.getFollowing();
        const followingUIDs = following.map(user=>user.uid);
        if(followingUIDs.findIndex(uid => uid === emailInfo.uid) > -1) {
            followingUIDs.push(emailInfo.uid);
        }
        await this.database.setFollowing(followingUIDs);
    }

    /**
     * the the people which the current user is following 
     * @returns a list of users that the current user is following 
     */
    public async getFollowing():Promise<User[]> {
        this.followers =  await this.database.getUserFollowing();
        return this.followers;

    }

    /**
     * clears the current user and logs him out
     */
    public async removeUser() {
        this.database = null;
        this.user = null;
        this.followers = null;
        await firebase.auth().signOut();
    }


    private getUserFromFirebase():User {
        if(firebase.auth().currentUser === null) return null

        const {displayName, email, photoURL, uid } = firebase.auth().currentUser;
        const user:User = {
            displayName,
            email,
            photoURL,
            uid,
            inACall: false
        }
        this.database.addUser(firebase.auth().currentUser);
        this.user = user;
        return user;

    }







    


}