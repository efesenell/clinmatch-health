"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [doctorsCount, setDoctorsCount] = useState(0);
const [hospitalsCount, setHospitalsCount] = useState(0);
const [doctors, setDoctors] = useState<any[]>([]);
const [hospitals, setHospitals] = useState<any[]>([]);
  const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("id", { ascending: false });

  if (!error && data) {
  setApplications(data);
  for (const app of data) {
  const { data: matchedDoctor } = await supabase
    .from("doctors")
    .select("*")
    .eq("treatment_type", app.treatment)
    .limit(1)
    .single();

if (matchedDoctor) {
  let score = 80;

  if (matchedDoctor.treatment_type === app.treatment) {
    score += 15;
  }

  if (
    matchedDoctor.specialty
      ?.toLowerCase()
      .includes(app.treatment?.toLowerCase().split(" ")[0])
  ) {
    score += 3;
  }

  if (matchedDoctor.hospital) {
    score += 2;
  }

  if (score > 99) score = 99;

  await supabase
    .from("applications")
    .update({
      matched_doctor: matchedDoctor.name,
      matched_hospital: matchedDoctor.hospital,
      match_score: score,
    })
    .eq("id", app.id);
}
}
}

const { count: doctors } = await supabase
  .from("doctors")
  .select("*", { count: "exact", head: true });

setDoctorsCount(doctors || 0);
const { data: doctorsData } = await supabase
  .from("doctors")
  .select("*")
  .order("id", { ascending: false });

if (doctorsData) setDoctors(doctorsData);

const { count: hospitals } = await supabase
  .from("hospitals")
  .select("*", { count: "exact", head: true });

setHospitalsCount(hospitals || 0);
const { data: hospitalsData } = await supabase
  .from("hospitals")
  .select("*")
  .order("id", { ascending: false });

if (hospitalsData) setHospitals(hospitalsData);
  }
 if (!isLoggedIn) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-900">
        <h1 className="text-3xl font-black">ClinMatch Admin</h1>
        <p className="mt-2 text-slate-500">Enter admin password.</p>

        <input
          type="password"
          placeholder="Password"
          className="mt-6 w-full rounded-2xl border p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="mt-4 w-full rounded-full bg-emerald-800 px-6 py-4 font-semibold text-white"
          onClick={() => {
            if (password === "clinmatch2026") {
              setIsLoggedIn(true);
            } else {
              alert("Wrong password");
            }
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-[#0F172A] p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">ClinMatch Admin</h1>
          <p className="mt-2 text-slate-400">
            Manage patients, doctors, hospitals and applications.
          </p>
        </div>

        <a
          href="/"
          className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
        >
          View Site
        </a>
      </div>

      <section className="grid gap-5 md:grid-cols-4">
        {[
  [
    applications.filter((a) => (a.status || "New") === "New").length,
    "New Applications",
  ],
  [
    applications.filter((a) => a.matched_doctor).length,
    "Matched Patients",
  ],
  [doctorsCount, "Doctors"],
  [hospitalsCount, "Hospitals"],
].map(([number, label]) => (
          <div key={label} className="rounded-3xl bg-white/10 p-6">
            <h2 className="text-4xl font-black">{number}</h2>
            <p className="mt-2 text-slate-400">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-3xl bg-white p-6 text-slate-900">
        <h2 className="mb-6 text-2xl font-black">Applications</h2>

        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Patient</th>
<th className="p-4">Country</th>
<th className="p-4">Treatment</th>
<th className="p-4">Doctor</th>
<th className="p-4">Hospital</th>
<th className="p-4">Match</th>
<th className="p-4">AI Recommendation</th>
<th className="p-4">WhatsApp</th>
<th className="p-4">Email</th>
<th className="p-4">Message</th>
<th className="p-4">Offer</th>
<th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
               <tr key={app.id} className="border-t">
<td className="p-4 font-semibold">{app.full_name}</td>
<td className="p-4">{app.country}</td>
<td className="p-4">{app.treatment}</td>
<td className="p-4">
  {app.matched_doctor || "-"}
</td>

<td className="p-4">
  {app.matched_hospital || "-"}
</td>
<td className="p-4">
  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
    {app.match_score ? `${app.match_score}%` : "-"}
  </span>
</td>
<td className="p-4 max-w-xs text-sm text-slate-600">
 {app.matched_doctor ? (
  <div className="text-xs">
    <div className="font-bold text-emerald-700">
      Best Match
    </div>
    <div>✓ Treatment matched</div>
    <div>✓ Specialty matched</div>
    <div>✓ Hospital available</div>
    <div className="mt-1 font-semibold">
      Confidence: {app.match_score}%
    </div>
  </div>
) : (
  "-"
)}
</td>

<td className="p-4">
  <a
    href={`https://wa.me/${String(app.whatsapp).replace(/\D/g, "")}`}
    target="_blank"
    className="font-semibold text-emerald-700"
  >
    Open WhatsApp
  </a>
</td>
<td className="p-4">
  <a
    href={`mailto:${app.email}`}
    className="text-blue-600 hover:underline"
  >
    {app.email}
  </a>
</td>
<td className="p-4 max-w-xs">{app.message}</td>
<td className="p-4">
  <button
    onClick={() => {
      alert(
        `ClinMatch Offer

Patient: ${app.full_name}

Treatment: ${app.treatment}

Doctor: ${app.matched_doctor}

Hospital: ${app.matched_hospital}

Match Score: ${app.match_score}%

Next Step: Our coordinator will contact the patient.`
      );
    }}
    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
  >
    Generate Offer
  </button>
</td>
<td className="p-4">
<select
  className="rounded-lg border p-2"
  value={app.status || "New"}
  onChange={async (e) => {
    const newStatus = e.target.value;

    await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", app.id);

    loadApplications();
  }}
>
  <option>New</option>
  <option>Contacted</option>
  <option>Matched</option>
  <option>Completed</option>
</select>
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 rounded-3xl bg-white p-6 text-slate-900">
  <h2 className="mb-6 text-2xl font-black">Doctors</h2>

  <div className="overflow-hidden rounded-2xl border">
    <table className="w-full text-left">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-4">Doctor</th>
          <th className="p-4">Specialty</th>
          <th className="p-4">Hospital</th>
          <th className="p-4">Email</th>
        </tr>
      </thead>

      <tbody>
        {doctors.map((doctor) => (
          <tr key={doctor.id} className="border-t">
            <td className="p-4 font-semibold">{doctor.name}</td>
            <td className="p-4">{doctor.specialty}</td>
            <td className="p-4">{doctor.hospital}</td>
            <td className="p-4">{doctor.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

<section className="mt-10 rounded-3xl bg-white p-6 text-slate-900">
  <h2 className="mb-6 text-2xl font-black">Hospitals</h2>

  <div className="overflow-hidden rounded-2xl border">
    <table className="w-full text-left">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-4">Hospital</th>
          <th className="p-4">City</th>
          <th className="p-4">Website</th>
          <th className="p-4">Email</th>
        </tr>
      </thead>

      <tbody>
        {hospitals.map((hospital) => (
          <tr key={hospital.id} className="border-t">
            <td className="p-4 font-semibold">{hospital.name}</td>
            <td className="p-4">{hospital.city}</td>
            <td className="p-4">{hospital.website}</td>
            <td className="p-4">{hospital.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
    </main>
  );
}
