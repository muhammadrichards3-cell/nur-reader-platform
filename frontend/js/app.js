// ==========================================
// Nūr Reader Platform
// app.js
// ==========================================

async function loadView(viewName) {

    const response = await fetch(`views/${viewName}.html`);

    const html = await response.text();

    document.getElementById("app-content").innerHTML = html;

if(viewName==="registration"){

    initialiseRegistrationPage();

}

}

// Dashboard loads first
loadView("dashboard");

// Navigation
document.addEventListener("click", function (event) {

    const menu = event.target.closest("[data-view]");

    if (!menu) return;

    event.preventDefault();

    loadView(menu.dataset.view);

});

// ----------------------------
// Child Registration Cards
// ----------------------------

let childNumber = 0;

function initialiseRegistrationPage() {

    const addButton = document.getElementById("addChildButton");

    if (!addButton) return;

    childNumber = 0;

    document.getElementById("children-container").innerHTML = "";

    addButton.onclick = addChildCard;

}

function addChildCard(){

    childNumber++;

    const container = document.getElementById("children-container");

    container.insertAdjacentHTML("beforeend",`

        <div class="card mt-4">

            <div class="card-header">

                Child ${childNumber}

            </div>

            <div class="card-body">

                <div class="row">

                    <div class="col-md-6 mb-3">

                        <label class="form-label">

                            Full Name

                        </label>

                        <input
                            class="form-control"
                            type="text">

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">

                            Grade

                        </label>

                        <input
                            class="form-control"
                            type="text">

                    </div>

                    <div class="col-md-3 mb-3">

                        <label class="form-label">

                            Date of Birth

                        </label>

                        <input
                            class="form-control"
                            type="date">

                    </div>

                </div>

            </div>

        </div>

    `);

}