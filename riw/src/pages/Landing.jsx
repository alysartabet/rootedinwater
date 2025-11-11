import React from "react";
import logoUrl from '../assets/logowrapper.svg'

export default function Landing(){
    return ( 
        <section className="landing-layer container" role="region" aria-label="Rooted In Water">
            <div className="landing-logo-wrap">
                <img 
                    src={logoUrl}
                    alt="Rooted In Water"
                    className="landing-logo"
                    draggable="false"
                />
                <span id="riw-logo-start" aria-hidden="true"></span>
            </div>

            <p className="landing-tagline">
                Sustainable Urban Agriculture Research
            </p>
        </section>
    )
}