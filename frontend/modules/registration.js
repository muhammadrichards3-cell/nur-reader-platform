// ======================================
// Nūr Reader Platform
// Registration Module
// Version 0.4.0
// ======================================

let childNumber = 0;

// Initialise the registration page
function initialiseRegistrationPage() {

    childNumber = 0;

    const container = document.getElementById("children-container");
    container.innerHTML = "";

    document
        .getElementById("addChildButton")
        .addEventListener("click", addChildCard);

    // Add the first reader automatically
    addChildCard();

}

// --------------------------------------
// Add Reader Card
// --------------------------------------

function addChildCard() {

    childNumber++;

    const container = document.getElementById("children-container");

    container.insertAdjacentHTML("beforeend", `

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
                            id="childName_${childNumber}"
                            required>

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">
                            Grade
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="grade_${childNumber}">

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            class="form-control"
                            id="dob_${childNumber}">

                    </div>

                </div>

            </div>

        </div>

    `);

}