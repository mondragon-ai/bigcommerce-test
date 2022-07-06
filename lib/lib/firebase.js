"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerDoc = exports.getCustomerDoc = exports.createCustomerDoc = exports.db = exports.fbApp = void 0;
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const firestore_1 = require("firebase/firestore");
// Config FB with credentials
const firebaseConfig = {
    apiKey: "AIzaSyBVbUajosWuWo6RDhcwarsoFb5vQULdm50",
    authDomain: "shopify-recharge-352914.firebaseapp.com",
    projectId: "shopify-recharge-352914",
    storageBucket: "shopify-recharge-352914.appspot.com",
    messagingSenderId: "282916076195",
    appId: "1:282916076195:web:5f4863d335fd2394ff5d16",
    measurementId: "G-3LFMNFVE5Y"
};
// Initialize Firebase
exports.fbApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
exports.db = getFirestore(exports.fbApp);
/**
 *  Create Customer document in firebase
 *  @returns FB_UUID
 */
async function createCustomerDoc(data) {
    // Add a new document with a generated id.
    const docRef = await firestore_1.addDoc(firestore_1.collection(exports.db, "customers"), data);
    return docRef ? docRef.id : null;
}
exports.createCustomerDoc = createCustomerDoc;
;
/**
 *  Fetch Customer & Send back if exists.
 *  @param FB_UUID
 *  @returns Customer_Data from FB
 */
async function getCustomerDoc(FB_UUID) {
    const docRef = firestore_1.doc(exports.db, "customers", `${FB_UUID}`);
    const docSnap = await firestore_1.getDoc(docRef);
    const userData = docSnap.data();
    // Make sure the doc exists.
    if (docSnap.exists()) {
        return userData;
    }
    else {
        return null;
    }
}
exports.getCustomerDoc = getCustomerDoc;
;
/**
 *  Fetch Customer & Update Data
 *  @param FB_UUID
 *  @param data
 *  @returns
 */
async function updateCustomerDoc(FB_UUID, data) {
    // Fetch the user/{user} doc from FB for Stripe/Shopify Cart/IDs
    const docRef = firestore_1.doc(exports.db, 'customers', `${FB_UUID}`);
    // Add data to FB
    await firestore_1.updateDoc(docRef, data);
    return null;
}
exports.updateCustomerDoc = updateCustomerDoc;
;
//# sourceMappingURL=firebase.js.map