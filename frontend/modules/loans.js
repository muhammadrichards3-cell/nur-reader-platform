// ==========================================
// Nūr Reader Platform
// Loans Module
// Version 1.0.0
// ==========================================


let activeLoans = [];


// ==========================================
// Initialise Loans Page
// ==========================================

async function initialiseLoansPage() {

    const container =
        document.getElementById(
            "activeLoansContainer"
        );

    if (!container) return;


    try {

        activeLoans =
            await getActiveLoans();


        renderLoanSummary(
            activeLoans
        );


        renderActiveLoans(
            activeLoans
        );


    } catch (error) {

        console.error(
            "Loans Error:",
            error
        );


        container.innerHTML = `

            <div class="alert alert-danger">

                <h5 class="alert-heading">
                    Unable to load loans
                </h5>

                <p class="mb-0">
                    ${escapeHtml(error.message)}
                </p>

            </div>

        `;

    }

}


// ==========================================
// Summary
// ==========================================

function renderLoanSummary(loans) {

    const container =
        document.getElementById(
            "loanSummary"
        );

    if (!container) return;


    const overdue =
        loans.filter(
            loan =>
                loan.dueDate &&
                loan.dueDate <
                formatDateForStorage(
                    new Date()
                )
        );


    container.innerHTML = `

        <div class="col-md-4">

            <div class="card shadow-sm h-100">

                <div class="card-body">

                    <small class="text-muted">
                        Active Loans
                    </small>

                    <div class="display-6 fw-bold">
                        ${loans.length}
                    </div>

                </div>

            </div>

        </div>


        <div class="col-md-4">

            <div class="card shadow-sm h-100">

                <div class="card-body">

                    <small class="text-muted">
                        Overdue
                    </small>

                    <div class="display-6 fw-bold text-danger">
                        ${overdue.length}
                    </div>

                </div>

            </div>

        </div>


        <div class="col-md-4">

            <div class="card shadow-sm h-100">

                <div class="card-body">

                    <small class="text-muted">
                        Loan Period
                    </small>

                    <div class="display-6 fw-bold">
                        ${DEFAULT_LOAN_DAYS}
                    </div>

                    <small class="text-muted">
                        days
                    </small>

                </div>

            </div>

        </div>

    `;

}


// ==========================================
// Render Active Loans
// ==========================================

function renderActiveLoans(loans) {

    const container =
        document.getElementById(
            "activeLoansContainer"
        );

    if (!container) return;


    if (!loans.length) {

        container.innerHTML = `

            <div class="text-center py-5">

                <i class="bi bi-journal-check fs-1 text-success"></i>

                <h5 class="mt-3">
                    No active loans
                </h5>

                <p class="text-muted mb-0">
                    All library books are currently returned.
                </p>

            </div>

        `;

        return;

    }


    const today =
        formatDateForStorage(
            new Date()
        );


    container.innerHTML = `

        <div class="table-responsive">

            <table class="table align-middle">

                <thead>

                    <tr>

                        <th>Reader</th>

                        <th>Book</th>

                        <th>Borrowed</th>

                        <th>Due</th>

                        <th>Status</th>

                        <th class="text-end">
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${loans.map(loan => {

                        const overdue =
                            loan.dueDate &&
                            loan.dueDate < today;


                        return `

                            <tr>

                                <td>

                                    <div class="fw-semibold">

                                        ${escapeHtml(
                                            loan.readerName
                                        )}

                                    </div>

                                    <small class="text-muted">

                                        ${escapeHtml(
                                            loan.readerId
                                        )}

                                    </small>

                                </td>


                                <td>

                                    <div class="fw-semibold">

                                        ${escapeHtml(
                                            loan.bookTitle
                                        )}

                                    </div>

                                    <small class="text-muted">

                                        ${escapeHtml(
                                            loan.bookId
                                        )}

                                    </small>

                                </td>


                                <td>

                                    ${escapeHtml(
                                        loan.borrowedDate
                                    )}

                                </td>


                                <td>

                                    ${escapeHtml(
                                        loan.dueDate
                                    )}

                                </td>


                                <td>

                                    <span class="badge ${
                                        overdue
                                            ? "bg-danger"
                                            : "bg-success"
                                    }">

                                        ${
                                            overdue
                                                ? "Overdue"
                                                : "Active"
                                        }

                                    </span>

                                </td>


                                <td class="text-end">

                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-success"
                                        data-return-loan="${escapeHtml(
                                            loan.loanId
                                        )}"
                                    >

                                        <i class="bi bi-arrow-return-left me-1"></i>

                                        Return

                                    </button>

                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        </div>

    `;

}


// ==========================================
// Return Loan
// ==========================================

async function processReturn(
    loanId
) {

    const button =
        document.querySelector(
            `[data-return-loan="${CSS.escape(loanId)}"]`
        );


    if (button) {

        button.disabled = true;

        button.innerHTML = `
            Returning...
        `;

    }


    try {

        await returnBook(
            loanId
        );


        await initialiseLoansPage();


    } catch (error) {

        console.error(
            "Return Error:",
            error
        );


        alert(
            `Unable to return book: ${error.message}`
        );


        await initialiseLoansPage();

    }

}


// ==========================================
// Return Button Handler
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-return-loan]"
            );


        if (!button) return;


        const loanId =
            button.dataset.returnLoan;


        processReturn(
            loanId
        );

    }
);