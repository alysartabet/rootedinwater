import React from "react";

export default function Landing(){
    return ( 
        <div className="container landing-hero" role="region" aria-label="Landing">
            <h1>Rooted In Water</h1>
            <p>
                A collaborative, real-time platform conneecting students, farmers and researchers 
                to analyze water quality, visualize agricultural data, and share sustainable practices.
            </p>
            <div className="landing-cta">
                {/* To change*/}
                <a className="btn" href="#home"> Explore Home </a>
                <a className="btn" href="#home"> See Latest Research </a>
            </div>
        </div>
    )
}