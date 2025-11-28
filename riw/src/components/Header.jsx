import {useEffect, useRef} from "react";
import {Link, useLocation} from "react-router-dom";

import profileIcon from "../assets/icons/profileicon.svg";

const SECTION_KEYS = ["home", "landing", "search", "maps", "data", "blog"];

const KEY_MAP = new Map([
    ["home", "home"],
    ["landing", "landing"],
    ["search", "search"],
    ["maps", "maps"],
    ["data", "data"],
    ["blog", "blog"],
]);


const NAV_ITEMS = [
    { key: "home",   label: "Home",   to: "/" },
    { key: "search", label: "Search", to: "/search" },
    { key: "maps",   label: "Maps",   to: "/maps" },
    { key: "data",   label: "Data",   to: "/data" },
    { key: "blog",   label: "Blog",   to: "/blog" },
]

export default function Header(/*{ scrollTargetSelector = ".riw-main" }*/){
    /*Hooks*/
    /*const headerRef = useRef(null);*/
    const location = useLocation();
    let activeKey = "home"
    if (location.pathname.startsWith("/search")) activeKey = "search";
    else if (location.pathname.startsWith("/maps")) activeKey = "maps";
    else if (location.pathname.startsWith("/data")) activeKey = "data";
    else if (location.pathname.startsWith("/blog")) activeKey = "blog";
    /*
    useEffect(() => {
        const scroller = document.querySelector(scrollTargetSelector) || window;
        const links = headerRef.current?.querySelectorAll("[data-key]") || [];

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
            const key = KEY_MAP.get(id);
            if (key) setActive(key);
            },
            { threshold: [0.25, 0.5, 0.75] }
        );

        SECTION_KEYS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });

        const onHash = () => {
            const h = (location.hash || "").replace("#", "");
            if (KEY_MAP.has(h)) setActive(KEY_MAP.get(h));
        };
        window.addEventListener("hashchange", onHash, { passive: true });

        return () => {
            window.removeEventListener("hashchange", onHash);
            io.disconnect();
        };
    }, [scrollTargetSelector]);*/
    return(
        <header className="header">
            <div className="container">
                <nav className="nav" aria-label="Primary">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.key}
                            to={item.to}
                            className={
                                "nav-link" + (activeKey === item.key ? " is-active" : "")
                            }
                            data-key={item.key}
                        >
                            {item.key === "home" ? (
                                <>
                                    <span
                                    id="riw-home-anchor"
                                    className="home-anchor"
                                    aria-hidden="true"
                                    />
                                    <span className="home-label">{item.label}</span>
                                </>
                            ) : (
                                item.label
                            )}
                        </Link>
                    ))}

                    <div className="nav-spacer" aria-hidden />

                    <Link to="/account/sign-in" className="nav-auth">
                        <img className="nav-auth-icon" src={profileIcon} alt="" />
                        <span>Sign In/Up</span>
                    </Link>
                </nav>
                {/*
                <nav className="nav" aria-label="Primary"> 
                    <a href="#landing" className="nav-link home-link" data-key="home">
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
                </nav>
                */}
            </div>
        </header>
    )
}