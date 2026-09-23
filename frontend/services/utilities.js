// ======================================
// Nūr Reader Platform
// Utility Service
// Version 1.0.0
// ======================================

/**
 * Generates a formatted ID.
 *
 * Example:
 * FAM-000001
 * RDR-000001
 * BK-000001
 */

function generateId(prefix, number) {

    return `${prefix}-${String(number).padStart(6, "0")}`;

}

/**
 * Returns today's date.
 */

function getCurrentDate() {

    return new Date().toISOString();

}

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}