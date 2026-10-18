"use client";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X, Instagram } from "lucide-react";

const navItems = [{label:"Events",href:"#events"},{label:"The scene",href:"#scene"},{label:"Contact",href:"#contact"}];

export default function Home() {
 const [menuOpen,setMenuOpen]=useState(false);
 return <main className="site-shell">
  <div className="concept-strip"><span>●</span> INDEPENDENT WEBSITE CONCEPT <span className="strip-right">MIAMI, FL / 2026</span></div>
  <header className="masthead">
   <a className="wordmark" href="#" aria-label="UFO Music Group home">UFO<span>®</span><small>MUSIC GROUP</small></a>
   <nav className="nav-desktop">{navItems.map(item=><a key={item.label} href={item.href}>{item.label}</a>)}</nav>
   <a className="masthead-link" href="#contact">GET IN TOUCH <ArrowUpRight size={15}/></a>
   <button className="menu-toggle" aria-label={menuOpen?"Close menu":"Open menu"} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
  </header>
  {menuOpen&&<nav className="nav-mobile">{navItems.map(item=><a key={item.label} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}<ArrowUpRight size={16}/></a>)}</nav>}
  <section className="cover">
   <div className="cover-image"/><div className="cover-tint"/>
   <div className="cover-meta"><span>01 / SOUND & CULTURE</span><span>INDEPENDENT BY NATURE</span></div>
   <div className="cover-title"><p className="micro-label">MUSIC. PEOPLE. AFTER HOURS.</p><h1>OUT OF<br/><i>THIS</i> WORLD<span className="title-period">.</span></h1><div className="cover-bottomline"><p>A place for the music, the night<br/>and everyone who makes it.</p><a href="#events" aria-label="Explore events"><ArrowDownRight size={25}/></a></div></div>
   <div className="cover-stamp">UFO<br/><span>MG</span></div><div className="cover-footer"><span>MIAMI / EVERYWHERE</span><span>SCROLL FOR WHAT'S NEXT ↓</span></div>
  </section>
  <section className="ticker"><div>GOOD MUSIC <b>✳</b> GOOD PEOPLE <b>✳</b> NO FIXED ORBIT <b>✳</b> GOOD MUSIC <b>✳</b> GOOD PEOPLE <b>✳</b> NO FIXED ORBIT <b>✳</b></div></section>
  <section className="about-editorial" id="scene"><div className="editorial-index">02 / THE POINT</div><div className="editorial-main"><h2>THE NIGHT<br/>IS <em>YOUNG.</em></h2><div className="editorial-aside"><span className="orange-rule"/><p>Good nights don't happen by accident. They come from the right sound system, the right room and people who came to be part of something.</p><p>This concept gives UFO Music Group a home for events, collaborators and whatever comes next.</p><span className="small-note">A PROPOSED DIGITAL DIRECTION</span></div></div><div className="editorial-image"><div className="image-caption"><span>AFTER DARK</span><span>NO TWO NIGHTS ALIKE</span></div></div></section>
  <section className="events-section" id="events"><div className="events-top"><div><div className="section-number">03 / ON THE CALENDAR</div><h2>THE NEXT<br/><em>ONE.</em></h2></div><p>One event concept, built around the details shared publicly. Confirm the date and lineup with the organizers before publishing.</p></div>
   <article className="feature-event"><div className="flyer"><div className="flyer-head"><span>UFO MUSIC GROUP × FOCUSEDDD</span><span>MIAMI BEACH / 001</span></div><div className="flyer-art"><div className="flyer-disc"/><div className="flyer-type"><span>DREAMS</span><span>DO COME</span><i>TRUE.</i></div><span className="flyer-orbit">OCEAN DRIVE</span></div><div className="flyer-foot"><span>LIVE MUSIC / DJ SETS</span><span>ART / FASHION / VENDORS</span></div></div>
   <div className="event-copy"><div className="event-label"><span/> FEATURED EVENT CONCEPT</div><h3>Dreams Do<br/>Come True <i>/ Ocean Drive</i></h3><p>Live artist performances, DJ sets, art, fashion and vendors at Front Porch Cafe on Ocean Drive.</p><div className="event-facts"><div><small>WHEN</small><strong>January 2027</strong><span>Exact date to confirm</span></div><div><small>WHERE</small><strong>Front Porch Cafe</strong><span>918 Ocean Dr, Miami Beach</span></div></div><a className="orange-button" href="#contact">ASK ABOUT THE EVENT <ArrowUpRight size={17}/></a><p className="fine-print">Unofficial concept. Event details, date and participation are subject to organizer confirmation.</p></div></article>
  </section>
  <section className="scene-section"><div className="scene-head"><div className="section-number">04 / THE PEOPLE MAKE IT</div><h2>NOT JUST<br/><em>THE MUSIC.</em></h2><p>Artists, DJs, visual creatives, vendors and the people who turn a venue into a night worth remembering.</p></div><div className="scene-grid"><article className="scene-tile tile-one"><div className="tile-num">01</div><div className="tile-text"><small>ON THE DECKS</small><h3>Sound<br/>comes first.</h3></div><span className="tile-arrow"><ArrowUpRight/></span></article><article className="scene-tile tile-two"><div className="tile-num">02</div><div className="tile-text"><small>MADE BY PEOPLE</small><h3>Bring your<br/>own world.</h3></div><span className="tile-arrow"><ArrowUpRight/></span></article><article className="scene-tile tile-three"><div className="tile-num">03</div><div className="tile-text"><small>IN THE ROOM</small><h3>Be part<br/>of the night.</h3></div><span className="tile-arrow"><ArrowUpRight/></span></article></div><p className="scene-note">These are proposed website sections, not a confirmed artist roster or list of UFO programs.</p></section>
  <section className="contact-block" id="contact"><div className="contact-top"><span>05 / HAVE SOMETHING IN MIND?</span><span>ARTISTS · PARTNERS · EVENT PEOPLE</span></div><h2>LET'S MAKE<br/><em>A NIGHT OF IT.</em></h2><div className="contact-bottom"><p>Got an idea, an event or something worth putting in a room together?</p><a href="mailto:hello@ufomusicgroup.com?subject=UFO%20Music%20Group%20Enquiry">START A CONVERSATION <ArrowUpRight size={17}/></a></div><span className="contact-disclaimer">Contact email is a placeholder for this concept and must be replaced with an official address.</span></section>
  <footer className="site-footer"><a className="footer-wordmark" href="#">UFO<small>MUSIC GROUP</small></a><span>MIAMI, FLORIDA</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM <Instagram size={14}/></a><div className="footer-bottom"><span>© 2026 UFO MUSIC GROUP CONCEPT</span><span>UNOFFICIAL WEBSITE CONCEPT / NOT AFFILIATED</span><a href="#">BACK TO TOP ↑</a></div></footer>
 </main>;
}