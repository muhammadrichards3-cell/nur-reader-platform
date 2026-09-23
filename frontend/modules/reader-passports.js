// ==========================================
// Nūr Reader Platform
// Reader Passports Module
// Version 2.0.0
// ==========================================


// ==========================================
// Initialise Reader Passports
// ==========================================

async function initialiseReaderPassportsPage() {

    const listContainer =
        document.getElementById("readerProfilesContainer");

    const detailContainer =
        document.getElementById("readerProfileDetail");

    if (!listContainer) return;

    if (detailContainer) {
        detailContainer.innerHTML = "";
    }

    try {

        const readers = await getAllReaderProfiles();

        renderReaderProfiles(
            readers,
            listContainer
        );

    } catch (error) {

        console.error(
            "Reader Passports Error:",
            error
        );

        listContainer.innerHTML = `

            <div class="alert alert-danger">

                <h5 class="alert-heading">
                    Unable to load reader passports
                </h5>

                <p class="mb-0">
                    ${escapeHtml(error.message)}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Render Reader Cards
// ==========================================

function renderReaderProfiles(
    readers,
    container
) {

    if (!readers.length) {

        container.innerHTML = `

            <div class="alert alert-info">

                <h5>No readers registered</h5>

                <p class="mb-0">
                    Register a family and reader to create
                    the first Reader Passport.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="row g-4">

            ${readers.map(reader => `

                <div class="col-md-6 col-xl-4">

                    <div class="card h-100 shadow-sm">

                        <div class="card-body">

                            <div class="d-flex
                                        justify-content-between
                                        align-items-start
                                        mb-3">

                                <div>

                                    <h5 class="mb-1">
                                        ${escapeHtml(reader.fullName)}
                                    </h5>

                                    <small class="text-muted">
                                        ${escapeHtml(reader.readerId)}
                                    </small>

                                </div>

                                <span class="badge bg-success">

                                    ${escapeHtml(reader.status)}

                                </span>

                            </div>


                            <div class="mb-3">

                                <small class="text-muted">
                                    Grade
                                </small>

                                <div class="fw-semibold">

                                    ${escapeHtml(
                                        reader.grade || "Not recorded"
                                    )}

                                </div>

                            </div>


                            <div class="row text-center mb-4">

                                <div class="col-4">

                                    <div class="fs-5 fw-bold">
                                        ${reader.booksRead}
                                    </div>

                                    <small class="text-muted">
                                        Read
                                    </small>

                                </div>

                                <div class="col-4">

                                    <div class="fs-5 fw-bold">
                                        ${reader.booksBorrowed}
                                    </div>

                                    <small class="text-muted">
                                        Borrowed
                                    </small>

                                </div>

                                <div class="col-4">

                                    <div class="fs-5 fw-bold">
                                        ${escapeHtml(reader.badge)}
                                    </div>

                                    <small class="text-muted">
                                        Badge
                                    </small>

                                </div>

                            </div>


                            <button
                                type="button"
                                class="btn btn-outline-success w-100"
                                data-reader-profile="${escapeHtml(reader.readerId)}"
                            >

                                <i class="bi bi-person-vcard me-2"></i>

                                View Passport

                            </button>

                        </div>

                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


// ==========================================
// View Individual Reader
// ==========================================

async function viewReaderProfile(readerId) {

    const listContainer =
        document.getElementById("readerProfilesContainer");

    const detailContainer =
        document.getElementById("readerProfileDetail");

    if (!detailContainer) return;

    try {

        const reader =
            await getReaderProfile(readerId);


        detailContainer.innerHTML = `

            <div class="card shadow-sm mt-4">

                <div class="card-header
                            d-flex
                            justify-content-between
                            align-items-center">

                    <strong>
                        Reader Passport
                    </strong>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        id="backToReadersButton"
                    >

                        <i class="bi bi-arrow-left me-1"></i>

                        Back to Readers

                    </button>

                </div>


                <div class="card-body">

                    <div class="row g-4">


                        <!-- Identity -->

                        <div class="col-md-8">

                            <div class="mb-4">

                                <small class="text-muted">
                                    Reader
                                </small>

                                <h2 class="mb-1">

                                    ${escapeHtml(reader.fullName)}

                                </h2>

                                <span class="badge bg-success">

                                    ${escapeHtml(reader.status)}

                                </span>

                            </div>


                            <div class="row g-3">

                                <div class="col-sm-6">

                                    <div class="border rounded p-3">

                                        <small class="text-muted">
                                            Reader ID
                                        </small>

                                        <div class="fw-semibold">
                                            ${escapeHtml(reader.readerId)}
                                        </div>

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div class="border rounded p-3">

                                        <small class="text-muted">
                                            Family ID
                                        </small>

                                        <div class="fw-semibold">
                                            ${escapeHtml(reader.familyId || "—")}
                                        </div>

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div class="border rounded p-3">

                                        <small class="text-muted">
                                            Grade
                                        </small>

                                        <div class="fw-semibold">
                                            ${escapeHtml(reader.grade || "—")}
                                        </div>

                                    </div>

                                </div>


                                <div class="col-sm-6">

                                    <div class="border rounded p-3">

                                        <small class="text-muted">
                                            Date of Birth
                                        </small>

                                        <div class="fw-semibold">
                                            ${escapeHtml(reader.dateOfBirth || "—")}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <!-- Passport -->

                        <div class="col-md-4">

                            <div class="border rounded p-4 text-center h-100">

                                <i class="bi bi-award fs-1 text-success"></i>

                                <h5 class="mt-3">
                                    Reading Achievement
                                </h5>

                                <div class="display-6 fw-bold">
                                    ${escapeHtml(reader.badge)}
                                </div>

                                <p class="text-muted mb-4">
                                    Current Reader Badge
                                </p>


                                <div class="row">

                                    <div class="col-6">

                                        <div class="fs-4 fw-bold">
                                            ${reader.booksRead}
                                        </div>

                                        <small class="text-muted">
                                            Books Read
                                        </small>

                                    </div>

                                    <div class="col-6">

                                        <div class="fs-4 fw-bold">
                                            ${reader.booksBorrowed}
                                        </div>

                                        <small class="text-muted">
                                            Borrowed
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `;


        if (listContainer) {

            listContainer.style.display = "none";

        }


        document
            .getElementById("backToReadersButton")
            ?.addEventListener(
                "click",
                function () {

                    detailContainer.innerHTML = "";

                    if (listContainer) {
                        listContainer.style.display = "";
                    }

                }
            );


        detailContainer.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(
            "Reader Profile Error:",
            error
        );

        detailContainer.innerHTML = `

            <div class="alert alert-danger mt-4">

                ${escapeHtml(error.message)}

            </div>

        `;

    }

}


// ==========================================
// Reader Passport Click Handling
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-reader-profile]"
            );

        if (!button) return;

        const readerId =
            button.dataset.readerProfile;

        viewReaderProfile(readerId);

    }
);