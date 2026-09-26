// ==========================================
// Nūr Reader Platform
// Attendance Service
// F014.2
// ==========================================


// ==========================================
// Attendance Statuses
// ==========================================

const ATTENDANCE_STATUSES = {

    PRESENT: "Present",

    ABSENT: "Absent",

    LATE: "Late",

    EXCUSED: "Excused"

};


// ==========================================
// Create Attendance Record
// ==========================================

async function recordAttendance(
    learnerId,
    date,
    status,
    data = {}
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    if (!date) {

        throw new Error(
            "Attendance date is required."
        );

    }


    if (!Object.values(
        ATTENDANCE_STATUSES
    ).includes(status)) {

        throw new Error(
            "Invalid attendance status."
        );

    }


    const attendanceId =
        `${learnerId}_${date}`;


    const record = {

        attendanceId:

            attendanceId,

        learnerId:

            learnerId,

        date:

            date,

        status:

            status,

        madrassahId:

            data.madrassahId || "",

        className:

            data.className || "",

        teacherId:

            data.teacherId || "",

        teacherName:

            data.teacherName || "",

        note:

            data.note || "",

        recordedAt:

            new Date().toISOString()

    };


    await db
        .collection("attendance")
        .doc(attendanceId)
        .set(
            record,
            {
                merge: true
            }
        );


    await recalculateAttendanceRate(
        learnerId
    );


    return record;

}


// ==========================================
// Get Learner Attendance
// ==========================================

async function getLearnerAttendance(
    learnerId
) {

    if (!learnerId) {

        throw new Error(
            "Learner ID is required."
        );

    }


    const snapshot =
        await db
            .collection("attendance")
            .where(
                "learnerId",
                "==",
                learnerId
            )
            .get();


    return snapshot.docs
        .map(
            doc =>
                buildAttendanceRecord(doc)
        )
        .filter(
            record => record !== null
        )
        .sort(
            (a, b) =>
                b.date.localeCompare(
                    a.date
                )
        );

}


// ==========================================
// Get Attendance For Date
// ==========================================

async function getAttendanceForDate(
    date,
    madrassahId = ""
) {

    if (!date) {

        throw new Error(
            "Attendance date is required."
        );

    }


    let query =
        db
            .collection("attendance")
            .where(
                "date",
                "==",
                date
            );


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
                buildAttendanceRecord(doc)
        )
        .filter(
            record => record !== null
        );

}


// ==========================================
// Calculate Attendance Rate
// ==========================================

async function calculateAttendanceRate(
    learnerId
) {

    const records =
        await getLearnerAttendance(
            learnerId
        );


    if (!records.length) {

        return 0;

    }


    const countedRecords =
        records.filter(
            record =>
                record.status !==
                ATTENDANCE_STATUSES.EXCUSED
        );


    if (!countedRecords.length) {

        return 100;

    }


    const attended =
        countedRecords.filter(
            record =>
                record.status ===
                    ATTENDANCE_STATUSES.PRESENT ||
                record.status ===
                    ATTENDANCE_STATUSES.LATE
        ).length;


    return Math.round(
        (
            attended /
            countedRecords.length
        ) * 100
    );

}


// ==========================================
// Recalculate Learner Attendance Rate
// ==========================================

async function recalculateAttendanceRate(
    learnerId
) {

    const rate =
        await calculateAttendanceRate(
            learnerId
        );


    const progressRef =
        db
            .collection("learnerProgress")
            .doc(learnerId);


    const progressDoc =
        await progressRef.get();


    if (progressDoc.exists) {

        await progressRef.update({

            attendanceRate:
                rate,

            updatedAt:
                new Date().toISOString()

        });

    }


    return rate;

}


// ==========================================
// Build Attendance Record
// ==========================================

function buildAttendanceRecord(
    doc
) {

    if (!doc || !doc.exists) {

        return null;

    }


    const data =
        doc.data();


    return {

        attendanceId:
            data.attendanceId ||
            doc.id,

        learnerId:
            data.learnerId ||
            "",

        date:
            data.date ||
            "",

        status:
            data.status ||
            "",

        madrassahId:
            data.madrassahId ||
            "",

        className:
            data.className ||
            "",

        teacherId:
            data.teacherId ||
            "",

        teacherName:
            data.teacherName ||
            "",

        note:
            data.note ||
            "",

        recordedAt:
            data.recordedAt ||
            ""

    };

}