// ==========================================
// Nūr Reader Platform
// Book Service
// Version 1.0.0
// ==========================================


// ==========================================
// Build Book Object
// ==========================================

function buildBookProfile(doc) {

    if (!doc || !doc.exists) {
        return null;
    }

    const data = doc.data();

    return {

        bookId: data.bookId || doc.id,

        title: data.title || "",

        author: data.author || "",

        category: data.category || "",

        readingLevel: data.readingLevel || "",

        description: data.description || "",

        totalCopies: Number(data.totalCopies || 0),

        availableCopies: Number(data.availableCopies || 0),

        status: data.status || "Active"

    };

}


// ==========================================
// Get All Books
// ==========================================

async function getAllBooks() {

    const snapshot = await db
        .collection("books")
        .orderBy("title")
        .get();

    return snapshot.docs
        .map(doc => buildBookProfile(doc))
        .filter(book => book !== null);

}


// ==========================================
// Get Single Book
// ==========================================

async function getBook(bookId) {

    if (!bookId) {
        throw new Error("Book ID is required.");
    }

    const bookDoc = await db
        .collection("books")
        .doc(bookId)
        .get();

    if (!bookDoc.exists) {
        throw new Error(`Book "${bookId}" was not found.`);
    }

    return buildBookProfile(bookDoc);

}