import React from "react";

export default function DashboardCard({ name, value, icon }) {
  return (
    <article class="col-span-12 text-3xl md:col-span-6 xl:col-span-4 2xl:col-span-3 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-6">
      <span class="rounded-full bg-blue-100 h-20 w-20 flex items-center justify-center text-blue-600">{icon}</span>
      <div>
        <p class="text-3xl font-medium text-gray-900">{value}</p>
        <p class="text-sm font-bold text-gray-500">{name}</p>
      </div>
    </article>
  );
}
