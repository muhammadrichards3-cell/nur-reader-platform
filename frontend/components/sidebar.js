// ==========================================
// Nūr Reader Platform
// Sidebar Component
// Version 1.0.0
// ==========================================

function renderSidebar() {

    const sidebar = document.getElementById("app-sidebar");

    if (!sidebar) return;

    sidebar.innerHTML = `

        <div class="sidebar-content p-3">

            <div class="mb-4">

                <small class="text-uppercase text-muted fw-semibold">
                    Main
                </small>

            </div>

            <nav class="nav flex-column gap-1">

                <a
                    href="#"
                    class="nav-link"
                    data-view="dashboard"
                >
                    <i class="bi bi-grid me-2"></i>
                    Dashboard
                </a>

            </nav>


            <div class="mt-4 mb-2">

                <small class="text-uppercase text-muted fw-semibold">
                    Library
                </small>

            </div>

            <nav class="nav flex-column gap-1">

                <a
                    href="#"
                    class="nav-link"
                    data-view="registration"
                >
                    <i class="bi bi-person-plus me-2"></i>
                    Register Learner
                </a>

                <a
                    href="#"
                    class="nav-link"
                    data-view="families"
                >
                    <i class="bi bi-people me-2"></i>
                    Families
                </a>

                <a
                    href="#"
                    class="nav-link"
                    data-view="library"
                >
                    <i class="bi bi-book me-2"></i>
                    Library
                </a>

                <a
                    href="#"
                    class="nav-link"
                    data-view="reader-passports"
                >
                    <i class="bi bi-person-vcard me-2"></i>
                    Reader Passports
                </a>

            </nav>


            <div class="mt-4 mb-2">

                <small class="text-uppercase text-muted fw-semibold">
                    Platform
                </small>

            </div>

            <nav class="nav flex-column gap-1">

                <a
                    href="#"
                    class="nav-link"
                    data-view="settings"
                >
                    <i class="bi bi-gear me-2"></i>
                    Settings
                </a>

            </nav>

        </div>

    `;

}


// ==========================================
// Initialise Sidebar
// ==========================================

renderSidebar();