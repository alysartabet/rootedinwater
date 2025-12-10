import { useEffect, useRef } from "react";

import logoImg from "../assets/logoimg.png";

const CLAMP01 = (x) => Math.max(0, Math.min(1, x));
const FADE_IN_START = 0.02; // start almost immediately
const FADE_IN_END = 0.18;

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
      const cs = getComputedStyle(document.documentElement);
      const cssW = parseFloat(cs.getPropertyValue("--logo-nav-w")) || 72;
      const cssH = parseFloat(cs.getPropertyValue("--logo-nav-h")) || 46;
      const base = parseFloat(cs.getPropertyValue("--logo-base-w")) || Math.min(Math.max(vw * 0.32, 240), 720);
      meas.current.targetW = cssW;
      meas.current.targetH = cssH;
      

      // start point
      let sx = vw / 2, sy = vh * 0.55, sWidth = base;

      if (startA) {
          const rs = startA.getBoundingClientRect();
          sx = rs.left + rs.width / 2;
          sy = rs.top  + rs.height / 2;
          sWidth = rs.width;
      }

      // end point
      if (homeA) {
          const r = homeA.getBoundingClientRect();
          meas.current.targetX = r.left + cssW / 2;
          meas.current.targetY = r.top  + cssH / 2;
      }

      meas.current.centerX = sx;
      meas.current.centerY = sy; 
      meas.current.startScale = sWidth ? (base / sWidth) : 1;

      meas.current.endScale = cssW / base;

      const heroH = hero ? hero.getBoundingClientRect().height : vh * 0.8;
      meas.current.travel = Math.max(240, heroH * 0.85); 
    };

    //Measure Effect
    useEffect(() => {
      const init = () => {
          // small timeout to let the DOM & images finish loading
          requestAnimationFrame(() => setTimeout(measure, 80));
      };

      const onResize = () => {
        measure(); 
        const evt = new Event("scroll");
        window.dispatchEvent(evt);
      };

      init();
      window.addEventListener("resize", onResize, { passive: true });

      // also re-measuring when the landing image finishes loading (important in Vite)
      const logoImgEl = document.getElementById("riw-logo-start");
      let obs;
      if (logoImgEl) {
          obs = new ResizeObserver(() => measure());
          obs.observe(logoImgEl);
      }

      return () => {
        window.removeEventListener("resize", onResize);
        if (obs) obs.disconnect();
      };
    }, []);

    //Scroll Binding Effect
    useEffect(() => {
      let raf = 0;
      let target = null;
      let cleanup = () => {};

      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
        const y =
            target === window ? (window.scrollY || 0) : (target?.scrollTop || 0);

        const t = CLAMP01(y / meas.current.travel);
        document.documentElement.style.setProperty("--logo-t", String(t));
        document.documentElement.classList.toggle("logo-docked", t >= completeAt);

        const { centerX, centerY, targetX, targetY } = meas.current;
        const x = centerX + (targetX - centerX) * t;
        const yPos = centerY + (targetY - centerY) * t;

        // fade gate
        let opacity = 0;
        if (t >= FADE_IN_END) opacity = 1;
        else if (t > FADE_IN_START) opacity = (t - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);

        const s0 = meas.current.startScale ?? startScale;
        const eS = (meas.current.endScale ?? (meas.current.targetW ? meas.current.targetW / (parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue("--logo-base-w")) || 220)
                    : endScale));
        const s = s0 + (eS - s0) * t;

        if (btnRef.current) {
            btnRef.current.style.opacity = String(opacity);
            btnRef.current.style.transform =
            `translate3d(${x}px, ${yPos}px, 0) translate(-50%, -50%) scale(${s})`;
            btnRef.current.dataset.docked = t >= completeAt ? "true" : "false";
        }
        });
        if (meas.current.targetW && meas.current.targetH){
          document.documentElement.style.setProperty("--logo-nav-w", `${meas.current.targetW}px`);
          document.documentElement.style.setProperty("--logo-nav-h", `${meas.current.targetH}px`);
        }
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
