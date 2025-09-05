"use client"

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

import Typewriter from "./components/Typewriter";


export default function Home() {
  // Carousel logic

  const images = [1, 2, 3, 4];

  // Custom carousel animation using JS for seamless looping

  function Carousel({
  images = [
    "/images/project1.png",
    "/images/project2.png",
    "/images/project3.png",
    "/images/project4.png",
  ],
  speed = 50, // px/seg
  height = 300,
  cardWidth = 400,
  gap = 48, // Tailwind gap-12 = 48px
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    let x = 0;
    let last = performance.now();

    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2; // ancho de un set (porque duplicamos)
        x -= speed * dt;
        if (-x >= half) x += half; // “salto” para el bucle perfecto
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Duplicamos el array para crear el loop continuo
  const loopImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full" style={{ height }}>
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{
          transform: "translateX(0px)",
          gap: `${gap}px`,
        }}
      >
        {loopImages.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="flex-shrink-0 overflow-hidden shadow-lg bg-gray-900 rounded-xl flex items-center justify-center"
            style={{ width: cardWidth, height }}
          >
            <img
              src={src}
              alt={`Proyecto ${((idx % images.length) + 1).toString()}`}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* (Opcional) máscaras sutiles a los lados */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent" />
    </div>
  );
}

  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Construimos payload sin Object.fromEntries para evitar el error
    const payload = {
      name: (formData.get("name") || "").toString(),
      email: (formData.get("email") || "").toString(),
      message: (formData.get("message") || "").toString(),
      company: (formData.get("company") || "").toString(), // honeypot
    };

    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3500);
    }
  }


  return (

    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative z-10 flex h-screen w-[100vw] mx-auto flex-col-reverse bg-black md:flex-row"
        >
        {/* Text section */}
        <div className="flex-1 flex flex-col items-start justify-center px-6 py-12 md:px-12 lg:px-20">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm text-white/70 ring-1 ring-white/20">
      ● Available for work
          </span>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <Typewriter text="Turning Ideas Into Profitable Digital Presence" speed={40} cursor={false} />
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            <Typewriter text="Built from scratch with Next.js, React, and SEO optimization to attract more clients and sales." speed={35} cursor={false} startDelay={900} />
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-md transition hover:bg-gray-200"
          >
            Work With Us <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Image section */}
        <div
          className="flex-1 h-[50vh] w-full bg-gray-200 bg-cover bg-center md:h-[95vh] self-center md:rounded-2xl mr-10"
          style={{ backgroundImage: "url('/images/foto.png')" }}
        />
      </section>
      {/* About Us Section */}
      <section id="about-me" className="w-full bg-white">
  {/* Contenido centrado (heading + copy) */}
  <div className="mx-auto max-w-7xl px-6 md:px-8 py-24 md:py-32">
    {/* Bloque superior: título + párrafo */}
    <div className="relative grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
      {/* Izquierda: badge + heading */}
      <div className="md:col-span-5">
        <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm text-black/70 ring-1 ring-black/10">
          About us
        </span>

        <h2 className="font-heading lowercase mt-6 text-6xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-black">
          Who Are<br />We
        </h2>
      </div>

      {/* Derecha: párrafo */}
      <div className="md:col-span-7 md:pl-4">
        <p className="font-sans text-lg md:text-xl leading-[2] text-neutral-600 max-w-2xl">
          We are Myrons Agency, a results-driven digital marketing agency.
Our team helps local and international businesses attract more customers, build strong online presence, and scale with confidence.
We don’t believe in generic solutions—every strategy is tailored to fit your goals and deliver real results.
        </p>
      </div>
    </div>
  </div>

  {/* Separador + Carousel full-bleed (toca ambos lados de la pantalla) */}
  <div className="border-t border-neutral-200">
    <div id="projects" className="mx-[calc(50%-50vw)] w-screen overflow-hidden py-10 md:py-12">
      {/* Si tu Carousel ya maneja su propio padding, puedes quitar los py-10/12 de arriba */}
      <Carousel />
    </div>
  </div>

  {/* Stats centradas como en Refit */}
  <section className="bg-white">
    {/* separador fino arriba */}
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="border-t border-neutral-200"></div>
    </div>

    {/* stats */}
    <div className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-2 gap-x-12 gap-y-12 md:grid-cols-4 md:gap-x-24">
        {/* 1 */}
        <div className="flex flex-col">
          <span className="font-heading font-normal tabular-nums leading-none tracking-[-0.02em] text-[56px] md:text-[72px] text-neutral-900">
            <CountUp end={500} duration={2} />+
          </span>
          <span className="font-heading mt-3 text-[15px] font-semibold text-neutral-900">
            Projects delivered
          </span>
          <span className="font-sans mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">
            Over 500 successful projects delivered with quality and care
          </span>
        </div>

        {/* 2 */}
        <div className="flex flex-col">
          <span className="font-heading font-normal tabular-nums leading-none tracking-[-0.02em] text-[56px] md:text-[72px] text-neutral-900">
            <CountUp end={200} duration={3} />+
          </span>
          <span className="font-heading mt-3 text-[15px] font-semibold text-neutral-900">
            Happy Clients
          </span>
          <span className="font-sans mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">
            Over 200 happy clients who trust us with their projects
          </span>
        </div>

        {/* 3 */}
        <div className="flex flex-col">
          <span className="font-heading font-normal tabular-nums leading-none tracking-[-0.02em] text-[56px] md:text-[72px] text-neutral-900">
            <CountUp end={95} duration={2} />%
          </span>
          <span className="font-heading mt-3 text-[15px] font-semibold text-neutral-900">
            Repeat Business
          </span>
          <span className="font-sans mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">
            95% of our clients come back for more projects and services
          </span>
        </div>

        {/* 4 */}
        <div className="flex flex-col">
          <span className="font-heading font-normal tabular-nums leading-none tracking-[-0.02em] text-[56px] md:text-[72px] text-neutral-900">
            <CountUp end={7} duration={3} />+
          </span>
          <span className="font-heading mt-3 text-[15px] font-semibold text-neutral-900">
            Years Industry Experience
          </span>
          <span className="font-sans mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">
            7+ years of experience delivering top-notch digital solutions
          </span>
        </div>
      </div>
    </div>
  </section>
      </section>
      {/* What We Do Section */}
      <section
        id="what-we-do"
        className="w-[95vw] mx-auto flex flex-col items-center justify-center py-24 bg-gray-50"
      >
        <div className="w-full flex flex-col items-center mb-12">
          <h2 className="text-5xl font-extrabold text-black text-center mb-4">What We Do</h2>
          <p className="text-xl text-gray-700 text-center max-w-2xl">
            Discover our services and how we help businesses grow online.
          </p>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-12 mt-8">
          {/* Left: Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/images/office.png"
              alt="What We Do"
              className="object-cover rounded-2xl shadow-lg w-[500px] h-[700px]"
            />
          </div>
          {/* Right: Text */}
          <div className="flex-1 flex flex-col items-start justify-center p-18">
            <h3 className="text-3xl font-bold text-black mb-4">Our Expertise</h3>
            <p className="text-lg text-gray-800 mb-2">
              At Myrons Agency, we specialize in helping businesses grow through social media marketing, paid advertising, and web development.
Our team is dedicated to delivering strategies that generate leads, increase visibility, and drive measurable results.
            </p>
            <p className="text-lg text-gray-800">
              With a mix of creativity, data-driven insights, and a client-first mindset, we ensure every campaign is optimized for success.
Let us help you scale your business and turn your goals into reality.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
      id="contact"
      className="relative w-[95vw] mx-auto flex flex-col items-center justify-center py-24 bg-white"
    >
      {/* Toast de éxito / error */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed top-20 left-1/2 z-50 -translate-x-1/2 transition
          ${status === "success" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        `}
      >
        {status === "success" && (
          <div className="flex items-center gap-3 rounded-2xl bg-green-600 text-white px-5 py-3 shadow-xl">
            {/* Check animado sencillo */}
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  className="animate-[dash_600ms_ease-out_forwards]"
                  style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
                />
              </svg>
            </span>
            <span className="font-medium">¡Mensaje enviado con éxito!</span>
          </div>
        )}
      </div>

      {/* Encabezado */}
      <div className="w-full flex flex-col items-center mb-12">
        <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm text-black/70 ring-1 ring-black/10 mb-4">
          Contact
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 tracking-tight lowercase">
          Get In Touch
        </h2>
        <p className="font-sans text-lg md:text-xl text-gray-600 text-center max-w-2xl">
          Ready to elevate your business? Let’s talk about your project and see how
          we can help you achieve your goals.
        </p>
      </div>

      {/* Formulario */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl bg-gray-50 p-10 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Honeypot anti-spam (oculto) */}
        <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Name */}
        <div className="mb-6">
          <label
            className="block font-sans text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition font-sans"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            className="block font-sans text-sm font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition font-sans"
            placeholder="Your Email"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label
            className="block font-sans text-sm font-medium text-gray-700 mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition font-sans"
            placeholder="Your Message"
            required
          />
        </div>

        {/* Botón */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className={`inline-flex items-center gap-2 rounded-full text-white font-heading font-semibold px-8 py-3 shadow-md transition
              ${status === "loading" ? "bg-blue-500 opacity-90" : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"}
              focus:outline-none focus:ring-4 focus:ring-blue-300
            `}
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent inline-block animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message <span aria-hidden>↗</span>
              </>
            )}
          </button>
        </div>

        {/* Mensaje de error inline */}
        {status === "error" && (
          <p className="mt-4 text-center text-red-600">
            ❌ Hubo un problema al enviar tu mensaje. Intenta de nuevo.
          </p>
        )}
      </form>

      {/* Keyframes inline para el trazo del check */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
    </div>
  );
}
