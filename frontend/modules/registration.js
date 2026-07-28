// ======================================
// Nūr Reader Platform
// Registration Module
// Version 0.6.0
// ======================================

let childNumber = 0;

// ======================================
// Initialise Registration Page
// ======================================

function initialiseRegistrationPage() {

    childNumber = 0;

    document.getElementById("children-container").innerHTML = "";

    document
        .getElementById("addChildButton")
        .addEventListener("click", addChildCard);

    document
        .getElementById("registration-form")
        .addEventListener("submit", saveRegistration);

    addChildCard();

}

// ======================================
// Add Reader Card
// ======================================

function addChildCard() {

    childNumber++;

    document.getElementById("children-container")
        .insertAdjacentHTML("beforeend", `

        <div class="card mb-3">

            <div class="card-header">

                Reader ${childNumber}

            </div>

            <div class="card-body">

                <div class="row">

                    <div class="col-md-6 mb-3">

                        <label class="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="childName${childNumber}"
                            required>

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">
                            Grade
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="childGrade${childNumber}">

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            class="form-control"
                            id="childDob${childNumber}">

                    </div>

                </div>

            </div>

        </div>

    `);

}

// ======================================
// Save Registration
// ======================================

async function saveRegistration(event) {

    event.preventDefault();

    try {

        const parentName = document.getElementById("parentName").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const email = document.getElementById("email").value.trim();
        const suburb = document.getElementById("suburb").value.trim();

        if (parentName === "") {

            alert("Please enter the parent or guardian's name.");
            return;

        }

        const familyId = await getNextFamilyId();

        const family = {

            familyId,
            parentName,
            mobile,
            email,
            suburb,
            registeredDate: getCurrentDate(),
            status: "Active"

        };

        await db
            .collection("families")
            .doc(familyId)
            .set(family);

        // ==========================
        // Save Readers
        // ==========================

        for (let i = 1; i <= childNumber; i++) {

            const readerName = document.getElementById(`childName${i}`).value.trim();
            const grade = document.getElementById(`childGrade${i}`).value.trim();
            const dob = document.getElementById(`childDob${i}`).value;

            if (readerName === "") continue;

            const readerId = await getNextReaderId();

            const reader = {

                readerId,
                familyId,
                fullName: readerName,
                grade,
                dateOfBirth: dob,
                status: "Active",
                booksRead: 0,
                booksBorrowed: 0,
                badge: "Seedling"

            };

            await db
                .collection("readers")
                .doc(readerId)
                .set(reader);

        }

        alert(`✅ ${familyId} registered successfully.`);

        document.getElementById("registration-form").reset();

        childNumber = 0;

        document.getElementById("children-container").innerHTML = "";

        addChildCard();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}