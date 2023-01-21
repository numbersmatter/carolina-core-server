import functions = require("firebase-functions");

import admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

export {admin, functions, db};
