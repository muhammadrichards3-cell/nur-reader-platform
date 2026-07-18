// ======================================
// Nūr Reader Platform
// API Service
// ======================================

// Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxWTKrgaSRDQYJ5ZteYbLl5M05q2iXjM5lMaCoxCBzwa9O1ODgyr0ugPqFEtHwdmvxNiA/exec";

// Generic POST request
async function apiPost(action, payload) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify({

            action: action,

            data: payload

        })

    });

    return await response.json();

}
// ======================================
// Test API Connection
// ======================================

async function testApiConnection() {

    try {

        const result = await apiPost("ping", {});

        console.log(result);

        alert(result.message);

    }

    catch (error) {

        console.error(error);

        alert("Unable to reach the backend.");

    }

}