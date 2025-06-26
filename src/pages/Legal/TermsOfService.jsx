// src/pages/Legal/TermsOfService.jsx
import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import "./LegalPage.css";

function TermsOfService() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <header className="legal-header">
                <NavBar />
            </header>
            <main className="legal-content">
                <h1>Terms of Service</h1>
                <p className="last-updated">Last updated: October 26, 2023</p>

                <section>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By using our game, Paved by the Fallen, our websites, or any related
                        services (the “Services”), you agree to be bound by these Terms of
                        Service (“Terms”). If you do not agree to these Terms, do not use the
                        Services. These Terms are a legal agreement between you and Mythweaver
                        Inc. (“we”, “us”, “our”).
                    </p>
                </section>

                <section>
                    <h2>2. Limited License to Use the Services</h2>
                    <p>
                        Subject to your agreement and continuing compliance with these Terms,
                        we grant you a non-exclusive, non-transferable, non-sublicensable,
                        revocable limited license to use the Services for your own personal,
                        non-commercial entertainment purposes. You agree not to use the
                        Services for any other purpose.
                    </p>
                </section>

                <section>
                    <h2>3. User Conduct</h2>
                    <p>
                        You agree not to engage in any of the following prohibited
                        activities:
                    </p>
                    <ul>
                        <li>
                            Using the Services for any commercial purpose or for the benefit of
                            any third party.
                        </li>
                        <li>
                            Using cheats, exploits, automation software, bots, hacks, mods, or
                            any unauthorized third-party software designed to modify or
                            interfere with the Services.
                        </li>
                        <li>
                            Disrupting or attempting to disrupt any computer or server used to
                            support the Services.
                        </li>
                        <li>
                            Transmitting any content that is unlawful, harmful, harassing,
                            defamatory, or otherwise objectionable.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>4. Termination</h2>
                    <p>
                        We may terminate or suspend your access to the Services at any time,
                        without prior notice or liability, for any reason whatsoever,
                        including without limitation if you breach the Terms. Upon
                        termination, your right to use the Services will immediately cease.
                    </p>
                </section>

                <section>
                    <h2>5. Disclaimer of Warranties</h2>
                    <p>
                        The Services are provided on an “AS IS” and “AS AVAILABLE” basis. We make no warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                </section>

                <section>
                    <h2>6. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the
                        laws of the jurisdiction in which our company is registered, without
                        regard to its conflict of law provisions.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default TermsOfService;