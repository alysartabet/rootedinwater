import { useEffect, useRef } from "react";

export default function BackgroundVideo({
    srcMp4 = "/video/water.mp4",
    srcWebm = "/video/water.webm",
    speed = 0.25, // tried different ones but: parallax strength 0.15–0.35 feels nice
    //selector for the scroller (null) for window
    scrollTargetSelector = ".riw-main",
}) {
    const vidRef = useRef(null);

    //Making background video follow the scroll

    useEffect(() => {
        let raf = 0;
        let target;
        let cleanup = () => {};

        const getScrollY = () => {
            if (target && target != window)
                return target.scrollTop || 0;
            return window.scrollY || 0;
        }

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const y = -getScrollY() * speed;
                document.documentElement.style.setProperty("--bg-shift", `${y}px`);
            });
        };

        target = scrollTargetSelector
            ? document.querySelector(scrollTargetSelector) || window
            : window;

        onScroll(); // initial set

        //attach listener
        target.addEventListener("scroll", onScroll, { passive: true });

        if (target != window) 
            window.addEventListener("scroll", onScroll, {passive: true });
        return () => {
            cancelAnimationFrame(raf);
            target.removeEventListener("scroll", onScroll);
            if (target != window) window.removeEventListener("scroll", onScroll);
        };
    }, [speed, scrollTargetSelector]);

    return(
        <video
            ref={vidRef}
            className="riw-bg-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/img/water-poster.png"
        >
            <source src={srcWebm} type="video/webm" />
            <source src={srcMp4} type="video/mp4" />
        </video>
    )


    /*
    //Static Background (no parameters)
    return (
        <div className="bgvid-wrap" aria-hidden="true">
            <video 
                className="bgvid-el"
                playsInline
                muted
                autoPlay
                loop
                preload="metadata"
                poster="/img/water-poster.png"
            >
                <source src="/video/water.webm" type="video/webm" />
                <source src="/video/water.mp4" type="video/mp4" />
            </video>
        </div>
    )
    */
}