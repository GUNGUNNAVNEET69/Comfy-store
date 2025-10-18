import React from "react";
import { Link } from "react-router-dom";

import hero1 from "../assets/project-assets/hero1.webp";
import hero2 from "../assets/project-assets/hero2.webp";
import hero3 from "../assets/project-assets/hero3.webp";
import hero4 from "../assets/project-assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      {/* INFO */}
      <div>
        <h1 className=" max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          we are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
          commodi aut enim corporis est vero impedit! Asperiores a quod qui!
        </p>
        <div className="mt-10">
            <Link to={'/products'} className="btn btn-primary">
            Our products
            </Link>
        </div>
      </div>
      {/* CAROSEL */}
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, idx) => {
          const prevIdx = idx === 0 ? carouselImages.length - 1 : idx - 1;
          const nextIdx = idx === carouselImages.length - 1 ? 0 : idx + 1;
          return (
            <div
              key={idx}
              id={`slide${idx + 1}`}
              className="carousel-item relative w-full"
            >
              <img src={image} className="w-full" alt={`carousel-${idx + 1}`} />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${prevIdx + 1}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${nextIdx + 1}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
