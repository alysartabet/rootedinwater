import {useEffect, useRef, useState } from "react"

/*
* LoadingGate renders a full-screen intro video once per session, then reveals children.
    * Uses sessionStorage flag to avoid replay on page navigations. 
    * Handles autoplay restrictions; a visible "Skip" button is available.
    * Respects prefers-reduced-motion by showing the poster instead of playing.
*/

export default function LoadingGate({ children }){
    const [showGate, setShowGate] = useState(() => { 
        try{ return !sessionStorage.getItem("riw_intro_seen") } catch{ return true }
    });
    const [hidden, setHidden] = useState(false);
    const videoRef = useRef(null);
    const finish = () => {
        try{ 
            sessionStorage.setItem("riw_intro_seen", "1")
        } catch{}
        setHidden(true)
        //After CSS fade-out, Gate fully removed from DOM
        setTimeout(() => setShowGate(false), 650)
    };

    useEffect(() => {
        if (!showGate) return

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const v = videoRef.current

        const bailout = setTimeout(() => finish(), 6000)

        //If reduced motion, hide gate after short delay (poster only)
        if (prefersReduced){
            const t = setTimeout(() => finish(), 800)
            return () => clearTimeout(t)
        }

        //Try to autoplay muted inline
        const tryPlay = async () => {
            if (!v) return
            try{
                await v.play()
            }catch(err){
                //Autoplay blocked; user must tap/press Skip
                //bailout timer should handle worst case
            }
        }

        tryPlay()
        return () => {
            clearTimeout(bailout)
            if (v && v.pause) v.pause()
        }
    }, [showGate])

    if (!showGate) return children

    //WebM source for Chrome/Android better compression
    return(
        <>
            <div className={`loading-shell ${hidden ? "hidden" : ""}`}>
                <video 
                    ref={videoRef}
                    className="loading-video"
                    src="/video/riw-intro.mp4"
                    poster="/img/poster.png"
                    playsInline
                    muted
                    preload="auto"
                    onEnded={finish}
                    onError={finish}
                >
                    {/*Source Order: Browsers pick first supporteed */}
                    <source src="/video/riw-intro.mp4" type="video/mp4" />
                    <source src="/video/riw-intro.webm" type="video/webm" />
                </video>
                <div className="loading-controls">
                    <button className="loading-skip" onClick={finish} aria-label="Skip intro">Skip</button>
                </div>
            </div>
            {children}
        </>    
    )
}