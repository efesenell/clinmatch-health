"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
const treatments = [
  "Hair Transplant",
  "Dental Treatments",
  "Plastic Surgery",
  "Bariatric Surgery",
  "Eye Surgery",
  "IVF Treatment",
];

const doctors = [
  {
    name: "Dr. Alexander Demir",
    field: "Plastic Surgery",
    hospital: "Istanbul Premium Clinic",
  },
  {
    name: "Dr. Lara Yılmaz",
    field: "Hair Transplant",
    hospital: "ClinMatch Partner Center",
  },
  {
    name: "Dr. Deniz Arslan",
    field: "Dental Aesthetics",
    hospital: "Dental Excellence Istanbul",
  },
];

const hospitals = [
  "Acıbadem Hospital Network",
  "Liv Hospital Istanbul",
  "Esteworld Medical Group",
  "Nişantaşı Private Clinics",
];

export default function Home() {
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setLoading(true);

  const form = new FormData(event.currentTarget);

  const { error } = await supabase.from("applications").insert({
    full_name: form.get("full_name"),
    country: form.get("country"),
    whatsapp: form.get("whatsapp"),
    email: form.get("email"),
    treatment: form.get("treatment"),
    message: form.get("message"),
  });

  setLoading(false);

  if (!error) {
    setSuccess(true);
    event.currentTarget.reset();
  }
}
  return (
    <main className="min-h-screen bg-[#F7F4EF] text-[#111827]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-[#F7F4EF]/90 px-8 py-5 backdrop-blur">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">ClinMatch</h1>
          <p className="text-xs tracking-[0.25em] text-gray-500">HEALTH</p>
        </div>

        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#treatments">Treatments</a>
          <a href="#doctors">Doctors</a>
          <a href="#hospitals">Hospitals</a>
          <a href="#apply">Apply</a>
        </div>
      </nav>

      <section className="grid min-h-[82vh] items-center gap-12 px-8 py-20 md:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
            Premium Medical Tourism Platform
          </p>

          <h2 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
            Find the right doctor in Turkey.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            ClinMatch connects international patients with trusted hospitals,
            verified specialists and personalized treatment options.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#apply"
              className="rounded-full bg-emerald-800 px-8 py-4 font-semibold text-white"
            >
              Start Application
            </a>
            <a
              href="#doctors"
              className="rounded-full border border-gray-300 bg-white px-8 py-4 font-semibold"
            >
              Browse Doctors
            </a>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-2xl">
          <div className="rounded-[2rem] bg-emerald-900 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">
              Patient Matching
            </p>
            <h3 className="mt-6 text-4xl font-bold">
              Your medical journey, managed from one place.
            </h3>

            <div className="mt-10 space-y-4">
              {["Submit case", "Review doctors", "Get matched", "Travel safely"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-900">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 px-8 pb-20 md:grid-cols-4">
        {[
          ["200+", "Verified Doctors"],
          ["50+", "Partner Hospitals"],
          ["20+", "Patient Countries"],
          ["24/7", "Support"],
        ].map(([number, label]) => (
          <div key={label} className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-4xl font-black">{number}</h3>
            <p className="mt-2 text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section id="treatments" className="px-8 py-20">
        <h2 className="text-4xl font-black">Treatments</h2>
        <p className="mt-3 text-gray-600">
          Choose your treatment category and let ClinMatch guide you.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {treatments.map((item) => (
            <div key={item} className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold">{item}</h3>
              <p className="mt-4 text-gray-600">
                Compare specialists, hospitals and treatment plans.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="doctors" className="px-8 py-20">
        <h2 className="text-4xl font-black">Featured Doctors</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-6 h-44 rounded-3xl bg-gradient-to-br from-emerald-100 to-stone-200" />
              <h3 className="text-2xl font-bold">{doctor.name}</h3>
              <p className="mt-2 text-emerald-700">{doctor.field}</p>
              <p className="mt-2 text-gray-500">{doctor.hospital}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="hospitals" className="px-8 py-20">
        <h2 className="text-4xl font-black">Partner Hospitals</h2>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {hospitals.map((hospital) => (
            <div key={hospital} className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">{hospital}</h3>
              <p className="mt-4 text-gray-600">
                Premium healthcare provider in Turkey.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="px-8 py-24">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-white p-8 shadow-xl md:p-12">
          <h2 className="text-4xl font-black">Start Your Application</h2>
          <p className="mt-3 text-gray-600">
            Submit your case and our team will contact you.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-4 md:grid-cols-2">
            <input
  name="full_name"
  className="rounded-2xl border p-4"
  placeholder="Full Name"
/>
            <input
  name="country"
  className="rounded-2xl border p-4"
  placeholder="Country"
/>
            <input
  name="whatsapp"
  className="rounded-2xl border p-4"
  placeholder="WhatsApp"
/>
            <input
  name="email"
  className="rounded-2xl border p-4"
  placeholder="Email"
/>
            <select
  name="treatment"
  className="rounded-2xl border p-4 md:col-span-2"
>
              <option>Select Treatment</option>
              {treatments.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <textarea
  name="message"
  className="min-h-36 rounded-2xl border p-4 md:col-span-2"
  placeholder="Tell us about your case"
/>
            <button
  type="submit"
  disabled={loading}
  className="rounded-full bg-emerald-800 px-8 py-4 font-semibold text-white md:col-span-2"
>
  {loading ? "Sending..." : "Submit Application"}
</button>
          </form>
        </div>
      </section>

      <footer className="bg-emerald-950 px-8 py-12 text-white">
        <h2 className="text-3xl font-black">ClinMatch Health</h2>
        <p className="mt-4 text-emerald-100">
          Premium medical tourism platform for international patients.
        </p>
      </footer>
    </main>
  );
}