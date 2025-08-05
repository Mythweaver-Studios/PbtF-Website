// src/pages/Legal/PrivacyPolicy.jsx
import React, { useEffect } from "react";
import "../../styles/Theme.css";
import "./LegalPage.css";

function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <header className="legal-header">
            </header>
            <main className="legal-content">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last updated: July 10, 2025</p>

                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Mythweaver Inc. (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your
                        privacy. This Privacy Policy applies to our game, Paved by the
                        Fallen, our websites, and all related services (collectively, the
                        &quot;Services&quot;). This policy explains how we collect, use, and share
                        your personal information. By using our Services, you agree to the
                        collection and use of information in accordance with this policy.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li>
                            <strong>Account Information:</strong> When you create an account,
                            we may collect your email address, username, and other contact
                            details.
                        </li>
                        <li>
                            <strong>Device Information:</strong> We may collect information
                            about the device you use to access our Services, including IP
                            address, operating system, browser type, and device identifiers.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> We collect information about how you
                            use our Services, such as your in-game activity, progress, and
                            interactions with other players.
                        </li>
                        <li>
                            <strong>Cookies:</strong> We use cookies and similar tracking
                            technologies to track activity on our Services and hold certain
                            information. You can control the use of cookies at the individual
                            browser level or through our cookie settings panel.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for various purposes, including to:
                    </p>
                    <ul>
                        <li>Provide, maintain, and improve our Services.</li>
                        <li>Personalize your experience.</li>
                        <li>Communicate with you about updates, security alerts, and support messages.</li>
                        <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
                        <li>Detect and prevent fraudulent or unauthorized activity.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Information Sharing and Disclosure</h2>
                    <p>
                        We do not sell your personal information. We may share your
                        information with third-party vendors and service providers that
                        perform services on our behalf, such as analytics or hosting. We may
                        also disclose your information if required by law or in response to
                        valid requests by public authorities.
                    </p>
                </section>

                <section>
                    <h2>5. Your Rights and Choices</h2>
                    <p>
                        Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. You can manage your cookie preferences through our Cookie Settings panel, accessible from the footer of our website.
                    </p>
                </section>

                <section>
                    <h2>6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact
                        us at: Choshen@mythweave.net.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default PrivacyPolicy;