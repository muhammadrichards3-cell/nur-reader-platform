// ==========================================
// Nūr Reader Platform
// app.js
// Version 1.1.0
// ==========================================

async function loadView(viewName) {

    const response = await fetch(`views/${viewName}.html`);

    const html = await response.text();

    document.getElementById("app-content").innerHTML = html;

    // -----------------------------
    // Initialise Views
    // -----------------------------

    switch (viewName) {

        case "dashboard":
            // Dashboard currently has no initialisation
            break;

        case "registration":
            initialiseRegistrationPage();
            break;

        case "families":
            initialiseFamiliesPage();
            break;

        default:
            break;

    }

}

// ==========================================
// Load Dashboard First
// ==========================================

loadView("dashboard");

// ==========================================
// Sidebar Navigation
// ==========================================

document.addEventListener("click", function (event) {

    const menu = event.target.closest("[data-view]");

    if (!menu) return;

    event.preventDefault();

    loadView(menu.dataset.view);

});