"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Instagram,
  Play,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "The vision", href: "#vision" },
  { label: "Experiences", href: "#experiences" },
  { label: "Culture", href: "#culture" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        Independent concept preview <span className="announcement-separator">/</span> Built around music, people & possibility
      </div>

      <header className="site-header">
        <a href="#" className="brand" aria-label="UFO Music Group home">
          <span className="brand-mark">UFO<span>.</span></span>
          <span className="brand-caption">MUSIC GROUP</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </nav>

        <a className="header-cta" href="#connect">
          Let&apos;s connect <ArrowUpRight size={15} />
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href="#connect" onClick={() => setMenuOpen(false)}>Let&apos;s connect <ArrowUpRight size={16} /></a>
        </nav>
      )}

      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow light-eyebrow"><span /> SOUND. PEOPLE. POSSIBILITY.</div>
          <h1>Culture<br />doesn&apos;t <em>wait.</em></h1>
          <p className="hero-description">
            A meeting point for music, creative minds and the moments that move us forward.
          </p>
          <div className="hero-actions">
            <a className="button button-accent" href="#experiences">
              Explore the vision <ArrowDownRight size={17} />
            </a>
            <a className="text-link light-link" href="#vision">
              What we&apos;re about <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-index"><span>01</span> / A NEW FREQUENCY</div>
        <div className="hero-side-note">INDEPENDENT SPIRIT. SHARED ENERGY.</div>
        <div className="hero-bottom">
          <span>MIAMI, FLORIDA <span className="hero-bottom-dot">●</span> EVERYWHERE</span>
          <span>SCROLL TO EXPLORE <ArrowDownRight size={14} /></span>
        </div>
      </section>

      <section className="intro section-pad" id="vision">
        <div className="section-kicker"><span>01</span> THE BIGGER PICTURE</div>
        <div className="intro-grid">
          <h2>More than a moment.<br /><em>A whole movement.</em></h2>
          <div className="intro-copy">
            <p className="lead-copy">The right music brings people together. The right room can change everything.</p>
            <p>This concept imagines a digital home for a creative collective: one place to discover experiences, follow what&apos;s happening and find the people behind the energy.</p>
            <a href="#culture" className="text-link dark-link">Explore the possibilities <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="principles">
          <div className="principle">
            <span className="principle-number">01 /</span>
            <Sparkles size={21} strokeWidth={1.5} />
            <h3>Make it felt.</h3>
            <p>Experiences that stay with you long after the last track.</p>
          </div>
          <div className="principle">
            <span className="principle-number">02 /</span>
            <Play size={21} strokeWidth={1.5} />
            <h3>Give sound a home.</h3>
            <p>A space to spotlight music, talent and the stories behind them.</p>
          </div>
          <div className="principle">
            <span className="principle-number">03 /</span>
            <ArrowUpRight size={21} strokeWidth={1.5} />
            <h3>Open the door.</h3>
            <p>Make it easier for artists, partners and creative people to connect.</p>
          </div>
        </div>
      </section>

      <section className="experience-section section-pad" id="experiences">
        <div className="section-heading">
          <div>
            <div className="section-kicker light-kicker"><span>02</span> ON THE HORIZON</div>
            <h2>Make room<br /><em>for the unexpected.</em></h2>
          </div>
          <p>A proposed home for upcoming events, shared experiences and the moments worth showing up for.</p>
        </div>

        <article className="event-card">
          <div className="event-art">
            <div className="event-art-top"><span>UFO MUSIC GROUP</span><span>EVENT CONCEPT / 001</span></div>
            <div className="event-orb" />
            <div className="event-art-title">
              <span>DREAMS DO</span>
              <span>COME <i>TRUE.</i></span>
            </div>
            <div className="event-art-bottom"><span>OCEAN DRIVE</span><span>MIAMI BEACH, FL</span></div>
          </div>
          <div className="event-details">
            <div className="event-status"><span className="status-dot" /> FEATURED EXPERIENCE</div>
            <h3>Dreams Do Come True<br /><em>/ Ocean Drive</em></h3>
            <p>A night built around live music, DJ sets, art, fashion and the people who bring a city to life.</p>
            <div className="event-meta">
              <div><span className="meta-label">WHEN</span><strong>January 2027</strong><small>Exact date to be confirmed</small></div>
              <div><span className="meta-label">WHERE</span><strong>Ocean Drive</strong><small>Miami Beach, Florida</small></div>
            </div>
            <a className="button button-dark" href="#connect">Ask about this event <ArrowUpRight size={16} /></a>
            <p className="event-note">Concept presentation based on a publicly shared event flyer. Final details should be confirmed with the organizers.</p>
          </div>
        </article>
        <div className="section-footnote"><span>ONE CITY. MANY STORIES.</span><span>THE NEXT CHAPTER IS OPEN.</span></div>
      </section>

      <section className="culture-section section-pad" id="culture">
        <div className="section-kicker"><span>03</span> THE CULTURE AROUND IT</div>
        <div className="culture-header">
          <h2>Different worlds.<br /><em>One shared frequency.</em></h2>
          <p>A creative platform should feel alive between events, too. Here&apos;s how this concept could grow with the people around it.</p>
        </div>
        <div className="culture-grid">
          <article className="culture-card culture-card-large">
            <div className="culture-photo culture-photo-artists" />
            <div className="culture-card-overlay" />
            <div className="culture-card-content"><span>01 / THE PEOPLE</span><h3>Artists &<br />collaborators</h3><p>A spotlight for the talent and creative minds shaping each experience.</p><span className="circle-arrow"><ArrowUpRight size={18} /></span></div>
          </article>
          <article className="culture-card">
            <div className="culture-photo culture-photo-sound" />
            <div className="culture-card-overlay" />
            <div className="culture-card-content"><span>02 / THE SOUND</span><h3>Music &<br />discovery</h3><p>New sounds, DJ culture and the stories behind the music.</p><span className="circle-arrow"><ArrowUpRight size={18} /></span></div>
          </article>
          <article className="culture-card">
            <div className="culture-photo culture-photo-community" />
            <div className="culture-card-overlay" />
            <div className="culture-card-content"><span>03 / THE SCENE</span><h3>Art, style<br />& community</h3><p>Where fashion, visual art and local energy meet.</p><span className="circle-arrow"><ArrowUpRight size={18} /></span></div>
          </article>
        </div>
        <p className="concept-note"><span>NOTE</span> These are proposed content directions for the website concept, not claims about confirmed UFO Music Group programs or roster.</p>
      </section>

      <section className="connect-section" id="connect">
        <div className="connect-backdrop" />
        <div className="connect-content">
          <div className="section-kicker light-kicker"><span>04</span> GOOD THINGS START WITH A CONVERSATION</div>
          <h2>Got something<br />in <em>motion?</em></h2>
          <p>Artists, event partners, vendors and creative collaborators. Let&apos;s explore what could happen when the right people connect.</p>
          <a className="button button-accent" href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20Enquiry">Start a conversation <ArrowUpRight size={17} /></a>
          <span className="contact-note">Concept contact link. Replace with the official contact channel when confirmed.</span>
        </div>
      </section>

      <footer className="footer">
        <a href="#" className="brand footer-brand"><span className="brand-mark">UFO<span>.</span></span><span className="brand-caption">MUSIC GROUP</span></a>
        <span className="footer-tagline">CULTURE IN MOTION.</span>
        <a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer">SOCIAL <Instagram size={14} /></a>
        <div className="footer-bottom">
          <span>© 2026 UFO MUSIC GROUP CONCEPT</span>
          <span>INDEPENDENT WEBSITE CONCEPT • NOT AN OFFICIAL SITE</span>
          <a href="#">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}