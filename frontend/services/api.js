// ======================================
// Nūr Reader Platform
// API Service
// ======================================

// Google Apps Script Web App URL
const API_URL = "";

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