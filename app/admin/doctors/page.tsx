"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    const { data } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: false });

    if (data) setDoctors(data);
  }

  return (
    <main className="min-h-screen bg-[#0F172A] p-8 text-white">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">Doctors</h1>
          <p className="mt-2 text-slate-400">
            Manage ClinMatch doctor network.
          </p>
        </div>

        <a
          href="/admin"
          className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900"
        >
          Back to Admin
        </a>
      </div>

      <section className="rounded-3xl bg-white p-6 text-slate-900">
        <h2 className="mb-6 text-2xl font-black">Doctor List</h2>

        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4">Doctor</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Hospital</th>
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Email</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="border-t">
                  <td className="p-4 font-semibold">{doctor.name}</td>
                  <td className="p-4">{doctor.specialty}</td>
                  <td className="p-4">{doctor.hospital}</td>
                  <td className="p-4">
                    <a
                      href={`https://wa.me/${String(doctor.whatsapp).replace(/\D/g, "")}`}
                      target="_blank"
                      className="font-semibold text-emerald-700"
                    >
                      WhatsApp
                    </a>
                  </td>
                  <td className="p-4">
                    <a
                      href={`mailto:${doctor.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {doctor.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}