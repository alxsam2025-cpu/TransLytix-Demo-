import React from "react";

const TEAM_MEMBERS = [
  { name: "Samuel Adu", title: "Founder & Project Lead", img: "/team/samuel.jpg" },
  { name: "Abisola Babatunde", title: "Chief Project Manager", img: "/team/abisola.jpg" },
  { name: "Confidence Mbachu", title: "UX Research Manager", img: "/team/confidence.jpg" },
  { name: "Pretty Amala", title: "UI/UX Designer Manager", img: "/team/pretty.jpg" },
  { name: "Joseph Kamau", title: "Research Data Analyst Manager", img: "/team/joseph.jpg" },
  { name: "Joyleen Kamau", title: "UX / Data Analyst Manager", img: "/team/joyleen.jpg" },
  { name: "Ayuel Jibol", title: "Project Manager", img: "/team/ayuel.jpg" },
];

export default function TeamSection() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <h2 className="text-3xl font-bold text-center text-green-700">👥 Meet Our Team</h2>
      <p className="text-center text-gray-600 text-sm sm:text-base">
        Our talented team is committed to delivering innovative solutions and excellent service.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-xl shadow-md overflow-hidden text-center p-4 
                       transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative group"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto object-cover border-2 border-green-500 shadow-md"
            />
            <h3 className="mt-3 font-semibold text-sm sm:text-base">{member.name}</h3>

            {/* Hover overlay showing title */}
            <div className="absolute inset-0 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 
                            flex flex-col items-center justify-center p-2 rounded transition-opacity duration-300">
              <p className="text-xs sm:text-sm">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
