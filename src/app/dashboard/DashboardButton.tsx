
"use client";

import React, { useState } from "react";

const DashboardButtons = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          onClick={() => setMessage("Ticket button clicked")}
        >
          Ticket
        </button>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          onClick={() => setMessage("Lead button clicked")}
        >
          Lead
        </button>
      </div>

      {message && <div className="text-green-600 font-medium">{message}</div>}
    </div>
  );
};

export default DashboardButtons;
