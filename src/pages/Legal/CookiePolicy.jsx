// src/pages/Legal/CookiePolicy.jsx
import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import "./LegalPage.css";

function CookiePolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-container">
            <header className="legal-header">
                <NavBar />
            </header>
            <main className="legal-content">
                <h1>Cookie Policy</h1>
                <p className="last-updated">Last updated: June 25, 2025</p>

                <section>
                    <h2>1. What Are Cookies</h2>
                    <p>
                        As is common practice with almost all professional websites, this
                        site uses cookies, which are tiny files that are downloaded to your
                        computer, to improve your experience. This page describes what
                        information they gather, how we use it, and why we sometimes need to
                        store these cookies. We will also share how you can prevent these
                        cookies from being stored however this may downgrade or &apos;break&apos;
                        certain elements of the site&apos;s functionality.
                    </p>
                </section>

                <section>
                    <h2>2. How We Use Cookies</h2>
                    <p>
                        We use cookies for a variety of reasons detailed below.
                        Unfortunately, in most cases, there are no industry standard options
                        for disabling cookies without completely disabling the functionality
                        and features they add to this site. It is recommended that you leave
                        on all cookies if you are not sure whether you need them or not in
                        case they are used to provide a service that you use.
                    </p>
                </section>

                <section>
                    <h2>3. Disabling Cookies</h2>
                    <p>
                        You can prevent the setting of cookies by adjusting the settings on
                        your browser (see your browser Help for how to do this) or by using
                        our Cookie Settings panel. Be aware that disabling cookies will
                        affect the functionality of this and many other websites that you
                        visit. Disabling cookies will usually result in also disabling
                        certain functionality and features of this site. Therefore it is
                        recommended that you do not disable cookies.
                    </p>
                </section>

                <section>
                    <h2>4. The Cookies We Set</h2>
                    <ul>
                        <li>
                            <strong>Site preferences cookies:</strong> In order to provide you
                            with a great experience on this site, we provide the functionality
                            to set your preferences for how this site runs when you use it. In
                            order to remember your preferences, we need to set cookies so that
                            this information can be called whenever you interact with a page
                            is affected by your preferences.
                        </li>
                        <li>
                            <strong>Third-Party Cookies:</strong> In some special cases, we
                            also use cookies provided by trusted third parties. This site may
                            use Google Analytics which is one of the most widespread and
                            trusted analytics solutions on the web for helping us to
                            understand how you use the site and ways that we can improve your
                            experience. These cookies may track things such as how long you
                            spend on the site and the pages that you visit so we can continue
                            to produce engaging content.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>More Information</h2>
                    <p>
                        Hopefully, that has clarified things for you. For more detailed information on how we handle your data, please see our <a href="/privacy-policy">Privacy Policy</a>. If you are still looking for more information, then you can contact us through one of our preferred contact methods.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default CookiePolicy;