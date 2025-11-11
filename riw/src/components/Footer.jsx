import React from 'react';
import logoUrl from '../assets/logoimgbw.png'

export default function Footer(){
    return (
        <footer className="footer">
            <div className="container footer-top">
                <img src={logoUrl} alt="RIW" className="footer-logo" />
                <h2 className="footer-title">Rooted In Water</h2>
                <p className="footer-subtitle">Sustainable Urban Agriculture Research</p>
                <span className="footer-divider" aria-hidden="true" />

                <p className="footer-blurb">
                    Bridging science, practice, and lived experience to create resilient agricultural
                    communities through shared knowledge and data-driven insights.
                </p>

                <div className="footer-links">
                    <nav aria-label="Platform" className="footer-col">
                        <h3>Platform</h3>
                        <a href="#home">Research Search</a>
                        <a href="#home">Regional Maps</a>
                        <a href="#home">Data Analytics</a>
                    </nav>

                    <nav aria-label="Community" className="footer-col">
                        <h3>Community</h3>
                        <a href="#home">Community Blog</a>
                        <a href="#home">Contact Us</a>
                        <a href="#home">Get Involved</a>
                    </nav>
                </div>
                
                <a className="footer-cta" href="#home" role="button">Contact Us</a>

                <div className="footer-social" aria-label="Social links">
                    <a href="#home" aria-label="X / Twitter" className="soc soc-x">
                        <span aria-hidden="true">X</span>
                    </a>
                    <a href="#home" aria-label="LinkedIn" className="soc soc-in">
                        <span aria-hidden="true">in</span>
                    </a>
                    <a href="#home" aria-label="Facebook" className="soc soc-fb">
                        <span aria-hidden="true">f</span>
                    </a>
                </div>

                <div className="footer-bar">
                    <div className="container footer-bar-inner">
                        <small>© {new Date().getFullYear()} Rooted In Water. All rights reserved.</small>
                        <nav className="footer-legal" aria-label="Legal">
                            <a href="#home">Privacy Policy</a>
                            <a href="#home">Terms of Service</a>
                            <a href="#home">Research Guidelines</a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}