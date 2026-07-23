// ======================================
// Nūr Reader Platform
// app.js
// Version 0.4.0
// ======================================

// -----------------------------
// Load View
// -----------------------------
async function loadView(viewName) {

    try {

        const response = await fetch(`views/${viewName}.html`);

        if (!response.ok) {

            throw new Error(`Unable to load ${viewName}.html`);

        }

        const html = await response.text();

        document.getElementById("app-content").innerHTML = html;

        // Initialise page modules
        switch (viewName) {

    case "dashboard":
        initialiseDashboardPage();
        break;

    case "registration":
        initialiseRegistrationPage();
        break;

}

    }

    catch (error) {

        console.error(error);

        document.getElementById("app-content").innerHTML = `

            <div class="alert alert-danger">

                <h5>Unable to load page</h5>

                <p>${error.message}</p>

            </div>

        `;

    }

}

// -----------------------------
// Navigation
// -----------------------------
document.addEventListener("click", function (event) {

    const menu = event.target.closest("[data-view]");

    if (!menu) return;

    event.preventDefault();

    loadView(menu.dataset.view);

});

// -----------------------------
// Start Application
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {

    loadView("dashboard");

});