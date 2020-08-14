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

export async function getStore(uid) {
    let storeObj;
    await firebase.firestore().collection('Stores').where('marketeerID', '==', uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            storeObj = { docID: doc.id, docData: doc.data() }
        })
    }).catch(err => { return null })
    return storeObj
}

export async function updateStore(storeRef, storeObj) {
    await firebase.firestore().collection('Stores').doc(storeRef).update(storeObj).catch(err => { throw err })
}

export async function getAds(storeID, updateParent) {
    await firebase.firestore().collection('Ads').where('outletID', '==', storeID).get().then(snapshot => {
        if (snapshot.empty)
            return
        let arr = []
        snapshot.docs.forEach(doc => {
            arr.push({ docID: doc.id, docData: doc.data() })
            updateParent(arr)
        })
    }).catch(err => { throw err })
}

export async function addOrder(orderObj) {
    let orderRef;
    await firebase.firestore().collection('Orders').add(orderObj).then(ref => {
        orderRef = ref.id
    }).catch(err => { throw err })
    return orderRef
}

export async function getOrders(storeID) {
    let obj = { list: [], profit: 0, orders: 0 }
    await firebase.firestore().collection('Orders').where('storeID', '==', storeID).get().then(snapshot => {
        if (snapshot.empty)
            return
        else {
            snapshot.docs.forEach(doc => {
                let temp = doc.data()
                temp.timestamp = temp.timestamp.toDate()
                temp.timestamp = new Date(temp.timestamp)
                obj.list.push({ docID: doc.id, docData: temp })
                obj.profit += temp.profit
                obj.orders += 1
            })
        }
    }).catch(err => { throw err })
    return obj
}

export async function getBroadcasts(storeID, updateParent) {
    let arr = []
    await firebase.firestore().collection('Broadcasts').where('storeID', '==', storeID).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            arr.push({ docID: doc.id, docData: doc.data() })
            updateParent(arr)
        })
    }).catch(err => { throw err })
}

export async function getData(collection, doc, objectKey) {
    // check if data exists on the given path
    if (objectKey === undefined) {
        return firebase.firestore().collection(collection).doc(doc).get().then(function (doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                return false;
            }
        })
    }
    else {
        return firebase.firestore().collection(collection).doc(doc).get().then(function (doc) {
            if (doc.exists && (doc.data()[objectKey] != undefined)) {
                return (doc.data()[objectKey]);
            } else {
                return false;
            }
        })
    }
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

export async function saveData(collection, doc, jsonObject) {
    await firebase.firestore().collection(collection).doc(doc).set(jsonObject, { merge: true }).catch(function (error) {
        console.error("Error writing document: ", error);
    });
}

export async function getAllChats(userID) {
    let chats;
    await firebase.firestore().collection('Chats').doc(userID).get().then(doc => {
        if (doc.exists)
            chats = doc.data()
        else
            chats = null
    }).catch(err => { throw err })
    return chats
}