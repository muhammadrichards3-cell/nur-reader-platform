// ==========================================
// Nūr Reader Platform
// Loan Service
// Version 1.0.0
// ==========================================


// ==========================================
// Loan Constants
// ==========================================

const DEFAULT_LOAN_DAYS = 14;


// ==========================================
// Date Helpers
// ==========================================

function formatDateForStorage(date) {

    return date.toISOString()
        .split("T")[0];

}


function calculateDueDate() {

    const date = new Date();

    date.setDate(
        date.getDate() + DEFAULT_LOAN_DAYS
    );

    return formatDateForStorage(date);

}


// ==========================================
// Build Loan Object
// ==========================================

function buildLoanProfile(doc) {

    if (!doc || !doc.exists) {
        return null;
    }

    const data = doc.data();

    return {

        loanId: data.loanId || doc.id,

        readerId: data.readerId || "",

        readerName: data.readerName || "",

        bookId: data.bookId || "",

        bookTitle: data.bookTitle || "",

        borrowedDate: data.borrowedDate || "",

        dueDate: data.dueDate || "",

        returnedDate: data.returnedDate || "",

        status: data.status || "Active"

    };

}


// ==========================================
// Get Active Loans
// ==========================================

async function getActiveLoans() {

    const snapshot = await db
        .collection("loans")
        .where("status", "==", "Active")
        .get();

    return snapshot.docs
        .map(doc => buildLoanProfile(doc))
        .filter(loan => loan !== null)
        .sort(
            (a, b) =>
                a.dueDate.localeCompare(b.dueDate)
        );

}


// ==========================================
// Get All Loans
// ==========================================

async function getAllLoans() {

    const snapshot = await db
        .collection("loans")
        .get();

    return snapshot.docs
        .map(doc => buildLoanProfile(doc))
        .filter(loan => loan !== null)
        .sort(
            (a, b) =>
                b.borrowedDate.localeCompare(
                    a.borrowedDate
                )
        );

}


// ==========================================
// Get Reader's Active Loans
// ==========================================

async function getReaderActiveLoans(readerId) {

    if (!readerId) {
        throw new Error("Reader ID is required.");
    }

    const snapshot = await db
        .collection("loans")
        .where("readerId", "==", readerId)
        .where("status", "==", "Active")
        .get();

    return snapshot.docs
        .map(doc => buildLoanProfile(doc))
        .filter(loan => loan !== null);

}


// ==========================================
// Borrow Book
// ==========================================

async function borrowBook(
    readerId,
    bookId
) {

    if (!readerId) {
        throw new Error("Reader ID is required.");
    }

    if (!bookId) {
        throw new Error("Book ID is required.");
    }


    const readerRef =
        db.collection("readers").doc(readerId);

    const bookRef =
        db.collection("books").doc(bookId);

    const loanRef =
        db.collection("loans").doc();


    await db.runTransaction(
        async transaction => {

            const readerDoc =
                await transaction.get(readerRef);

            const bookDoc =
                await transaction.get(bookRef);


            if (!readerDoc.exists) {

                throw new Error(
                    "Reader could not be found."
                );

            }


            if (!bookDoc.exists) {

                throw new Error(
                    "Book could not be found."
                );

            }


            const reader =
                readerDoc.data();

            const book =
                bookDoc.data();


            const availableCopies =
                Number(
                    book.availableCopies || 0
                );


            if (availableCopies <= 0) {

                throw new Error(
                    "This book is currently unavailable."
                );

            }


            // Prevent duplicate active loan

            const existingLoans =
                await db
                    .collection("loans")
                    .where(
                        "readerId",
                        "==",
                        readerId
                    )
                    .where(
                        "bookId",
                        "==",
                        bookId
                    )
                    .where(
                        "status",
                        "==",
                        "Active"
                    )
                    .get();


            if (!existingLoans.empty) {

                throw new Error(
                    "This reader already has this book on loan."
                );

            }


            const borrowedDate =
                formatDateForStorage(
                    new Date()
                );


            const dueDate =
                calculateDueDate();


            const loan = {

                loanId: loanRef.id,

                readerId: readerId,

                readerName:
                    reader.fullName || "",

                bookId: bookId,

                bookTitle:
                    book.title || "",

                borrowedDate:
                    borrowedDate,

                dueDate:
                    dueDate,

                returnedDate:
                    "",

                status:
                    "Active"

            };


            transaction.set(
                loanRef,
                loan
            );


            transaction.update(
                bookRef,
                {

                    availableCopies:
                        availableCopies - 1

                }
            );


            transaction.update(
                readerRef,
                {

                    booksBorrowed:
                        Number(
                            reader.booksBorrowed || 0
                        ) + 1

                }
            );

        }
    );

    return loanRef.id;

}


// ==========================================
// Return Book
// ==========================================

async function returnBook(loanId) {

    if (!loanId) {
        throw new Error("Loan ID is required.");
    }


    const loanRef =
        db.collection("loans").doc(loanId);


    await db.runTransaction(
        async transaction => {

            const loanDoc =
                await transaction.get(loanRef);


            if (!loanDoc.exists) {

                throw new Error(
                    "Loan could not be found."
                );

            }


            const loan =
                loanDoc.data();


            if (loan.status !== "Active") {

                throw new Error(
                    "This loan has already been returned."
                );

            }


            const bookRef =
                db
                    .collection("books")
                    .doc(loan.bookId);


            const readerRef =
                db
                    .collection("readers")
                    .doc(loan.readerId);


            const bookDoc =
                await transaction.get(bookRef);


            const readerDoc =
                await transaction.get(readerRef);


            if (!bookDoc.exists) {

                throw new Error(
                    "The associated book could not be found."
                );

            }


            const book =
                bookDoc.data();


            const reader =
                readerDoc.exists
                    ? readerDoc.data()
                    : {};


            const returnedDate =
                formatDateForStorage(
                    new Date()
                );


            transaction.update(
                loanRef,
                {

                    status:
                        "Returned",

                    returnedDate:
                        returnedDate

                }
            );


            transaction.update(
                bookRef,
                {

                    availableCopies:
                        Number(
                            book.availableCopies || 0
                        ) + 1

                }
            );


            if (readerDoc.exists) {

                transaction.update(
                    readerRef,
                    {

                        booksBorrowed:
                            Math.max(
                                0,
                                Number(
                                    reader.booksBorrowed || 0
                                ) - 1
                            ),

                        booksRead:
                            Number(
                                reader.booksRead || 0
                            ) + 1

                    }
                );

            }

        }
    );

}


// ==========================================
// Get Single Loan
// ==========================================

async function getLoan(loanId) {

    if (!loanId) {
        throw new Error("Loan ID is required.");
    }


    const loanDoc =
        await db
            .collection("loans")
            .doc(loanId)
            .get();


    if (!loanDoc.exists) {

        throw new Error(
            "Loan could not be found."
        );

    }


    return buildLoanProfile(
        loanDoc
    );

}