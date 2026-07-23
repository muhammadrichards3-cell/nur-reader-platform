// ======================================
// Nūr Reader Platform
// Dashboard Module
// ======================================

function initialiseDashboardPage() {

    const button = document.getElementById("firestoreTestButton");

    if (!button) return;

    button.addEventListener("click", testFirestore);

}

async function testFirestore() {

    try {

        await db.collection("test").doc("firstDocument").set({

            message: "Assalamu Alaikum",

            platform: "Nūr Reader Platform",

            created: firebase.firestore.FieldValue.serverTimestamp()

        });

        alert("✅ Firestore write successful!");

    }

    catch (error) {

        console.error(error);

        alert("❌ Firestore write failed.");

    }

}