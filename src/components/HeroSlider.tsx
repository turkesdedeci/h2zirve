"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  "/turkesdedeci_Hydrogen_and_green_enviroment_--chaos_15_--ar_16_470798fe-ab50-45a0-bde2-cec14670290b_0.png",
  "/turkesdedeci_httpss.mj.runK9hiqbM1jkc_make_green_add_green_en_1a205479-f462-43b3-9e8c-d83fa3c770e6_1.png",
  "/turkesdedeci_Brochure_picture_for_climate_and_energy_like_ele_f5b6e2ed-09a9-4cbc-a114-0fec33a2b3bb_2.png",
  "/turkesdedeci_climate_and_energy_forum_--chaos_10_--ar_169_--sty_b37be7ad-1904-49ad-b66c-46d3735a252c (1).png",
  "/turkesdedeci_httpss.mj.runJHAK78iQ6MA_international_hydrogen_en_eb111ab7-f9e5-4b3f-b8c8-4667e41b7dec.png",
  "/turkesdedeci_international_hydrogen_energy_forum_--ar_32_--v__98383077-a703-4873-a195-b3be562314f2_0.png",
  "/turkesdedeci_people_trying_to_change_the_climate_for_the_bett_45d75c5c-c806-4467-989f-00ca312bf4c6_2.png",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Koyu overlay */}
      <div className="absolute inset-0 bg-[#06091A]/75" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#00C8FF]/10 rounded-full blur-[80px]" />

    </div>
  );
}
