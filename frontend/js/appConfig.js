// ==========================================
// Nūr Reader Platform
// Application Configuration
// Version 1.1.0
// ==========================================

const NUR_APP = {

    name: "Nūr Reader Platform",

    version: "1.1.0",

    organisation: "Two Lights Academy",

    environment: "development",

    defaultView: "dashboard",

    navigation: [

        {
            label: "Dashboard",
            icon: "bi-house-door-fill",
            view: "dashboard"
        },

        {
            label: "Register Family",
            icon: "bi-person-plus-fill",
            view: "registration"
        },

        {
            label: "Families",
            icon: "bi-people-fill",
            view: "families"
        },

        {
            label: "Library",
            icon: "bi-book-fill",
            view: "library"
        },

        {
            label: "Reader Passports",
            icon: "bi-award-fill",
            view: "reader-passports"
        },

        {
            label: "Settings",
            icon: "bi-gear-fill",
            view: "settings"
        }

    ]

};