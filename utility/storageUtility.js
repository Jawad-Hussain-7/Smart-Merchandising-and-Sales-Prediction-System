import * as firebase from 'firebase'
import 'firebase/firestore'

async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };
        // this helps us get a blob
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
}

async function getStoreImageUrl(outletId, imageName) {
    var storageRef = firebase.storage().ref();
    var pathRef = storageRef.child("Stores").child(outletId + '/' + imageName);
    let url = await pathRef.getDownloadURL()
    return url;
}

export async function uploadStoreImages(response, outletId) {
    let file = await uriToBlob(response.uri)
    const storageRef = firebase.storage().ref().child("Stores").child(outletId + '/' + response.fileName);
    await storageRef.put(file)
    let url = await getStoreImageUrl(outletId, response.fileName)
    return url
}