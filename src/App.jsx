// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Showcase from "./pages/Showcase/Showcase";
import AboutUs from "./pages/AboutUs/AboutUs";
import News from "./pages/News/News";
import CharacterList from "./pages/CharacterList/CharacterList";
import CookiePolicy from "./pages/Legal/CookiePolicy";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
import NotFound from "./pages/NotFound/NotFound"; // Import the new 404 page
import CookieBanner from "./components/CookieBanner/CookieBanner";
import CookieSettingsModal from "./components/CookieSettingsModal/CookieSettingsModal";
import * as CookieService from "./services/CookieService";

function App() {
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

    useEffect(() => {
        // Check if consent has already been given
        if (!CookieService.getConsent()) {
            setShowCookieBanner(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        CookieService.setConsent({ necessary: true, optional: true });
        setShowCookieBanner(false);
    };

    const handleDeclineCookies = () => {
        CookieService.setConsent({ necessary: true, optional: false });
        setShowCookieBanner(false);
    };

    const openCookieSettings = () => {
        setShowCookieBanner(false); // Hide banner when opening settings
        setIsCookieModalOpen(true);
    };

    const closeCookieSettings = () => {
        setIsCookieModalOpen(false);
        // If user closes without saving, and they never made a choice before, show banner again.
        if (!CookieService.getConsent()) {
            setShowCookieBanner(true);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/news" element={<News />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/characterlist" element={<CharacterList />} />
                {/* Legal Routes */}
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                {/* Catch-all 404 Route - This must be the last route */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {showCookieBanner && (
                <CookieBanner
                    onAccept={handleAcceptCookies}
                    onDecline={handleDeclineCookies}
                    onOpenSettings={openCookieSettings}
                />
            )}
            {isCookieModalOpen && <CookieSettingsModal onClose={closeCookieSettings} />}

        </BrowserRouter>
    );
}

export default App;