// ==========================================
// Nūr Reader Platform
// Central Router
// Version 1.1.0
// ==========================================


// ==========================================
// Navigate to View
// ==========================================

function navigateTo(viewName) {

    if (!viewName) return;

    loadView(viewName);

}


// ==========================================
// Set Active View
// ==========================================

function setActiveView(viewName) {

    const appContent =
        document.getElementById("app-content");


    if (!appContent) return;


    appContent.dataset.view =
        viewName;


    updateSidebarActiveState(
        viewName
    );

}


// ==========================================
// Sidebar Navigation
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const menu =
            event.target.closest(
                "[data-view]"
            );


        if (!menu) return;


        event.preventDefault();


        const viewName =
            menu.dataset.view;


        setActiveView(
            viewName
        );


        navigateTo(
            viewName
        );

    }
);