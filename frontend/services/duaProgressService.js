// ==========================================
// Nūr Reader Platform
// Duʿā Progress Service
// F014.5
// ==========================================


// ==========================================
// Duʿā Progress Statuses
// ==========================================

const DUA_PROGRESS_STATUSES = {

    NOT_STARTED: "Not Started",

    LEARNING: "Learning",

    MEMORISED: "Memorised",

    REVISION: "Under Revision",

    NEEDS_REVISION: "Needs Revision"

};


// ==========================================
// Create Duʿā Item
// ==========================================

async function createDuaItem(data = {}) {

    if (!data.title) {

        throw new Error(
            "Duʿā title is required."
        );

    }

    const duaId =
        data.duaId ||
        generateDuaId();


    const item = {

        duaId:

            duaId,

        title:

            data.title,

        category:

            data.category || "",

        description:

            data.description || "",

        arabic:

            data.arabic || "",

        transliteration:

            data.transliteration || "",

        translation:

            data.translation || "",

        level:

            data.level || "",

        order:

            Number(
                data.order || 0
            ),

        createdAt:

            new Date().toISOString(),

        updatedAt:

            new Date().toISOString()

    };


    await db
        .collection("duaItems")
        .doc(duaId)
        .set(item);


    return item;

}


// ==========================================
// Get Duʿā Items
// ==========================================

async function getDuaItems() {

    const snapshot =
        await db
            .collection("duaItems")
            .get();


    return snapshot.docs

        .map(
            doc =>
                buildDuaItem(doc)
        )

        .filter(
            item => item !== null
        )

        .sort(
            (a, b) =>
                a.order - b.order
        );

}


// ==========================================
// Record Learner Duʿā Progress
// ==========================================

async function recordDuaProgress(
    learnerId,
    duaId,
    status,
    data = {}
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    if (!duaId) {

        throw new Error(
            "Duʿā ID is required."
        );

    }


    if (!Object.values(
        DUA_PROGRESS_STATUSES
    ).includes(status)) {

        throw new Error(
            "Invalid Duʿā progress status."
        );

    }


    const progressId =
        `${learnerId}_${duaId}`;


    const progress = {

        progressId:

            progressId,

        learnerId:

            learnerId,

        duaId:

            duaId,

        status:

            status,

        memorisationPercentage:

            Number(
                data.memorisationPercentage || 0
            ),

        teacherId:

            data.teacherId || "",

        teacherName:

            data.teacherName || "",

        assessment:

            data.assessment || "",

        note:

            data.note || "",

        updatedAt:

            new Date().toISOString()

    };


    await db
        .collection("duaProgress")
        .doc(progressId)
        .set(
            progress,
            {
                merge: true
            }
        );


    await recalculateDuaProgress(
        learnerId
    );


    return progress;

}


// ==========================================
// Get Learner Duʿā Progress
// ==========================================

async function getLearnerDuaProgress(
    learnerId
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    const snapshot =
        await db
            .collection("duaProgress")
            .where(
                "learnerId",
                "==",
                learnerId
            )
            .get();


    return snapshot.docs

        .map(
            doc =>
                buildDuaProgress(doc)
        )

        .filter(
            progress =>
                progress !== null
        );

}


// ==========================================
// Recalculate Overall Duʿā Progress
// ==========================================

async function recalculateDuaProgress(
    learnerId
) {

    const records =
        await getLearnerDuaProgress(
            learnerId
        );


    if (!records.length) {

        return 0;

    }


    const total =
        records.reduce(
            (
                sum,
                record
            ) =>
                sum +
                Number(
                    record.memorisationPercentage || 0
                ),
            0
        );


    const percentage =
        Math.round(
            total /
            records.length
        );


    const progressRef =
        db
            .collection("learnerProgress")
            .doc(learnerId);


    const progressDoc =
        await progressRef.get();


    if (progressDoc.exists) {

        await progressRef.update({

            duaProgress:
                percentage,

            updatedAt:
                new Date().toISOString()

        });

    }


    return percentage;

}


// ==========================================
// Generate Duʿā ID
// ==========================================

function generateDuaId() {

    return `DUA-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;

}


// ==========================================
// Build Duʿā Item
// ==========================================

function buildDuaItem(doc) {

    if (!doc || !doc.exists) {

        return null;

    }


    const data =
        doc.data();


    return {

        duaId:
            data.duaId ||
            doc.id,

        title:
            data.title ||
            "",

        category:
            data.category ||
            "",

        description:
            data.description ||
            "",

        arabic:
            data.arabic ||
            "",

        transliteration:
            data.transliteration ||
            "",

        translation:
            data.translation ||
            "",

        level:
            data.level ||
            "",

        order:
            Number(
                data.order || 0
            ),

        createdAt:
            data.createdAt ||
            "",

        updatedAt:
            data.updatedAt ||
            ""

    };

}


// ==========================================
// Build Duʿā Progress
// ==========================================

function buildDuaProgress(doc) {

    if (!doc || !doc.exists) {

        return null;

    }


    const data =
        doc.data();


    return {

        progressId:
            data.progressId ||
            doc.id,

        learnerId:
            data.learnerId ||
            "",

        duaId:
            data.duaId ||
            "",

        status:
            data.status ||
            DUA_PROGRESS_STATUSES.NOT_STARTED,

        memorisationPercentage:
            Number(
                data.memorisationPercentage || 0
            ),

        teacherId:
            data.teacherId ||
            "",

        teacherName:
            data.teacherName ||
            "",

        assessment:
            data.assessment ||
            "",

        note:
            data.note ||
            "",

        updatedAt:
            data.updatedAt ||
            ""

    };

}