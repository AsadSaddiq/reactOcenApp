import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const App = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images?.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="relative w-full md:w-[62vw]  flex">
        <img
          src={`http://127.0.0.1:8000${images[currentSlide]?.image}`}
          alt={`Image ${currentSlide + 1}`}
          className="object-cover w-full rounded-l-2xl rounded-r-2xl md:rounded-r-none items-center text-center transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={() =>
              goToSlide((currentSlide - 1 + images?.length) % images?.length)
            }
            className="text-blue text-2xl font-bold"
          >
            <BsChevronLeft />
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % images?.length)}
            className="text-blue text-2xl font-bold"
          >
            <BsChevronRight />
          </button>
        </div>
        <div className="absolute bottom-1 flex justify-center w-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1 w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="hidden w-[28vw] h-[75vh] md:flex flex-col justify-between border-l-[0.5vh] border-blue-300">
        <div className="flex h-[38vh] border-b-[1vh] border-blue-300 ">
          <img
            className="object-cover w-full rounded-tr-2xl transition-opacity duration-500"
            src={`http://127.0.0.1:8000${images[1]?.image}`}
            alt=""
          />
        </div>
        <div className="flex h-[37vh] ">
          <img
            className="object-cover w-full rounded-br-2xl transition-opacity duration-500"
            src={`http://127.0.0.1:8000${images[2]?.image}`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default App;
