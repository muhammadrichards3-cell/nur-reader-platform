// ==========================================
// Nūr Reader Platform
// Learner Progress Service
// F014.1
// ==========================================


// ==========================================
// Create Learner Progress Profile
// ==========================================

async function createLearnerProgressProfile(
    learnerId,
    data = {}
) {

    if (!learnerId) {
        throw new Error("Learner ID is required.");
    }


    const existing =
        await db
            .collection("learnerProgress")
            .doc(learnerId)
            .get();


    if (existing.exists) {
        return buildLearnerProgressProfile(existing);
    }


    const profile = {

        learnerId: learnerId,

        madrassahId:
            data.madrassahId || "",

        madrassahName:
            data.madrassahName || "",

        className:
            data.className || "",

        teacherId:
            data.teacherId || "",

        teacherName:
            data.teacherName || "",

        level:
            data.level || "",

        attendanceRate: 0,

        curriculumProgress: 0,

        surahProgress: 0,

        duaProgress: 0,

        overallProgress: 0,

        notes: "",

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    await db
        .collection("learnerProgress")
        .doc(learnerId)
        .set(profile);


    return profile;

}


// ==========================================
// Get Learner Progress Profile
// ==========================================

async function getLearnerProgressProfile(
    learnerId
) {

    if (!learnerId) {
        throw new Error("Learner ID is required.");
    }


    const doc =
        await db
            .collection("learnerProgress")
            .doc(learnerId)
            .get();


    if (!doc.exists) {
        return null;
    }


    return buildLearnerProgressProfile(doc);

}


// ==========================================
// Get All Learner Progress Profiles
// ==========================================

async function getAllLearnerProgressProfiles() {

    const snapshot =
        await db
            .collection("learnerProgress")
            .get();


    return snapshot.docs
        .map(
            doc =>
                buildLearnerProgressProfile(doc)
        )
        .filter(
            profile => profile !== null
        );

}


// ==========================================
// Update Learner Progress Profile
// ==========================================

async function updateLearnerProgressProfile(
    learnerId,
    updates = {}
) {

    if (!learnerId) {
        throw new Error("Learner ID is required.");
    }


    await db
        .collection("learnerProgress")
        .doc(learnerId)
        .update({

            ...updates,

            updatedAt:
                new Date().toISOString()

        });


    return getLearnerProgressProfile(
        learnerId
    );

}


// ==========================================
// Build Profile
// ==========================================

function buildLearnerProgressProfile(doc) {

    if (!doc || !doc.exists) {
        return null;
    }


    const data =
        doc.data();


    return {

        learnerId:
            data.learnerId || doc.id,

        madrassahId:
            data.madrassahId || "",

        madrassahName:
            data.madrassahName || "",

        className:
            data.className || "",

        teacherId:
            data.teacherId || "",

        teacherName:
            data.teacherName || "",

        level:
            data.level || "",

        attendanceRate:
            Number(
                data.attendanceRate || 0
            ),

        curriculumProgress:
            Number(
                data.curriculumProgress || 0
            ),

        surahProgress:
            Number(
                data.surahProgress || 0
            ),

        duaProgress:
            Number(
                data.duaProgress || 0
            ),

        overallProgress:
            Number(
                data.overallProgress || 0
            ),

        notes:
            data.notes || "",

        createdAt:
            data.createdAt || "",

        updatedAt:
            data.updatedAt || ""

    };

}