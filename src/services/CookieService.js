// src/services/CookieService.js

const CONSENT_KEY = 'paved_cookie_consent';

/**
 * Retrieves the user's cookie consent settings from localStorage.
 * @returns {object | null} The consent object { necessary: boolean, optional: boolean } or null if not set.
 */
export const getConsent = () => {
    try {
        const consent = localStorage.getItem(CONSENT_KEY);
        return consent ? JSON.parse(consent) : null;
    } catch (error) {
        console.error("Error reading cookie consent from localStorage", error);
        return null;
    }
};

/**
 * Saves the user's cookie consent settings to localStorage.
 * @param {object} consent - The consent object, e.g., { necessary: true, optional: true }.
 */
export const setConsent = (consent) => {
    try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (error) {
        console.error("Error saving cookie consent to localStorage", error);
    }
};