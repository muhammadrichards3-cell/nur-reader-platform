// ==========================================
// Nūr Reader Platform
// Sidebar Component
// F014.x
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

        <div class="nur-sidebar">

            <!-- ==================================
                 BRAND
            =================================== -->

            <div class="nur-sidebar-brand">

                <div class="nur-brand-mark">
                    ن
                </div>

                <div class="nur-brand-text">

                    <div class="nur-brand-name">
                        Nūr
                    </div>

                    <div class="nur-brand-subtitle">
                        Reader Platform
                    </div>

                </div>

            </div>


            <!-- ==================================
                 NAVIGATION
            =================================== -->

            <div class="nur-sidebar-section">

                <div class="nur-sidebar-label">
                    MAIN
                </div>


                <ul class="nur-sidebar-nav">


                    <!-- Dashboard -->

                    <li>

                        <a
                            href="#"
                            data-view="dashboard"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-grid-1x2-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Dashboard
                            </span>

                        </a>

                    </li>


                    <!-- Register Family -->

                    <li>

                        <a
                            href="#"
                            data-view="registration"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-person-plus-fill"></i>
                            </span>

                            <span class="nur-nav-text">
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

                            <span class="nur-nav-icon">
                                <i class="bi bi-people-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Families
                            </span>

                        </a>

                    </li>


                </ul>

            </div>


            <!-- ==================================
                 LIBRARY
            =================================== -->

            <div class="nur-sidebar-section">

                <div class="nur-sidebar-label">
                    LIBRARY
                </div>


                <ul class="nur-sidebar-nav">


                    <!-- Library -->

                    <li>

                        <a
                            href="#"
                            data-view="library"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-book-fill"></i>
                            </span>

                            <span class="nur-nav-text">
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

                            <span class="nur-nav-icon">
                                <i class="bi bi-arrow-left-right"></i>
                            </span>

                            <span class="nur-nav-text">
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

                            <span class="nur-nav-icon">
                                <i class="bi bi-award-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Reader Passports
                            </span>

                        </a>

                    </li>


                </ul>

            </div>


            <!-- ==================================
                 MADRASSAH
            =================================== -->

            <div class="nur-sidebar-section">

                <div class="nur-sidebar-label">
                    MADRASSAH
                </div>


                <ul class="nur-sidebar-nav">


                    <!-- Learner Progress -->

                    <li>

                        <a
                            href="#"
                            data-view="learner-progress"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-mortarboard-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Learner Progress
                            </span>

                        </a>

                    </li>


                    <!-- Attendance -->

                    <li>

                        <a
                            href="#"
                            data-view="attendance"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-calendar-check-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Attendance
                            </span>

                        </a>

                    </li>


                    <!-- Curriculum -->

                    <li>

                        <a
                            href="#"
                            data-view="curriculum"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-journal-check"></i>
                            </span>

                            <span class="nur-nav-text">
                                Curriculum
                            </span>

                        </a>

                    </li>

                    <li>

    <a
        href="#"
        data-view="quran-progress"
    >

        <span class="nur-nav-icon">
            <i class="bi bi-book-half"></i>
        </span>

        <span class="nur-nav-text">
            Qur'an Progress
        </span>

    </a>

</li>

<li>

    <a
        href="#"
        data-view="dua-progress"
    >

        <span class="nur-nav-icon">
            <i class="bi bi-bookmark-heart-fill"></i>
        </span>

        <span class="nur-nav-text">
            Duʿā Progress
        </span>

    </a>

</li>

                </ul>

            </div>


            <!-- ==================================
                 SYSTEM
            =================================== -->

            <div class="nur-sidebar-section">

                <div class="nur-sidebar-label">
                    SYSTEM
                </div>


                <ul class="nur-sidebar-nav">


                    <!-- Settings -->

                    <li>

                        <a
                            href="#"
                            data-view="settings"
                        >

                            <span class="nur-nav-icon">
                                <i class="bi bi-gear-fill"></i>
                            </span>

                            <span class="nur-nav-text">
                                Settings
                            </span>

                        </a>

                    </li>


                </ul>

            </div>


            <!-- ==================================
                 SIDEBAR FOOTER
            =================================== -->

            <div class="nur-sidebar-footer">

                <div class="nur-sidebar-footer-mark">
                    ن
                </div>

                <div>

                    <div class="nur-sidebar-footer-title">
                        Nūr Reader Platform
                    </div>

                    <div class="nur-sidebar-footer-text">
                        Beneficial knowledge,
                        one reader at a time.
                    </div>

                </div>

            </div>

        </div>

    `;


    updateSidebarActiveState(
        getCurrentView()
    );

}


// ==========================================
// Determine Current View
// ==========================================

function getCurrentView() {

    const content =
        document.getElementById(
            "app-content"
        );


    if (
        content &&
        content.dataset &&
        content.dataset.view
    ) {

        return content.dataset.view;

    }


    return "dashboard";

}


// ==========================================
// Update Active Navigation
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

            link.classList.toggle(
                "active",
                link.dataset.view === viewName
            );

        }
    );

}


// ==========================================
// Navigation Listener
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                "#app-sidebar [data-view]"
            );


        if (!link) {

            return;

        }


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
// Initialise
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