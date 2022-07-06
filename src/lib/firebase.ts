const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

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
export const fbApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(fbApp);


/**
 *  Create Customer document in firebase
 *  @returns FB_UUID 
 */
export async function createCustomerDoc(data: {}) {

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "customers"), data);

    return docRef ? docRef.id : null;
};

/**
 *  Fetch Customer & Send back if exists. 
 *  @param FB_UUID 
 *  @returns Customer_Data from FB
 */
export async function getCustomerDoc(FB_UUID: string) {

    const docRef = doc(db, "customers", `${FB_UUID}`);
    const docSnap = await getDoc(docRef);
    const userData  = docSnap.data();

    // Make sure the doc exists.
    if (docSnap.exists()) {
        return userData
    } else {
        return null;
    }  

};

/**
 *  Fetch Customer & Update Data
 *  @param FB_UUID 
 *  @param data 
 *  @returns 
 */
export async function updateCustomerDoc(FB_UUID: string, data: {}) {

    // Fetch the user/{user} doc from FB for Stripe/Shopify Cart/IDs
    const docRef = doc(db, 'customers',  `${FB_UUID}`, )

    // Add data to FB
    await updateDoc(docRef, data);

    return null;
};