// ==========================================
// Nūr Reader Platform
// Application Controller
// Version 1.2.1
// ==========================================

// ==========================================
// Load View
// ==========================================

async function loadView(viewName) {

    const content = document.getElementById("app-content");

    if (!content) return;

    try {

        const response = await fetch(`views/${viewName}.html`);

        if (!response.ok) {
            throw new Error(`View "${viewName}" could not be loaded.`);
        }

        const html = await response.text();

        content.innerHTML = html;

document.getElementById(
    "app-content"
).dataset.view = viewName;

updateSidebarActiveState(
    viewName
);        
        // --------------------------------------
        // Initialise Existing View Modules
        // --------------------------------------

        switch (viewName) {

            case "dashboard":

                if (typeof initialiseDashboardPage === "function") {
                    initialiseDashboardPage();
                }

                break;


            case "registration":

                if (typeof initialiseRegistrationPage === "function") {
                    initialiseRegistrationPage();
                }

                break;


            case "families":

                if (typeof initialiseFamiliesPage === "function") {
                    initialiseFamiliesPage();
                }

                break;


            case "library":

                if (typeof initialiseLibraryPage === "function") {
                    initialiseLibraryPage();
                }

                break;

            case "loans":
                    initialiseLoansPage();
                break;

            case "learner-progress":
                    initialiseLearnerProgressPage();
                break;

            case "attendance":
                    initialiseAttendancePage();
                break;

            case "curriculum":
                    initialiseCurriculumPage();
                break;

            case "quran-progress":
                    initialiseQuranProgressPage();
                break;

                case "dua-progress":
                    initialiseDuaProgressPage();
                break;
                
            case "reader-passports":

                if (typeof initialiseReaderPassportsPage === "function") {
                    initialiseReaderPassportsPage();
                }

                break;


            case "settings":

                if (typeof initialiseSettingsPage === "function") {
                    initialiseSettingsPage();
                }

                break;


            default:
                break;

        }

    } catch (error) {

        console.error("Nūr Platform View Error:", error);

        content.innerHTML = `

            <div class="alert alert-danger" role="alert">

                <h5 class="alert-heading">
                    Unable to load this page
                </h5>

                <p class="mb-0">
                    ${error.message}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Load Initial View
// ==========================================

loadView("dashboard");