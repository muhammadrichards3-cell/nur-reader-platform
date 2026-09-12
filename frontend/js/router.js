// ==========================================
// Nūr Reader Platform
// Central Router
// Version 1.0.0
// ==========================================

// ==========================================
// Navigate to View
// ==========================================

function navigateTo(viewName) {

    if (!viewName) return;

    loadView(viewName);

}


// ==========================================
// Sidebar Navigation
// ==========================================

document.addEventListener("click", function (event) {

    const menu = event.target.closest("[data-view]");

    if (!menu) return;

    event.preventDefault();

    const viewName = menu.dataset.view;

    navigateTo(viewName);

});