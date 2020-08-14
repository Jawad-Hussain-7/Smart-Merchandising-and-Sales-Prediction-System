import * as firebase from 'firebase'

export async function signup(email, password, name) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        var user = firebase.auth().currentUser;
        user.updateProfile({ displayName: name })
    }).catch((error) => {
        throw error
    })
}

export async function logout() {
    firebase.auth().signOut().then(function () {
        console.log('Logout Successful')
    }).catch(function (error) {
        console.log('Logout Unsuccessful')
    });
}

export async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("Login Successful")
    }).catch(error => {
        throw error;
    })
}

export async function resetPassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        console.log("Email has been sent to you")
    }).catch((error) => {
        throw error
    })
}

export async function emailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        console.log('Email verified = ', user.emailVerified)
    }).catch(error => {
        console.log(error.message)
    });
}

export async function isUserVerified() {
    var user = firebase.auth().currentUser;
    console.log(user.emailVerified)
    if (user) {
        return user.emailVerified
    } else {
        return false
    }

}

export async function changePassword(oldPassword, newPassword) {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
    );
    // Now you can use that to reauthenticate
    await user.reauthenticateWithCredential(credential).then(async () => {
        await user.updatePassword(newPassword).then(function () {
            console.log('password changed successfully')
        }).catch(error => console.log('changePassUtitlity ', error.message));
    }).catch(error => console.log('reauth ', error.message));
}

export async function getCurrentUid() {
    const userId = await firebase.auth().currentUser.uid;
    if (userId)
        return userId
    else
        return await GoogleSignin.getCurrentUser().uid;
}

export async function getCurrentUserObj() {
    userObj = await firebase.auth().currentUser;
    if (userObj) {
        return userObj
    }
    return null
}