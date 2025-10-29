import React from "react";

export default function Header(){
    return(
        <header className="header">
            <div className="inner container">
                <strong>🌱</strong>
                <nav className="nav">
                    <a href="#landing"> RIW </a>
                    <a href="#home"> Home </a>
                    {/*add Router Links to /search, /maps, /data and /blog */}
                </nav>
            </div>
        </header>
    )
}