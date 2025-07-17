// src/App.jsx
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import CookieSettingsModal from "./components/CookieSettingsModal/CookieSettingsModal";
import * as CookieService from "./services/CookieService";

// Implement Code-Splitting using React.lazy
const Home = React.lazy(() => import("./pages/Home/Home"));
const Showcase = React.lazy(() => import("./pages/Showcase/Showcase"));
const AboutUs = React.lazy(() => import("./pages/AboutUs/AboutUs"));
const News = React.lazy(() => import("./pages/News/News"));
const NewsArticle = React.lazy(() => import("./pages/News/NewsArticle"));
const CharacterList = React.lazy(() => import("./pages/CharacterList/CharacterList"));
const CookiePolicy = React.lazy(() => import("./pages/Legal/CookiePolicy"));
const PrivacyPolicy = React.lazy(() => import("./pages/Legal/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/Legal/TermsOfService"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const AuthCallback = React.lazy(() => import("./pages/AuthCallback/AuthCallback"));

// Fallback component for Suspense
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--theme-bg-gradient)' }}>
        {/* You can add a themed spinner here later */}
    </div>
);

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
            <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/showcase" element={<Showcase />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/news/:id" element={<NewsArticle />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/characterlist" element={<CharacterList />} />
                        {/* Legal Routes */}
                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />

                        {/* Special Routes */}
                        <Route path="/supersecrettunnal" element={<AuthCallback />} />

                        {/* Catch-all 404 Route - This must be the last route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>

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