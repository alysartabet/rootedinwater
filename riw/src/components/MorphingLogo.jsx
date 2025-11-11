import { useEffect, useRef } from "react";
import logoImg from "../assets/logoimg.png";

const clamp01 = (x) => Math.max(0, Math.min(1, x));

export default function MorphingLogo({
    src = logoImg,
    scrollTargetSelector = ".riw-main",
    heroSelector = "#landing",
    completeAt = 0.9,              // when t >= this, consider “docked”
    startScale = 1.75, 
    endScale = 0.55
}) {
    const btnRef = useRef(null);
    const meas = useRef({
    centerX: 0, 
    centerY: 0, 
    targetX: 24, 
    targetY: 24, 
    travel: 420
  });

  const measure = () => {
    const homeA = document.getElementById("riw-home-anchor");
    const startA = document.getElementById("riw-logo-start");
    const hero   = document.querySelector(heroSelector);
    const vw = window.innerWidth, vh = window.innerHeight;

    // start point
    let sx = vw / 2, sy = vh * 0.55, sWidth = 220;

    if (startA) {
        const rs = startA.getBoundingClientRect();
        sx = rs.left + rs.width / 2;
        sy = rs.top  + rs.height / 2;
        sWidth = rs.width;
    }

    // end point
    if (homeA) {
        const r = homeA.getBoundingClientRect();
        meas.current.targetX = r.left + r.width / 2;
        meas.current.targetY = r.top  + r.height / 2;
    }

    meas.current.centerX = sx;
    meas.current.centerY = sy;
    const base = 220; 
    meas.current.startScale = (sWidth && sWidth > 0) ? (base / sWidth) : 1;



    const heroH = hero ? hero.getBoundingClientRect().height : vh * 0.8;
    meas.current.travel = Math.max(240, heroH * 0.85); 
  };

    useEffect(() => {
        const init = () => {
            // small timeout to let the DOM & images finish loading
            requestAnimationFrame(() => setTimeout(measure, 80));
        };

        init();
        window.addEventListener("resize", measure, { passive: true });

        // also re-measuring when the landing image finishes loading (important in Vite)
        const logoImgEl = document.getElementById("riw-logo-start");
        if (logoImgEl) {
            const obs = new ResizeObserver(() => measure());
            obs.observe(logoImgEl);
        }

        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
    let raf = 0;
    let target = null;
    let cleanup = () => {};
    const fadeInStart = 0.02; // start almost immediately
    const fadeInEnd   = 0.18;

    const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
        const y =
            target === window ? (window.scrollY || 0) : (target?.scrollTop || 0);

        const t = clamp01(y / meas.current.travel);
        document.documentElement.style.setProperty("--logo-t", String(t));
        document.documentElement.classList.toggle("logo-docked", t >= completeAt);

        const { centerX, centerY, targetX, targetY } = meas.current;
        const x = centerX + (targetX - centerX) * t;
        const yPos = centerY + (targetY - centerY) * t;

        // fade gate
        let opacity = 0;
        if (t >= fadeInEnd) opacity = 1;
        else if (t > fadeInStart) opacity = (t - fadeInStart) / (fadeInEnd - fadeInStart);

        const s0 = meas.current.startScale ?? startScale;
        const s  = s0 + (endScale - s0) * t;

        if (btnRef.current) {
            btnRef.current.style.opacity = String(opacity);
            btnRef.current.style.transform =
            `translate3d(${x}px, ${yPos}px, 0) translate(-50%, -50%) scale(${s})`;
            btnRef.current.dataset.docked = t >= completeAt ? "true" : "false";
        }
        });
    };

    const bind = (el) => {
        target = el || window;
        // attach listeners
        target.addEventListener("scroll", onScroll, { passive: true });
        if (target !== window) window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        cleanup = () => {
        cancelAnimationFrame(raf);
        target.removeEventListener("scroll", onScroll);
        if (target !== window) window.removeEventListener("scroll", onScroll);
        };
    };

    const tryNow = () => {
        const el = document.querySelector(scrollTargetSelector);
        bind(el || window);
        if (!el) {
        const mo = new MutationObserver(() => {
            const el2 = document.querySelector(scrollTargetSelector);
            if (el2) {
            cleanup();
            bind(el2);
            mo.disconnect();
            }
        });
        mo.observe(document.documentElement, { childList: true, subtree: true });
        }
    };

    tryNow();
    return () => cleanup();
    }, [scrollTargetSelector, completeAt, startScale, endScale]);


  const goHome = () => {
    const scroller =
      document.querySelector(scrollTargetSelector) || window;
    if (scroller === window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={btnRef}
      id="riw-logo"
      className="riw-logo-floater"
      aria-label="Home"
      onClick={goHome}
    >
      <img src={src} alt="Rooted In Water" draggable="false" />
    </button>
  );
}
