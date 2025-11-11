import React, {useEffect, useRef} from "react";
import profileIcon from "../assets/icons/profileicon.svg";


export default function Header({ scrollTargetSelector = ".riw-main" }){
    const headerRef = useRef(null);
    useEffect(() => {
        const scroller = document.querySelector(scrollTargetSelector) || window;
        const links = headerRef.current?.querySelectorAll("[data-key]") || [];

        const map = new Map([
            ["home", "home"],
            ["landing", "home"],
            ["search", "search"],
            ["maps", "maps"],
            ["data", "data"],
            ["blog", "blog"],
        ]);

        //helper for marking active 
        const setActive = (key) => {
            links.forEach((a) => {
                if (a.getAttribute("data-key") === key) a.classList.add("is-active");
                else a.classList.remove("is-active");
            });
            headerRef.current?.setAttribute("data-active", key);
        };

        setActive("home");

        const io = new IntersectionObserver(
            (entries) => {
            const top = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!top) return;
            const id = top.target.id;
            const key = map.get(id);
            if (key) setActive(key);
            },
            { threshold: [0.25, 0.5, 0.75] }
        );

        ["home", "landing", "search", "maps", "data", "blog"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });

        const onHash = () => {
            const h = (location.hash || "").replace("#", "");
            if (map.has(h)) setActive(map.get(h));
        };

            return () => {
                window.removeEventListener("hashchange", onHash);
                io.disconnect();
            };
    }, [scrollTargetSelector]);
    return(
        <header className="header" ref={headerRef}>
            <div className="container">
                <nav className="nav" aria-label="Primary"> 
                    <a href="#landing" className="nav-link home-link">
                        <span id="riw-home-anchor" className="home-anchor" aria-hidden="true" />
                        <span className="home-label">Home</span>
                    </a>

                    <a href="#search" className="nav-link" data-key="search">Search</a>
                    <a href="#maps"   className="nav-link" data-key="maps">Maps</a>
                    <a href="#data"   className="nav-link" data-key="data">Data</a>
                    <a href="#blog"   className="nav-link" data-key="blog">Blog</a>

                    <div className="nav-spacer" aria-hidden />
                    <a href="#home" className="nav-auth">
                        <img className="nav-auth-icon" src={profileIcon} alt="" />
                        <span>Sign In/Up</span>
                    </a>



                    {/* old
                    <a href="#landing" className="nav-link home-link">
                        <span id="riw-home-anchor" className="home-anchor" aria-hidden="true" />
                        <span className="home-label">Home</span>
                    </a>
                    <a href="#home" className="nav-link">Search</a>
                    <a href="#home" className="nav-link">Maps</a>
                    <a href="#home" className="nav-link">Data</a>
                    <a href="#home" className="nav-link">Blog</a>
                    */}
                </nav>
            </div>
        </header>
    )
}