// ======================================
// Nūr Reader Platform
// ID Service
// Version 1.1.0
// ======================================

async function getNextFamilyId() {

    const counterRef = db.collection("system").doc("counters");

    return await db.runTransaction(async (transaction) => {

        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists) {
            throw new Error("System counters do not exist.");
        }

        const data = counterDoc.data();

        const nextNumber = data.nextFamilyNumber;

        transaction.update(counterRef, {
            nextFamilyNumber: nextNumber + 1
        });

        return generateId("FAM", nextNumber);

    });

}

async function getNextReaderId() {

    const counterRef = db.collection("system").doc("counters");

    return await db.runTransaction(async (transaction) => {

        const counterDoc = await transaction.get(counterRef);

        if (!counterDoc.exists) {
            throw new Error("System counters do not exist.");
        }

        const data = counterDoc.data();

        const nextNumber = data.nextReaderNumber;

        transaction.update(counterRef, {
            nextReaderNumber: nextNumber + 1
        });

        return generateId("RDR", nextNumber);

    });

}