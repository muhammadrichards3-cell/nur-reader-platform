// ======================================
// Nūr Reader Platform
// Families Module
// Version 1.0.0
// ======================================

async function initialiseFamiliesPage() {

    const container = document.getElementById("families-table-body");

    container.innerHTML = `
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

            container.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No families registered.
                    </td>
                </tr>
            `;

            return;

        }

        container.innerHTML = "";

        snapshot.forEach(doc => {

            const family = doc.data();

            container.insertAdjacentHTML("beforeend", `

                <tr>

                    <td>${family.familyId}</td>

                    <td>${family.parentName}</td>

                    <td>${family.mobile}</td>

                    <td>${family.suburb}</td>

                    <td>${family.status}</td>

                    <td>

                        <button
                            class="btn btn-sm btn-success">

                            View

                        </button>

                    </td>

                </tr>

            `);

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <tr>
                <td colspan="6" class="text-danger text-center">
                    Unable to load families.
                </td>
            </tr>
        `;

    }

}