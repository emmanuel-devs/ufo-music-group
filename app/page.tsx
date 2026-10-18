"use client";
import { useEffect, useState, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X, Instagram, MoveUpRight } from "lucide-react";
import Lenis from "lenis";

const navItems = [{ label: "The event", href: "#events" }, { label: "The scene", href: "#scene" }, { label: "Get involved", href: "#contact" }];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSpotlightMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      anchors: true,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLDivElement | null;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !finePointer.matches || reduceMotion.matches) return;

    document.body.classList.add("has-custom-cursor");
    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = "1";
      const target = event.target instanceof Element ? event.target.closest(".cursor-target") : null;
      cursor.classList.toggle("is-active", Boolean(target));
    };
    const hideCursor = () => { cursor.style.opacity = "0"; cursor.classList.remove("is-active"); };
    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerleave", hideCursor);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerleave", hideCursor);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(".about-editorial,.events-section,.scene-section,.contact-block,.events-top,.editorial-image,.flyer,.event-copy,.scene-head,.contact-top,.contact-bottom,.scene-tile");
    if (reduceMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    targets.forEach((el) => el.classList.add("motion-pending"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell">
      <div className="concept-strip"><span>●</span> INDEPENDENT WEBSITE CONCEPT <span className="strip-right">MIAMI, FL / 2026</span></div>
      <header className="masthead">
        <a className="wordmark" href="/" aria-label="UFO Music Group home">UFO<span>®</span><small>MUSIC GROUP</small></a>
        <nav className="nav-desktop" aria-label="Main navigation">{navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <a className="masthead-link" href="#contact">LET'S TALK <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="nav-mobile" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></a>)}</nav>}

      <section className="cover">
        <div className="cover-image" /><div className="cover-tint" /><div className="cover-grain" aria-hidden="true" />
        <div className="cover-meta"><span>01 / SOUND, PEOPLE, PLACE</span><span>MADE FOR THE MOMENT</span></div>
        <div className="cover-title">
          <p className="micro-label">NOT JUST ANOTHER NIGHT OUT.</p>
          <h1>FIND<br /><i>YOUR</i><br />PEOPLE<span className="title-period">.</span></h1>
          <div className="cover-bottomline"><p>Good music brings us in.<br />The people make us stay.</p><a href="#events" aria-label="Discover the featured event"><ArrowDownRight size={25} /></a></div>
          <a className="cover-text-link" href="#scene">GET TO KNOW THE SCENE <MoveUpRight size={13} /></a>
        </div>
        <div className="cover-stamp">UFO<br /><span>MG</span></div>
        <div className="cover-footer"><span>MIAMI / WHEREVER THE SOUND TAKES US</span><span>KEEP LOOKING ↓</span></div>
      </section>

      <section className="ticker" aria-label="UFO Music Group themes"><div>COME FOR THE SOUND <b>✳</b> STAY FOR THE PEOPLE <b>✳</b> MAKE A NIGHT OF IT <b>✳</b> COME FOR THE SOUND <b>✳</b> STAY FOR THE PEOPLE <b>✳</b> MAKE A NIGHT OF IT <b>✳</b></div></section>

      <section className="about-editorial" id="scene">
        <div className="editorial-index">02 / WHAT MAKES IT</div>
        <div className="editorial-main">
          <h2>THE ROOM<br />CHANGES <em>EVERYTHING.</em></h2>
          <div className="editorial-aside"><span className="orange-rule" />
            <p>The right song. A room full of strangers. That moment everyone sings the same line.</p>
            <p>UFO is a meeting point for music, people and nights that turn into stories. This is where the next one starts.</p>
            <span className="small-note">SOUND FIRST. PEOPLE ALWAYS.</span>
          </div>
        </div>
        <div className="editorial-image"><div className="image-caption"><span>WHEN THE ROOM COMES ALIVE</span><span>FEEL IT FOR YOURSELF</span></div></div>
      </section>

      <section className="events-section" id="events">
        <div className="events-top"><div><div className="section-number">03 / ON THE RADAR</div><h2>ONE TO<br /><em>REMEMBER.</em></h2></div><p>A closer look at the event shared publicly. Details shown here are a concept and should be confirmed with the organizers before going live.</p></div>
        <article className="feature-event">
          <a className="flyer cursor-target" href="#contact" aria-label="Ask about the Dreams Do Come True event" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" />
            <div className="flyer-head"><span>UFO MUSIC GROUP × FOCUSEDDD</span><span>MIAMI BEACH / 001</span></div>
            <div className="flyer-art"><div className="flyer-disc" /><div className="flyer-type"><span>DREAMS</span><span>DO COME</span><i>TRUE.</i></div><span className="flyer-orbit">OCEAN DRIVE</span></div>
            <div className="flyer-foot"><span>LIVE MUSIC / DJ SETS</span><span>ART / FASHION / VENDORS</span></div>
          </a>
          <div className="event-copy">
            <div className="event-label"><span /> FEATURED EVENT</div>
            <h3>Dreams Do<br />Come True <i>/ Ocean Drive</i></h3>
            <p>Live performances, DJ sets, art, fashion and independent vendors, all coming together on Ocean Drive.</p>
            <div className="event-facts">
              <div><small>WHEN</small><strong>January 2027</strong><span>Exact date to confirm</span></div>
              <div><small>WHERE</small><strong>Front Porch Cafe</strong><span>918 Ocean Dr, Miami Beach</span></div>
            </div>
            <a className="orange-button" href="#contact">ASK ABOUT THIS EVENT <ArrowUpRight size={17} /></a>
            <p className="fine-print">Date, lineup, venue details and event status must be verified with the organizers.</p>
          </div>
        </article>
      </section>

      <section className="scene-section">
        <div className="scene-head"><div className="section-number">04 / THERE'S ROOM FOR YOU</div><h2>MORE THAN<br /><em>A LINEUP.</em></h2><p>The best nights bring different worlds into the same room. Artists, DJs, makers, vendors and curious people all have a part to play.</p></div>
        <div className="scene-grid">
          <article className="scene-tile tile-one" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">01 / SOUND</div><div className="tile-text"><small>ARTISTS & DJS</small><h3>Bring<br />the noise.</h3></div><span className="tile-arrow"><ArrowUpRight /></span></article>
          <article className="scene-tile tile-two" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">02 / IDEAS</div><div className="tile-text"><small>CREATORS & MAKERS</small><h3>Bring<br />your world.</h3></div><span className="tile-arrow"><ArrowUpRight /></span></article>
          <article className="scene-tile tile-three" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">03 / PEOPLE</div><div className="tile-text"><small>COME AS YOU ARE</small><h3>Find<br />your people.</h3></div><span className="tile-arrow"><ArrowUpRight /></span></article>
        </div>
        <p className="scene-note">A proposed direction for the site, not a confirmed artist roster or list of UFO programs.</p>
      </section>

      <section className="contact-block" id="contact">
        <div className="contact-top"><span>05 / YOUR MOVE</span><span>ARTISTS · PARTNERS · GOOD IDEAS</span></div>
        <h2>GOT A GOOD<br /><em>IDEA?</em></h2>
        <div className="contact-bottom"><p>Want to play, collaborate, bring a project or just find out what's next?</p><a href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20Enquiry">LET'S START HERE <ArrowUpRight size={17} /></a></div>
        <span className="contact-disclaimer">Concept contact address. Replace with an official UFO email before publishing.</span>
      </section>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#">UFO<small>MUSIC GROUP</small></a><span>MIAMI, FLORIDA</span>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM <Instagram size={14} /></a>
        <div className="footer-bottom"><span>© 2026 UFO MUSIC GROUP CONCEPT</span><span>INDEPENDENT WEBSITE CONCEPT / NOT AFFILIATED</span><a href="#">BACK TO TOP ↑</a></div>
      </footer>
      <div className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>
    </main>
  );
}