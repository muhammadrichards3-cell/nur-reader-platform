// ==========================================
// Nūr Reader Platform
// Sidebar Component
// Version 1.2.0
// ==========================================


// ==========================================
// Initialise Sidebar
// ==========================================

function initialiseSidebar() {

    const sidebar =
        document.getElementById("app-sidebar");


    if (!sidebar) {

        console.error(
            "Nūr Platform: #app-sidebar was not found."
        );

        return;

    }


    sidebar.innerHTML = `

        <nav class="sidebar h-100">

            <!-- ==================================
                 BRAND
            =================================== -->

            <div class="brand">

                <div class="brand-mark">

                    <span>ن</span>

                </div>

                <div>

                    <div class="brand-name">
                        Nūr
                    </div>

                    <div class="brand-tagline">
                        Reader Platform
                    </div>

                </div>

            </div>


            <hr class="nav-divider">


            <!-- ==================================
                 NAVIGATION
            =================================== -->

            <ul class="snav list-unstyled mb-0">


                <!-- Dashboard -->

                <li>

                    <a
                        href="#"
                        data-view="dashboard"
                    >

                        <i class="bi bi-grid-1x2-fill"></i>

                        <span>
                            Dashboard
                        </span>

                    </a>

                </li>


                <!-- Registration -->

                <li>

                    <a
                        href="#"
                        data-view="registration"
                    >

                        <i class="bi bi-person-plus-fill"></i>

                        <span>
                            Register Family
                        </span>

                    </a>

                </li>


                <!-- Families -->

                <li>

                    <a
                        href="#"
                        data-view="families"
                    >

                        <i class="bi bi-people-fill"></i>

                        <span>
                            Families
                        </span>

                    </a>

                </li>


                <!-- Library -->

                <li>

                    <a
                        href="#"
                        data-view="library"
                    >

                        <i class="bi bi-book-fill"></i>

                        <span>
                            Library
                        </span>

                    </a>

                </li>


                <!-- Loans -->

                <li>

                    <a
                        href="#"
                        data-view="loans"
                    >

                        <i class="bi bi-arrow-left-right"></i>

                        <span>
                            Loans & Circulation
                        </span>

                    </a>

                </li>


                <!-- Reader Passports -->

                <li>

                    <a
                        href="#"
                        data-view="reader-passports"
                    >

                        <i class="bi bi-award-fill"></i>

                        <span>
                            Reader Passports
                        </span>

                    </a>

                </li>


                <!-- Settings -->

                <li>

                    <a
                        href="#"
                        data-view="settings"
                    >

                        <i class="bi bi-gear-fill"></i>

                        <span>
                            Settings
                        </span>

                    </a>

                </li>


            </ul>


            <!-- ==================================
                 SIDEBAR FOOTER
            =================================== -->

            <div class="sidebar-foot mt-auto">

                <div class="small">
                    Nūr Reader Platform
                </div>

                <div class="small opacity-75">
                    Every story lit is a light passed on.
                </div>

            </div>


        </nav>

    `;


    // ======================================
    // Active Navigation
    // ======================================

    updateSidebarActiveState(
        getCurrentView()
    );

}


// ==========================================
// Get Current View
// ==========================================

function getCurrentView() {

    const activeView =
        document.querySelector(
            "#app-content"
        )?.dataset?.view;


    return activeView || "dashboard";

}


// ==========================================
// Update Active State
// ==========================================

function updateSidebarActiveState(
    viewName
) {

    const links =
        document.querySelectorAll(
            "#app-sidebar [data-view]"
        );


    links.forEach(
        link => {

            const isActive =
                link.dataset.view === viewName;


            link.classList.toggle(
                "active",
                isActive
            );

        }
    );

}


// ==========================================
// Listen for Navigation
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "#app-sidebar [data-view]"
            );


        if (!link) return;


        updateSidebarActiveState(
            link.dataset.view
        );

    }
);


// ==========================================
// Compatibility Alias
// ==========================================

function initializeSidebar() {

    initialiseSidebar();

}


// ==========================================
// Automatic Initialisation
// ==========================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initialiseSidebar
    );

} else {

    initialiseSidebar();

}