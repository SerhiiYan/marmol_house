import React from "react";

const logos = [
  "/og-image.png",
  "/logos/company2.png",
  "/logos/company3.png",
  "/logos/company4.png",
  "/logos/company5.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
  "/logos/company6.png",
];

export default function PartnerLogosSlider() {
  return (
    <div className="bg-gray-800 bg-opacity-40 py-6 overflow-hidden">
      <div className="relative flex w-max animate-scroll">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="mx-6 shrink-0">
            <img src={logo} alt={`logo-${index}`} className="h-16 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
