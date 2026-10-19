"use client";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X, Mail, MoveUpRight, Volume2, VolumeX } from "lucide-react";
import Lenis from "lenis";

const navItems = [{ label: "The event", href: "#events" }, { label: "The scene", href: "#scene" }, { label: "Get involved", href: "#contact" }];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [invertedMode, setInvertedMode] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientNodesRef = useRef<OscillatorNode[]>([]);
  const ambientGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const toggleAmbientSound = async () => {
    const existingContext = audioContextRef.current;
    const existingGain = ambientGainRef.current;
    if (existingContext && existingGain) {
      existingGain.gain.setTargetAtTime(0, existingContext.currentTime, 0.18);
      ambientNodesRef.current.forEach((node) => {
        try { node.stop(existingContext.currentTime + 0.8); } catch {}
      });
      ambientNodesRef.current = [];
      audioContextRef.current = null;
      ambientGainRef.current = null;
      analyserRef.current = null;
      setAmbientOn(false);
      window.setTimeout(() => { void existingContext.close(); }, 900);
      return;
    }

    try {
      const context = new window.AudioContext();
      await context.resume();
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, context.currentTime);
      master.gain.setTargetAtTime(0.065, context.currentTime, 1.1);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.86;
      master.connect(analyser);
      analyser.connect(context.destination);
      const nodes = [
        { frequency: 55, volume: 0.24, detune: -3 },
        { frequency: 82.41, volume: 0.16, detune: 2 },
        { frequency: 110, volume: 0.09, detune: -2 },
      ].map(({ frequency, volume, detune }) => {
        const oscillator = context.createOscillator();
        const level = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        level.gain.value = volume;
        oscillator.connect(level);
        level.connect(master);
        oscillator.start();
        return oscillator;
      });
      audioContextRef.current = context;
      ambientNodesRef.current = nodes;
      ambientGainRef.current = master;
      analyserRef.current = analyser;
      setAmbientOn(true);
    } catch {
      setAmbientOn(false);
    }
  };

  useEffect(() => () => {
    ambientNodesRef.current.forEach((node) => { try { node.stop(); } catch {} });
    if (audioContextRef.current) void audioContextRef.current.close();
  }, []);

  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const bars = 56;
    const frequencies = new Uint8Array(128);
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const analyser = analyserRef.current;
      if (ambientOn && analyser) analyser.getByteFrequencyData(frequencies);
      else frequencies.fill(0);

      const baseline = height * 0.64;
      const center = width * 0.5;
      const maxRadius = Math.min(width * 0.42, height * 0.76);
      const active = ambientOn && Boolean(analyser);
      context.save();
      context.strokeStyle = "#ff6a2a";
      context.lineWidth = 1.35;
      context.shadowColor = "#ff6a2a";
      context.shadowBlur = active ? 8 : 2;
      context.globalAlpha = active ? 0.96 : 0.42;
      context.beginPath();
      for (let i = 0; i <= bars; i++) {
        const x = (i / bars) * width;
        const bin = Math.min(12, Math.max(1, Math.floor(i / bars * 13)));
        const sample = active ? frequencies[bin] / 255 : 0;
        const envelope = Math.sin((i / bars) * Math.PI);
        const idleWave = 4 + Math.sin(i * 0.31) * 2;
        const amplitude = active ? 7 + sample * 30 : idleWave;
        const y = baseline - envelope * amplitude;
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();

      context.shadowBlur = 0;
      context.globalAlpha = active ? 0.34 : 0.16;
      context.beginPath();
      context.ellipse(center, baseline + 6, maxRadius * (active ? 0.82 : 0.74), maxRadius * 0.2, 0, Math.PI, Math.PI * 2);
      context.stroke();
      context.restore();
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ambientOn]);

  const handleSpotlightMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  const handleMagneticMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    const strength = 0.18;
    const maxOffset = 8;
    const x = Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength));
    const y = Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength));
    target.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
    target.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
  };

  const resetMagneticMove = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
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
    const cursorLabel = cursor?.querySelector("span");
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!cursor || !cursorLabel || !finePointer.matches || reduceMotion.matches) return;

    document.body.classList.add("has-custom-cursor");
    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.style.opacity = "1";
      const target = event.target instanceof Element
        ? event.target.closest("[data-cursor-label], a, button")
        : null;
      const label = target instanceof HTMLElement
        ? target.dataset.cursorLabel || (target.matches("button") ? "SELECT" : "OPEN")
        : "";
      cursor.classList.toggle("is-active", Boolean(target));
      if (label && cursorLabel.textContent !== label) cursorLabel.textContent = label;
    };
    const hideCursor = () => {
      cursor.style.opacity = "0";
      cursor.classList.remove("is-active");
    };
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
    const selector = [
      ".about-editorial",
      ".events-section",
      ".scene-section",
      ".contact-block",
      ".events-top",
      ".editorial-image",
      ".flyer",
      ".event-copy",
      ".scene-head",
      ".contact-top",
      ".contact-bottom",
      ".scene-tile",
    ].join(",");
    const targets = document.querySelectorAll(selector);

    if (reduceMotion) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    targets.forEach((element) => element.classList.add("motion-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main className="site-shell" id="main-content" tabIndex={-1} data-color-mode={invertedMode ? "inverted" : "default"}>
      <div className="concept-strip"><span>●</span> INDEPENDENT WEBSITE CONCEPT <span className="strip-right">MIAMI, FL / 2026</span></div>
      <header className="masthead">
        <a className="wordmark" href="/" aria-label="UFO Music Group home">UFO<span>®</span><small>MUSIC GROUP</small></a>
        <nav className="nav-desktop" aria-label="Main navigation">{navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</nav>
        <a className="masthead-link magnetic-target" href="#contact" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove}>LET'S TALK <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="nav-mobile" id="mobile-navigation" aria-label="Mobile navigation">{navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></a>)}</nav>}

      <section className="cover">
        <canvas ref={visualizerCanvasRef} className={`audio-reactive-canvas${ambientOn ? " is-active" : ""}`} aria-hidden="true" />
        <div className="cover-image" /><div className="cover-tint" /><div className="cover-grain" aria-hidden="true" />
        <div className="cover-meta"><span>01 / SOUND, PEOPLE, PLACE</span><span>MADE FOR THE MOMENT</span></div>
        <div className="cover-title">
          <p className="micro-label">NOT JUST ANOTHER NIGHT OUT.</p>
          <h1>FIND<br /><i>YOUR</i><br />PEOPLE<span className="title-period">.</span></h1>
          <div className="cover-bottomline"><p>Good music brings us in.<br />The people make us stay.</p><a className="magnetic-target" href="#events" aria-label="Discover the featured event" data-cursor-label="DISCOVER" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove}><ArrowDownRight size={25} /></a></div>
          <a className="cover-text-link magnetic-target" href="#scene" data-cursor-label="EXPLORE" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove}>GET TO KNOW THE SCENE <MoveUpRight size={13} /></a>
        </div>
        <div className="cover-stamp">UFO<br /><span>MG</span></div>
        <div className="cover-footer"><span>MIAMI / WHEREVER THE SOUND TAKES US</span><span>KEEP LOOKING ↓</span></div>
      </section>

      <section className="ticker" aria-label="UFO Music Group themes">
        <div className="ticker-track">
          <span className="ticker-content">COME FOR THE SOUND <b>✳</b> STAY FOR THE PEOPLE <b>✳</b> MAKE A NIGHT OF IT <b>✳</b></span>
          <span className="ticker-content" aria-hidden="true">COME FOR THE SOUND <b>✳</b> STAY FOR THE PEOPLE <b>✳</b> MAKE A NIGHT OF IT <b>✳</b></span>
        </div>
      </section>

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
          <a className="flyer cursor-target" data-cursor-label="ASK" href="mailto:hello@ufomusicgroup.com?subject=Question%20about%20Dreams%20Do%20Come%20True%20%2F%20Ocean%20Drive" aria-label="Email an enquiry about the Dreams Do Come True event" onPointerMove={handleSpotlightMove}>
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
            <a className="orange-button magnetic-target" data-cursor-label="ENQUIRE" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove} href="mailto:hello@ufomusicgroup.com?subject=Dreams%20Do%20Come%20True%20%2F%20Ocean%20Drive%20event%20enquiry&body=Hi%20UFO%20Music%20Group%2C%0A%0AI%27d%20like%20to%20ask%20about%20the%20Dreams%20Do%20Come%20True%20%2F%20Ocean%20Drive%20event.%0A%0APlease%20share%20confirmed%20event%20details%20when%20available.%0A">ASK ABOUT THIS EVENT <ArrowUpRight size={17} /></a>
            <p className="fine-print">Date, lineup, venue details and event status must be verified with the organizers.</p>
          </div>
        </article>
      </section>

      <section className="scene-section">
        <div className="scene-head"><div className="section-number">04 / THERE'S ROOM FOR YOU</div><h2>MORE THAN<br /><em>A LINEUP.</em></h2><p>The best nights bring different worlds into the same room. Artists, DJs, makers, vendors and curious people all have a part to play.</p></div>
        <div className="scene-grid">
          <article className="scene-tile tile-one" data-cursor-label="EXPLORE" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">01 / SOUND</div><div className="tile-text"><small>ARTISTS & DJS</small><h3>Bring<br />the noise.</h3></div><a className="tile-arrow magnetic-target" data-cursor-label="CONNECT" href="mailto:hello@ufomusicgroup.com?subject=Artist%20or%20DJ%20enquiry" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove} aria-label="Enquire about performing as an artist or DJ"><ArrowUpRight /></a></article>
          <article className="scene-tile tile-two" data-cursor-label="EXPLORE" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">02 / IDEAS</div><div className="tile-text"><small>CREATORS & MAKERS</small><h3>Bring<br />your world.</h3></div><a className="tile-arrow magnetic-target" data-cursor-label="CONNECT" href="mailto:hello@ufomusicgroup.com?subject=Creator%20or%20vendor%20collaboration" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove} aria-label="Enquire about a creator or vendor collaboration"><ArrowUpRight /></a></article>
          <article className="scene-tile tile-three" data-cursor-label="EXPLORE" onPointerMove={handleSpotlightMove}>
            <span className="card-glare" aria-hidden="true" /><div className="tile-num">03 / PEOPLE</div><div className="tile-text"><small>COME AS YOU ARE</small><h3>Find<br />your people.</h3></div><a className="tile-arrow magnetic-target" data-cursor-label="CONNECT" href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20updates" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove} aria-label="Ask about upcoming UFO Music Group events"><ArrowUpRight /></a></article>
        </div>
        <p className="scene-note">A proposed direction for the site, not a confirmed artist roster or list of UFO programs.</p>
      </section>

      <section className="contact-block" id="contact">
        <div className="contact-top"><span>05 / YOUR MOVE</span><span>ARTISTS · PARTNERS · GOOD IDEAS</span></div>
        <h2>GOT A GOOD<br /><em>IDEA?</em></h2>
        <div className="contact-bottom"><p>Want to play, collaborate, bring a project or just find out what's next?</p><a className="magnetic-target" data-cursor-label="START" onPointerMove={handleMagneticMove} onPointerLeave={resetMagneticMove} href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20Enquiry&body=Hi%20UFO%20Music%20Group%2C%0A%0AI%27m%20getting%20in%20touch%20about%3A%20%5Bartist%20booking%2C%20collaboration%2C%20vendor%20opportunity%2C%20event%20details%2C%20or%20something%20else%5D.%0A%0A">LET'S START HERE <ArrowUpRight size={17} /></a></div>
        <span className="contact-disclaimer">Concept contact address. Replace with an official UFO email before publishing.</span>
      </section>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#">UFO<small>MUSIC GROUP</small></a><span>MIAMI, FLORIDA</span>
        <a href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20social%20media%20links" aria-label="Email UFO Music Group">CONTACT <Mail size={14} /></a>
        <div className="footer-bottom"><span>© 2026 UFO MUSIC GROUP CONCEPT</span><span>INDEPENDENT WEBSITE CONCEPT / NOT AFFILIATED</span><a href="#">BACK TO TOP ↑</a></div>
      </footer>
      <button
        className={`ambient-sound-toggle${ambientOn ? " is-on" : ""}`}
        type="button"
        aria-label={ambientOn ? "Turn ambient sound off" : "Turn ambient sound on"}
        aria-pressed={ambientOn}
        data-cursor-label={ambientOn ? "MUTE" : "SOUND"}
        onClick={toggleAmbientSound}
      >
        {ambientOn ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
        <span>{ambientOn ? "SOUND ON" : "AMBIENT SOUND"}</span>
        <span className="sound-status" aria-hidden="true" />
      </button>
      <button
        className="theme-invert-toggle"
        type="button"
        aria-label={invertedMode ? "Switch to light color mode" : "Switch to inverted dark color mode"}
        aria-pressed={invertedMode}
        data-cursor-label={invertedMode ? "LIGHT" : "DARK"}
        onClick={() => setInvertedMode((current) => !current)}
      >
        <span className="theme-toggle-indicator" aria-hidden="true" />
        <span className="theme-toggle-label">{invertedMode ? "LIGHT MODE" : "DARK MODE"}</span>
      </button>
      <div className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>
      </main>
    </>
  );
}