import * as firebase from 'firebase'
import 'firebase/firestore'

import { getCurrentUid } from './authUtility'

export async function getUserFirestoreObj() {
    const uid = await getCurrentUid();
    let userObj = null;
    await firebase.firestore().collection('Users').where('userID', '==', uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().userID == uid) {
                userObj = [doc.id, doc.data()];
            }
        })
    }).catch(error => { return null })
    return userObj
}

export async function setUserFirestoreObj(obj) {
    await getCurrentUid().then(async uid => {
        obj.uid = uid
        await firebase.firestore().collection('Users').doc().set(obj).then(() => console.log('done'))
    }).catch(err => { throw err })
}

export async function getFirestoreUserByUid(uid) {
    let userObj = null;
    await firebase.firestore().collection('Users').where('userID', '==', uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if (doc.data().userID == uid) {
                userObj = { docID: doc.id, docData: doc.data() };
            }
        })
    }).catch(error => { return null })
    return userObj
}

export async function getFirestoreUserByEmail(email) {
    let userObj = null;
    await firebase.firestore().collection('Users').where('email', '==', email).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            userObj = { docID: doc.id, docData: doc.data() }
        })
    }).catch(error => { return null })
    return userObj
}

export async function addStore(storeObj) {
    let storeRef;
    await firebase.firestore().collection('Stores').add(storeObj).then(ref => {
        storeRef = ref.id
    }).catch(err => { return null })
    return storeRef
}

export async function setStore(storeRef, storeObj) {
    await firebase.firestore().collection('Stores').doc(storeRef).set(storeObj).catch(err => { throw err })
}

export async function getAllAds(updateParent) {
    let ads = []
    await firebase.firestore().collection('Ads').get().then(snapshot => {
        if (snapshot.empty)
            return
        snapshot.docs.forEach(doc => {
            ads.push({ docID: doc.id, docData: doc.data() })
            updateParent(ads)
        })
    }).catch(err => { throw err })
}

export async function setHotAd(adID, data) {
    await firebase.firestore().collection('Hot Ads').doc(adID).set(data).catch(err => { 
        console.log(err)
        throw err 
    })
}

export async function getHotAd(adID) {
    let obj;
    await firebase.firestore().collection('Hot Ads').doc(adID).get().then(doc => {
        if (doc.exists)
            obj = doc.data()
    }).catch(err => {throw err})
    return obj
}

export async function updateHotAd(adID, obj){   
    await firebase.firestore().collection('Hot Ads').doc(adID).update(obj).catch(err => { 
        console.log(err)
        throw err 
    })
}

export async function addToArray(collection, doc, array, value) {
    let docRef = await firebase.firestore().collection(collection).doc(doc);
    let docData = await docRef.get();
    if (docData.exists && (docData.data()[array] != undefined)) {
        docRef.update({
            [array]: firebase.firestore.FieldValue.arrayUnion(value)
        });
    }
    else {
        saveData(collection, doc, { [array]: [value] });
    }
}