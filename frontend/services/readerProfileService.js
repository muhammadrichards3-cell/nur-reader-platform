// ==========================================
// Nūr Reader Platform
// Reader Profile Service
// Version 1.0.0
// ==========================================

// ==========================================
// Build Reader Profile
// ==========================================

function buildReaderProfile(doc) {

    if (!doc || !doc.exists) {
        return null;
    }

    const data = doc.data();

    return {

        // --------------------------------------
        // Identity
        // --------------------------------------

        readerId: data.readerId || doc.id,

        familyId: data.familyId || "",

        fullName: data.fullName || "",

        grade: data.grade || "",

        dateOfBirth: data.dateOfBirth || "",


        // --------------------------------------
        // Account Status
        // --------------------------------------

        status: data.status || "Active",


        // --------------------------------------
        // Reading Information
        // --------------------------------------

        booksRead: Number(data.booksRead || 0),

        booksBorrowed: Number(data.booksBorrowed || 0),


        // --------------------------------------
        // Achievement
        // --------------------------------------

        badge: data.badge || "Beginner"


    };

}


// ==========================================
// Get Reader Profile
// ==========================================

async function getReaderProfile(readerId) {

    if (!readerId) {
        throw new Error("Reader ID is required.");
    }

    const readerRef = db.collection("readers").doc(readerId);

    const readerDoc = await readerRef.get();

    if (!readerDoc.exists) {
        throw new Error(`Reader "${readerId}" was not found.`);
    }

    return buildReaderProfile(readerDoc);

}


// ==========================================
// Get All Reader Profiles
// ==========================================

async function getAllReaderProfiles() {

    const snapshot = await db
        .collection("readers")
        .orderBy("fullName")
        .get();

    return snapshot.docs
        .map(doc => buildReaderProfile(doc))
        .filter(profile => profile !== null);

}