// ==========================================
// Nūr Reader Platform
// Curriculum Service
// F014.3
// ==========================================


// ==========================================
// Curriculum Statuses
// ==========================================

const CURRICULUM_STATUSES = {

    NOT_STARTED: "Not Started",

    IN_PROGRESS: "In Progress",

    COMPLETED: "Completed"

};


// ==========================================
// Create Curriculum Item
// ==========================================

async function createCurriculumItem(
    data = {}
) {

    if (!data.title) {

        throw new Error(
            "Curriculum item title is required."
        );

    }


    const curriculumId =
        data.curriculumId ||
        generateCurriculumId();


    const item = {

        curriculumId:

            curriculumId,

        madrassahId:

            data.madrassahId || "",

        subject:

            data.subject || "",

        level:

            data.level || "",

        title:

            data.title,

        description:

            data.description || "",

        order:

            Number(
                data.order || 0
            ),

        status:

            data.status ||
            CURRICULUM_STATUSES.NOT_STARTED,

        createdAt:

            new Date().toISOString(),

        updatedAt:

            new Date().toISOString()

    };


    await db
        .collection("curriculum")
        .doc(curriculumId)
        .set(item);


    return item;

}


// ==========================================
// Get Curriculum Items
// ==========================================

async function getCurriculumItems(
    madrassahId = ""
) {

    let query =
        db.collection("curriculum");


    if (madrassahId) {

        query =
            query.where(
                "madrassahId",
                "==",
                madrassahId
            );

    }


    const snapshot =
        await query.get();


    return snapshot.docs

        .map(
            doc =>
                buildCurriculumItem(doc)
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
// Get Single Curriculum Item
// ==========================================

async function getCurriculumItem(
    curriculumId
) {

    if (!curriculumId) {

        throw new Error(
            "Curriculum ID is required."
        );

    }


    const doc =
        await db
            .collection("curriculum")
            .doc(curriculumId)
            .get();


    if (!doc.exists) {

        return null;

    }


    return buildCurriculumItem(doc);

}


// ==========================================
// Record Learner Curriculum Progress
// ==========================================

async function recordCurriculumProgress(
    learnerId,
    curriculumId,
    status,
    data = {}
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    if (!curriculumId) {

        throw new Error(
            "Curriculum ID is required."
        );

    }


    if (!Object.values(
        CURRICULUM_STATUSES
    ).includes(status)) {

        throw new Error(
            "Invalid curriculum status."
        );

    }


    const progressId =
        `${learnerId}_${curriculumId}`;


    const progress = {

        progressId:

            progressId,

        learnerId:

            learnerId,

        curriculumId:

            curriculumId,

        status:

            status,

        teacherId:

            data.teacherId || "",

        teacherName:

            data.teacherName || "",

        note:

            data.note || "",

        completedAt:

            status ===
                CURRICULUM_STATUSES.COMPLETED

                ? new Date().toISOString()

                : "",

        updatedAt:

            new Date().toISOString()

    };


    await db
        .collection("curriculumProgress")
        .doc(progressId)
        .set(
            progress,
            {
                merge: true
            }
        );


    await recalculateCurriculumProgress(
        learnerId
    );


    return progress;

}


// ==========================================
// Get Learner Curriculum Progress
// ==========================================

async function getLearnerCurriculumProgress(
    learnerId
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    const snapshot =
        await db
            .collection(
                "curriculumProgress"
            )
            .where(
                "learnerId",
                "==",
                learnerId
            )
            .get();


    return snapshot.docs
        .map(
            doc =>
                buildCurriculumProgress(doc)
        )
        .filter(
            progress =>
                progress !== null
        );

}


// ==========================================
// Recalculate Curriculum Progress
// ==========================================

async function recalculateCurriculumProgress(
    learnerId
) {

    const records =
        await getLearnerCurriculumProgress(
            learnerId
        );


    if (!records.length) {

        return 0;

    }


    const completed =
        records.filter(
            record =>
                record.status ===
                CURRICULUM_STATUSES.COMPLETED
        ).length;


    const percentage =
        Math.round(
            (
                completed /
                records.length
            ) * 100
        );


    const progressRef =
        db
            .collection("learnerProgress")
            .doc(learnerId);


    const progressDoc =
        await progressRef.get();


    if (progressDoc.exists) {

        await progressRef.update({

            curriculumProgress:
                percentage,

            updatedAt:
                new Date().toISOString()

        });

    }


    return percentage;

}


// ==========================================
// Generate Curriculum ID
// ==========================================

function generateCurriculumId() {

    return `CUR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;

}


// ==========================================
// Build Curriculum Item
// ==========================================

function buildCurriculumItem(
    doc
) {

    if (!doc || !doc.exists) {

        return null;

    }


    const data =
        doc.data();


    return {

        curriculumId:
            data.curriculumId ||
            doc.id,

        madrassahId:
            data.madrassahId ||
            "",

        subject:
            data.subject ||
            "",

        level:
            data.level ||
            "",

        title:
            data.title ||
            "",

        description:
            data.description ||
            "",

        order:
            Number(
                data.order || 0
            ),

        status:
            data.status ||
            CURRICULUM_STATUSES.NOT_STARTED,

        createdAt:
            data.createdAt ||
            "",

        updatedAt:
            data.updatedAt ||
            ""

    };

}


// ==========================================
// Build Curriculum Progress
// ==========================================

function buildCurriculumProgress(
    doc
) {

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

        curriculumId:
            data.curriculumId ||
            "",

        status:
            data.status ||
            CURRICULUM_STATUSES.NOT_STARTED,

        teacherId:
            data.teacherId ||
            "",

        teacherName:
            data.teacherName ||
            "",

        note:
            data.note ||
            "",

        completedAt:
            data.completedAt ||
            "",

        updatedAt:
            data.updatedAt ||
            ""

    };

}