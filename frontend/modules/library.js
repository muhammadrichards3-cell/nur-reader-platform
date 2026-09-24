// ==========================================
// Nūr Reader Platform
// Library Module
// Version 1.1.0
// ==========================================


// ==========================================
// Library State
// ==========================================

let libraryBooks = [];

let selectedBook = null;


// ==========================================
// Initialise Library Page
// ==========================================

async function initialiseLibraryPage() {

    const searchInput =
        document.getElementById("librarySearch");

    const booksContainer =
        document.getElementById(
            "libraryBooksContainer"
        );


    if (!booksContainer) {

        console.error(
            "Library books container was not found."
        );

        return;

    }


    // --------------------------------------
    // Search Listener
    // --------------------------------------

    if (
        searchInput &&
        !searchInput.dataset.listenerAttached
    ) {

        searchInput.addEventListener(
            "input",
            function () {

                renderLibraryBooks(
                    searchInput.value
                );

            }
        );

        searchInput.dataset.listenerAttached =
            "true";

    }


    // --------------------------------------
    // Load Books
    // --------------------------------------

    try {

        booksContainer.innerHTML = `

            <div class="text-center py-5">

                <div
                    class="spinner-border text-success"
                    role="status"
                ></div>

                <p class="text-muted mt-3 mb-0">
                    Loading library...
                </p>

            </div>

        `;


        libraryBooks =
            await getAllBooks();


        renderLibraryBooks(
            searchInput
                ? searchInput.value
                : ""
        );


    } catch (error) {

        console.error(
            "Library Error:",
            error
        );


        booksContainer.innerHTML = `

            <div class="alert alert-danger">

                <h5 class="alert-heading">
                    Unable to load library
                </h5>

                <p class="mb-0">
                    ${escapeLibraryHtml(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Render Library Books
// ==========================================

function renderLibraryBooks(
    searchTerm = ""
) {

    const container =
        document.getElementById(
            "libraryBooksContainer"
        );


    if (!container) return;


    const term =
        searchTerm
            .trim()
            .toLowerCase();


    const filteredBooks =
        libraryBooks.filter(
            book => {

                if (!term) {
                    return true;
                }


                const title =
                    String(
                        book.title || ""
                    ).toLowerCase();


                const author =
                    String(
                        book.author || ""
                    ).toLowerCase();


                const category =
                    String(
                        book.category || ""
                    ).toLowerCase();


                return (
                    title.includes(term) ||
                    author.includes(term) ||
                    category.includes(term)
                );

            }
        );


    // --------------------------------------
    // No Results
    // --------------------------------------

    if (!filteredBooks.length) {

        container.innerHTML = `

            <div class="text-center py-5">

                <i
                    class="bi bi-book fs-1 text-muted"
                ></i>

                <h5 class="mt-3">
                    No books found
                </h5>

                <p class="text-muted mb-0">
                    Try another title, author or category.
                </p>

            </div>

        `;

        return;

    }


    // --------------------------------------
    // Render Cards
    // --------------------------------------

    container.innerHTML = `

        <div class="row g-4">

            ${filteredBooks
                .map(
                    book =>
                        buildBookCard(
                            book
                        )
                )
                .join("")}

        </div>

    `;

}


// ==========================================
// Build Book Card
// ==========================================

function buildBookCard(book) {

    const available =
        Number(
            book.availableCopies || 0
        );


    const total =
        Number(
            book.totalCopies || 0
        );


    const availableBadge =
        available > 0
            ? `
                <span class="badge bg-success">
                    Available
                </span>
            `
            : `
                <span class="badge bg-secondary">
                    Unavailable
                </span>
            `;


    return `

        <div class="col-md-6 col-xl-4">

            <div class="card h-100 shadow-sm">

                <div class="card-body d-flex flex-column">

                    <div class="d-flex justify-content-between align-items-start mb-3">

                        <span class="badge bg-light text-dark border">

                            ${escapeLibraryHtml(
                                book.category ||
                                "General"
                            )}

                        </span>

                        ${availableBadge}

                    </div>


                    <h5 class="card-title">

                        ${escapeLibraryHtml(
                            book.title ||
                            "Untitled Book"
                        )}

                    </h5>


                    <p class="text-muted mb-2">

                        <i class="bi bi-person me-1"></i>

                        ${escapeLibraryHtml(
                            book.author ||
                            "Unknown Author"
                        )}

                    </p>


                    ${
                        book.readingLevel
                            ? `
                                <p class="small text-muted mb-2">

                                    <i class="bi bi-bar-chart me-1"></i>

                                    Level:
                                    ${escapeLibraryHtml(
                                        book.readingLevel
                                    )}

                                </p>
                            `
                            : ""
                    }


                    ${
                        book.description
                            ? `
                                <p class="card-text text-muted small">

                                    ${escapeLibraryHtml(
                                        truncateText(
                                            book.description,
                                            120
                                        )
                                    )}

                                </p>
                            `
                            : ""
                    }


                    <div class="mt-auto pt-3">

                        <div class="d-flex justify-content-between align-items-center mb-3">

                            <small class="text-muted">

                                ${available}
                                /
                                ${total}
                                available

                            </small>


                            <small class="text-muted">

                                ${escapeLibraryHtml(
                                    book.bookId ||
                                    ""
                                )}

                            </small>

                        </div>


                        <button
                            type="button"
                            class="btn btn-outline-success w-100"
                            data-view-book="${escapeLibraryHtml(
                                book.bookId
                            )}"
                        >

                            <i class="bi bi-book me-2"></i>

                            View Book

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}


// ==========================================
// View Book
// ==========================================

async function viewBook(bookId) {

    if (!bookId) {

        console.error(
            "No book ID supplied."
        );

        return;

    }


    const catalogue =
        document.getElementById(
            "libraryBooksContainer"
        );


    if (!catalogue) return;


    try {

        selectedBook =
            await getBook(bookId);


        if (!selectedBook) {

            throw new Error(
                "Book could not be found."
            );

        }


        renderBookDetails(
            selectedBook
        );


    } catch (error) {

        console.error(
            "Book Details Error:",
            error
        );


        catalogue.innerHTML = `

            <div class="alert alert-danger">

                <h5 class="alert-heading">
                    Unable to load book
                </h5>

                <p class="mb-0">
                    ${escapeLibraryHtml(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Render Book Details
// ==========================================

function renderBookDetails(book) {

    const container =
        document.getElementById(
            "libraryBooksContainer"
        );


    if (!container) return;


    const available =
        Number(
            book.availableCopies || 0
        );


    const total =
        Number(
            book.totalCopies || 0
        );


    container.innerHTML = `

        <div class="mb-4">

            <button
                type="button"
                class="btn btn-outline-secondary"
                id="backToLibraryButton"
            >

                <i class="bi bi-arrow-left me-2"></i>

                Back to Library

            </button>

        </div>


        <div class="card shadow-sm">

            <div class="card-body p-4">

                <div class="row g-4">

                    <div class="col-lg-8">

                        <span class="badge bg-light text-dark border mb-3">

                            ${escapeLibraryHtml(
                                book.category ||
                                "General"
                            )}

                        </span>


                        <h2 class="mb-2">

                            ${escapeLibraryHtml(
                                book.title ||
                                "Untitled Book"
                            )}

                        </h2>


                        <p class="text-muted fs-5">

                            by
                            ${escapeLibraryHtml(
                                book.author ||
                                "Unknown Author"
                            )}

                        </p>


                        ${
                            book.description
                                ? `
                                    <hr>

                                    <h5>
                                        About this book
                                    </h5>

                                    <p class="text-muted">

                                        ${escapeLibraryHtml(
                                            book.description
                                        )}

                                    </p>
                                `
                                : ""
                        }


                        <hr>


                        <div class="row g-3">

                            ${
                                book.readingLevel
                                    ? `
                                        <div class="col-sm-6">

                                            <small class="text-muted d-block">
                                                Reading Level
                                            </small>

                                            <strong>
                                                ${escapeLibraryHtml(
                                                    book.readingLevel
                                                )}
                                            </strong>

                                        </div>
                                    `
                                    : ""
                            }


                            <div class="col-sm-6">

                                <small class="text-muted d-block">
                                    Book ID
                                </small>

                                <strong>
                                    ${escapeLibraryHtml(
                                        book.bookId ||
                                        ""
                                    )}
                                </strong>

                            </div>


                            <div class="col-sm-6">

                                <small class="text-muted d-block">
                                    Total Copies
                                </small>

                                <strong>
                                    ${total}
                                </strong>

                            </div>


                            <div class="col-sm-6">

                                <small class="text-muted d-block">
                                    Available Copies
                                </small>

                                <strong
                                    class="${
                                        available > 0
                                            ? "text-success"
                                            : "text-danger"
                                    }"
                                >
                                    ${available}
                                </strong>

                            </div>

                        </div>

                    </div>


                    <div class="col-lg-4">

                        <div class="card bg-light border-0">

                            <div class="card-body">

                                <h5>
                                    Circulation
                                </h5>


                                <p class="text-muted small">

                                    ${
                                        available > 0
                                            ? "This book is currently available to borrow."
                                            : "There are currently no available copies."
                                    }

                                </p>


                                ${
                                    available > 0
                                        ? `
                                            <button
                                                type="button"
                                                class="btn btn-success w-100"
                                                data-borrow-book="${escapeLibraryHtml(
                                                    book.bookId
                                                )}"
                                            >

                                                <i class="bi bi-bookmark-plus me-2"></i>

                                                Borrow Book

                                            </button>
                                        `
                                        : `
                                            <button
                                                type="button"
                                                class="btn btn-secondary w-100"
                                                disabled
                                            >

                                                Currently Unavailable

                                            </button>
                                        `
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <div id="borrowBookPanel"></div>

    `;

}


// ==========================================
// Open Borrow Panel
// ==========================================

async function openBorrowBook(bookId) {

    const panel =
        document.getElementById(
            "borrowBookPanel"
        );


    if (!panel) {

        console.error(
            "Borrow panel not found."
        );

        return;

    }


    try {

        const readers =
            await getAllReaderProfiles();


        if (!readers.length) {

            panel.innerHTML = `

                <div class="alert alert-warning mt-4">

                    <h5>
                        No readers registered
                    </h5>

                    <p class="mb-0">
                        Register a reader before borrowing a book.
                    </p>

                </div>

            `;

            return;

        }


        panel.innerHTML = `

            <div class="card shadow-sm mt-4">

                <div class="card-body">

                    <div class="d-flex justify-content-between align-items-center mb-3">

                        <h5 class="mb-0">
                            Borrow This Book
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            id="cancelBorrowButton"
                            aria-label="Close"
                        ></button>

                    </div>


                    <p class="text-muted">

                        <strong>
                            ${escapeLibraryHtml(
                                selectedBook?.title ||
                                "Selected Book"
                            )}
                        </strong>

                    </p>


                    <label
                        for="borrowReaderSelect"
                        class="form-label"
                    >
                        Select Reader
                    </label>


                    <select
                        id="borrowReaderSelect"
                        class="form-select mb-3"
                    >

                        <option value="">
                            Choose a reader...
                        </option>

                        ${readers
                            .map(
                                reader => `

                                    <option
                                        value="${escapeLibraryHtml(
                                            reader.readerId
                                        )}"
                                    >

                                        ${escapeLibraryHtml(
                                            reader.fullName ||
                                            "Unnamed Reader"
                                        )}

                                        —
                                        ${escapeLibraryHtml(
                                            reader.readerId ||
                                            ""
                                        )}

                                    </option>

                                `
                            )
                            .join("")}

                    </select>


                    <div class="d-flex gap-2">

                        <button
                            type="button"
                            class="btn btn-success"
                            id="confirmBorrowButton"
                            data-book-to-borrow="${escapeLibraryHtml(
                                bookId
                            )}"
                        >

                            <i class="bi bi-check-circle me-2"></i>

                            Confirm Borrow

                        </button>


                        <button
                            type="button"
                            class="btn btn-outline-secondary"
                            id="cancelBorrowButtonSecondary"
                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(
            "Reader Loading Error:",
            error
        );


        panel.innerHTML = `

            <div class="alert alert-danger mt-4">

                <strong>
                    Unable to load readers.
                </strong>

                <p class="mb-0 mt-1">

                    ${escapeLibraryHtml(
                        error.message
                    )}

                </p>

            </div>

        `;

    }

}


// ==========================================
// Confirm Borrow
// ==========================================

async function confirmBorrow(bookId) {

    const readerSelect =
        document.getElementById(
            "borrowReaderSelect"
        );


    if (!readerSelect) return;


    const readerId =
        readerSelect.value;


    if (!readerId) {

        alert(
            "Please select a reader."
        );

        return;

    }


    const button =
        document.getElementById(
            "confirmBorrowButton"
        );


    if (button) {

        button.disabled = true;

        button.innerHTML = `
            <span
                class="spinner-border spinner-border-sm me-2"
                role="status"
            ></span>

            Processing...
        `;

    }


    try {

        await borrowBook(
            readerId,
            bookId
        );


        alert(
            "Book borrowed successfully."
        );


        await viewBook(
            bookId
        );


    } catch (error) {

        console.error(
            "Borrow Error:",
            error
        );


        alert(
            `Unable to borrow book: ${error.message}`
        );


        if (button) {

            button.disabled = false;

            button.innerHTML = `

                <i class="bi bi-check-circle me-2"></i>

                Confirm Borrow

            `;

        }

    }

}


// ==========================================
// Escape HTML
// ==========================================

function escapeLibraryHtml(value) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// Truncate Text
// ==========================================

function truncateText(
    text,
    maxLength
) {

    const value =
        String(
            text || ""
        );


    if (
        value.length <= maxLength
    ) {

        return value;

    }


    return (
        value.substring(
            0,
            maxLength
        ).trim() + "…"
    );

}


// ==========================================
// Event Delegation
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        // ----------------------------------
        // View Book
        // ----------------------------------

        const viewButton =
            event.target.closest(
                "[data-view-book]"
            );


        if (viewButton) {

            viewBook(
                viewButton.dataset.viewBook
            );

            return;

        }


        // ----------------------------------
        // Back to Library
        // ----------------------------------

        const backButton =
            event.target.closest(
                "#backToLibraryButton"
            );


        if (backButton) {

            renderLibraryBooks();

            return;

        }


        // ----------------------------------
        // Borrow Book
        // ----------------------------------

        const borrowButton =
            event.target.closest(
                "[data-borrow-book]"
            );


        if (borrowButton) {

            openBorrowBook(
                borrowButton.dataset.borrowBook
            );

            return;

        }


        // ----------------------------------
        // Confirm Borrow
        // ----------------------------------

        const confirmButton =
            event.target.closest(
                "[data-book-to-borrow]"
            );


        if (confirmButton) {

            confirmBorrow(
                confirmButton.dataset.bookToBorrow
            );

            return;

        }


        // ----------------------------------
        // Cancel Borrow
        // ----------------------------------

        const cancelButton =
            event.target.closest(
                "#cancelBorrowButton"
            );


        const cancelButtonSecondary =
            event.target.closest(
                "#cancelBorrowButtonSecondary"
            );


        if (
            cancelButton ||
            cancelButtonSecondary
        ) {

            const panel =
                document.getElementById(
                    "borrowBookPanel"
                );


            if (panel) {

                panel.innerHTML = "";

            }

        }

    }
);