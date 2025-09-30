// src/App.jsx
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ui/ErrorBoundary/ErrorBoundary";
import CookieBanner from "./components/features/CookieBanner/CookieBanner";
import CookieSettingsModal from "./components/features/CookieSettingsModal/CookieSettingsModal";
import MainLayout from "./components/layout/MainLayout/MainLayout"; // Import the layout
import * as CookieService from "./services/CookieService";

// Implement Code-Splitting using React.lazy
const Home = React.lazy(() => import("./pages/Home/Home"));
const Showcase = React.lazy(() => import("./pages/Showcase/Showcase"));
const AboutUs = React.lazy(() => import("./pages/AboutUs/AboutUs"));
const News = React.lazy(() => import("./pages/News/News"));
const CharacterList = React.lazy(() => import("./pages/CharacterList/CharacterList"));
const FAQ = React.lazy(() => import("./pages/FAQ/FAQ"));
const CookiePolicy = React.lazy(() => import("./pages/Legal/CookiePolicy"));
const PrivacyPolicy = React.lazy(() => import("./pages/Legal/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/Legal/TermsOfService"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
const AuthCallback = React.lazy(() => import("./pages/AuthCallback/AuthCallback"));
const Admin = React.lazy(() => import("./pages/Admin/Admin"));

// Fallback component for Suspense
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--theme-bg-gradient)' }}>
        {/* Themed spinner can be added here */}
    </div>
);

function App() {
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

    useEffect(() => {
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
        setShowCookieBanner(false);
        setIsCookieModalOpen(true);
    };

    const closeCookieSettings = () => {
        setIsCookieModalOpen(false);
        if (!CookieService.getConsent()) {
            setShowCookieBanner(true);
        }
    };

    // Create the layout element and pass the cookie settings function to it
    const AppLayout = <MainLayout onOpenCookieSettings={openCookieSettings} />;

    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        {/* Wrap all pages that need a NavBar and Footer in the layout route */}
                        <Route element={AppLayout}>
                            <Route path="/" element={<Navigate to="/home" replace />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/showcase" element={<Showcase />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/characterlist" element={<CharacterList />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/cookie-policy" element={<CookiePolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-service" element={<TermsOfService />} />
                        </Route>

                        {/* Standalone routes without the main layout */}
                        <Route path="/supersecrettunnal" element={<AuthCallback />} />
                        <Route path="/admin" element={<Admin />} />
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