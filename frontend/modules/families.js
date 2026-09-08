// ======================================
// Nūr Reader Platform
// Families Module
// Version 1.0.0
// ======================================

async function initialiseFamiliesPage() {

    const tableBody = document.getElementById("families-table-body");

    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                Loading families...
            </td>
        </tr>
    `;

    try {

        const snapshot = await db
            .collection("families")
            .orderBy("registeredDate", "desc")
            .get();

        if (snapshot.empty) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No families registered.
                    </td>
                </tr>
            `;

            return;

        }

        tableBody.innerHTML = "";

        snapshot.forEach(doc => {

            const family = doc.data();

            tableBody.insertAdjacentHTML("beforeend", `

                <tr>

                    <td>${family.familyId}</td>

                    <td>${family.parentName}</td>

                    <td>${family.mobile}</td>

                    <td>${family.suburb}</td>

                    <td>${family.status}</td>

                    <td>

                        <button
                            class="btn btn-success btn-sm">

                            View

                        </button>

                    </td>

                </tr>

            `);

        });

    }

    catch (error) {

        console.error(error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    class="text-danger text-center">

                    Unable to load families.

                </td>
            </tr>
        `;

    }

}