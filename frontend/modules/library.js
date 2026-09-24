// ==========================================
// Nūr Reader Platform
// Library Module
// Version 1.0.0
// ==========================================

let libraryBooks = [];


// ==========================================
// Initialise Library
// ==========================================

async function initialiseLibraryPage() {

    const container =
        document.getElementById("libraryBooksContainer");

    if (!container) return;

    try {

        libraryBooks = await getAllBooks();

        renderLibraryBooks(libraryBooks);

        initialiseBookSearch();

    } catch (error) {

        console.error(
            "Library Error:",
            error
        );

        container.innerHTML = `

            <div class="alert alert-danger">

                <h5 class="alert-heading">
                    Unable to load library
                </h5>

                <p class="mb-0">
                    ${escapeHtml(error.message)}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Render Books
// ==========================================

function renderLibraryBooks(books) {

    const container =
        document.getElementById("libraryBooksContainer");

    if (!container) return;


    if (!books.length) {

        container.innerHTML = `

            <div class="alert alert-info">

                No books found in the catalogue.

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="row g-4">

            ${books.map(book => `

                <div class="col-md-6 col-xl-4">

                    <div class="card h-100 shadow-sm">

                        <div class="card-body">

                            <div class="d-flex
                                        justify-content-between
                                        align-items-start
                                        mb-3">

                                <div>

                                    <h5 class="mb-1">

                                        ${escapeHtml(book.title)}

                                    </h5>

                                    <small class="text-muted">

                                        ${escapeHtml(book.author)}

                                    </small>

                                </div>

                                <span class="badge ${
                                    book.availableCopies > 0
                                    ? "bg-success"
                                    : "bg-secondary"
                                }">

                                    ${
                                        book.availableCopies > 0
                                        ? "Available"
                                        : "Unavailable"
                                    }

                                </span>

                            </div>


                            <div class="mb-2">

                                <small class="text-muted">
                                    Category
                                </small>

                                <div>
                                    ${escapeHtml(
                                        book.category || "—"
                                    )}
                                </div>

                            </div>


                            <div class="mb-3">

                                <small class="text-muted">
                                    Reading Level
                                </small>

                                <div>
                                    ${escapeHtml(
                                        book.readingLevel || "—"
                                    )}
                                </div>

                            </div>


                            <div class="small text-muted mb-3">

                                ${book.availableCopies}
                                of
                                ${book.totalCopies}
                                copies available

                            </div>


                            <button
                                type="button"
                                class="btn btn-outline-success w-100"
                                data-book-id="${escapeHtml(book.bookId)}"
                            >

                                <i class="bi bi-book me-2"></i>

                                View Book

                            </button>

                        </div>

                    </div>

                </div>

            `).join("")}

        </div>

    `;

}


// ==========================================
// Search
// ==========================================

function initialiseBookSearch() {

    const searchInput =
        document.getElementById("bookSearch");

    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        function () {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                renderLibraryBooks(libraryBooks);

                return;

            }


            const filtered =
                libraryBooks.filter(book => {

                    return (

                        book.title
                            .toLowerCase()
                            .includes(query)

                        ||

                        book.author
                            .toLowerCase()
                            .includes(query)

                        ||

                        book.category
                            .toLowerCase()
                            .includes(query)

                    );

                });


            renderLibraryBooks(filtered);

        }
    );

}


// ==========================================
// View Book
// ==========================================

async function viewBook(bookId) {

    const container =
        document.getElementById("bookDetailContainer");

    if (!container) return;


    try {

        const book =
            await getBook(bookId);


        container.innerHTML = `

            <div class="card shadow-sm mt-4">

                <div class="card-header
                            d-flex
                            justify-content-between
                            align-items-center">

                    <strong>
                        Book Details
                    </strong>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        id="closeBookDetail"
                    >

                        <i class="bi bi-arrow-left me-1"></i>

                        Back to Catalogue

                    </button>

                </div>


                <div class="card-body">

                    <div class="row g-4">

                        <div class="col-md-8">

                            <h2>
                                ${escapeHtml(book.title)}
                            </h2>

                            <p class="lead text-muted">
                                ${escapeHtml(book.author)}
                            </p>

                            <hr>

                            <p>
                                ${escapeHtml(
                                    book.description ||
                                    "No description available."
                                )}
                            </p>

                        </div>


                        <div class="col-md-4">

                            <div class="border rounded p-4">

                                <div class="mb-3">

                                    <small class="text-muted">
                                        Book ID
                                    </small>

                                    <div class="fw-semibold">
                                        ${escapeHtml(book.bookId)}
                                    </div>

                                </div>


                                <div class="mb-3">

                                    <small class="text-muted">
                                        Category
                                    </small>

                                    <div>
                                        ${escapeHtml(
                                            book.category || "—"
                                        )}
                                    </div>

                                </div>


                                <div class="mb-3">

                                    <small class="text-muted">
                                        Reading Level
                                    </small>

                                    <div>
                                        ${escapeHtml(
                                            book.readingLevel || "—"
                                        )}
                                    </div>

                                </div>


                                <div>

                                    <small class="text-muted">
                                        Availability
                                    </small>

                                    <div class="fw-semibold">

                                        ${book.availableCopies}
                                        /
                                        ${book.totalCopies}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `;


        document
            .getElementById("closeBookDetail")
            ?.addEventListener(
                "click",
                function () {

                    container.innerHTML = "";

                }
            );


        container.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(
            "Book Detail Error:",
            error
        );

        container.innerHTML = `

            <div class="alert alert-danger mt-4">

                ${escapeHtml(error.message)}

            </div>

        `;

    }

}


// ==========================================
// Book Click Handling
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("[data-book-id]");

        if (!button) return;

        viewBook(
            button.dataset.bookId
        );

    }
);