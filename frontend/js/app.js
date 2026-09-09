// ==========================================
// Nūr Reader Platform
// app.js
// Version 1.3.0
// ==========================================


// ==========================================
// Render Navigation
// ==========================================

function renderNavigation() {

    const navigation = document.getElementById("main-navigation");

    if (!navigation) return;

    navigation.innerHTML = "";

    NUR_APP.navigation.forEach(function (item) {

        const listItem = document.createElement("li");

        listItem.className = "nav-item mb-2";

        listItem.innerHTML = `
            <a href="#"
               class="nav-link text-white"
               data-view="${item.view}">

                <i class="bi ${item.icon}"></i>

                ${item.label}

            </a>
        `;

        navigation.appendChild(listItem);

    });

}


// ==========================================
// Load View
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
// Initialise Application
// ==========================================

function initialiseApplication() {

    renderNavigation();

    loadView(NUR_APP.defaultView);

}


// ==========================================
// Start Application
// ==========================================

initialiseApplication();


// ==========================================
// Sidebar Navigation
// ==========================================

document.addEventListener("click", function (event) {

    const menu = event.target.closest("[data-view]");

    if (!menu) return;

    event.preventDefault();

    loadView(menu.dataset.view);

});