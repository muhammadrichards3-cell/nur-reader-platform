// ==========================================
// Nūr Reader Platform
// Qur'an Progress Service
// F014.4
// ==========================================


// ==========================================
// Qur'an Progress Statuses
// ==========================================

const QURAN_PROGRESS_STATUSES = {

    NOT_STARTED: "Not Started",

    MEMORISING: "Memorising",

    MEMORISED: "Memorised",

    UNDER_REVISION: "Under Revision",

    NEEDS_REVISION: "Needs Revision"

};


// ==========================================
// Create Qur'an Item
// ==========================================

async function createQuranItem(data = {}) {

    if (!data.surahName) {

        throw new Error(
            "Surah name is required."
        );

    }

    const quranId =
        data.quranId ||
        generateQuranId();


    const item = {

        quranId:

            quranId,

        surahNumber:

            Number(
                data.surahNumber || 0
            ),

        surahName:

            data.surahName,

        juz:

            data.juz || "",

        ayahCount:

            Number(
                data.ayahCount || 0
            ),

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
        .collection("quranItems")
        .doc(quranId)
        .set(item);


    return item;

}


// ==========================================
// Get Qur'an Items
// ==========================================

async function getQuranItems() {

    const snapshot =
        await db
            .collection("quranItems")
            .get();


    return snapshot.docs

        .map(
            doc =>
                buildQuranItem(doc)
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
// Record Learner Qur'an Progress
// ==========================================

async function recordQuranProgress(
    learnerId,
    quranId,
    status,
    data = {}
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    if (!quranId) {

        throw new Error(
            "Qur'an item ID is required."
        );

    }


    if (!Object.values(
        QURAN_PROGRESS_STATUSES
    ).includes(status)) {

        throw new Error(
            "Invalid Qur'an progress status."
        );

    }


    const progressId =
        `${learnerId}_${quranId}`;


    const progress = {

        progressId:

            progressId,

        learnerId:

            learnerId,

        quranId:

            quranId,

        status:

            status,

        memorisationPercentage:

            Number(
                data.memorisationPercentage || 0
            ),

        revisionPercentage:

            Number(
                data.revisionPercentage || 0
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
        .collection("quranProgress")
        .doc(progressId)
        .set(
            progress,
            {
                merge: true
            }
        );


    await recalculateQuranProgress(
        learnerId
    );


    return progress;

}


// ==========================================
// Get Learner Qur'an Progress
// ==========================================

async function getLearnerQuranProgress(
    learnerId
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    const snapshot =
        await db
            .collection("quranProgress")
            .where(
                "learnerId",
                "==",
                learnerId
            )
            .get();


    return snapshot.docs

        .map(
            doc =>
                buildQuranProgress(doc)
        )

        .filter(
            progress =>
                progress !== null
        );

}


// ==========================================
// Recalculate Overall Qur'an Progress
// ==========================================

async function recalculateQuranProgress(
    learnerId
) {

    const records =
        await getLearnerQuranProgress(
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

            surahProgress:
                percentage,

            updatedAt:
                new Date().toISOString()

        });

    }


    return percentage;

}


// ==========================================
// Generate Qur'an ID
// ==========================================

function generateQuranId() {

    return `QUR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;

}


// ==========================================
// Build Qur'an Item
// ==========================================

function buildQuranItem(doc) {

    if (!doc || !doc.exists) {

        return null;

    }


    const data =
        doc.data();


    return {

        quranId:
            data.quranId ||
            doc.id,

        surahNumber:
            Number(
                data.surahNumber || 0
            ),

        surahName:
            data.surahName ||
            "",

        juz:
            data.juz ||
            "",

        ayahCount:
            Number(
                data.ayahCount || 0
            ),

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
// Build Qur'an Progress
// ==========================================

function buildQuranProgress(doc) {

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

        quranId:
            data.quranId ||
            "",

        status:
            data.status ||
            QURAN_PROGRESS_STATUSES.NOT_STARTED,

        memorisationPercentage:
            Number(
                data.memorisationPercentage || 0
            ),

        revisionPercentage:
            Number(
                data.revisionPercentage || 0
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