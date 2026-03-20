import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import img1 from "../../assets/ely.jpg";
import img2 from "../../assets/darren.jpg";
import img3 from "../../assets/rachel-randen.jpg";
import img4 from "../../assets/joel.jpg";
import img5 from "../../assets/raiko.jpg";
import img6 from "../../assets/kelsey.jpg";
import img7 from "../../assets/shaun-jona.jpg";
import img8 from "../../assets/vincent.jpg";
import img9 from "../../assets/gian-joy.jpg";
import img10 from "../../assets/kean.jpg";
import img11 from "../../assets/randen.jpg";
import ErrorSound from "../../assets/u_8iuwl7zrk0-error-170796.mp3";

const IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

export function PhotoRevealGame() {
  const [currentPage, setCurrentPage] = useState(1);
  const [revealedSquares, setRevealedSquares] = useState<Set<number>>(
    new Set(),
  );
  const [showAll, setShowAll] = useState(false);

  const totalPages = IMAGES.length;
  const currentImage = IMAGES[currentPage - 1];

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShowAll(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const audio = new Audio(ErrorSound);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "z") {
        audio.currentTime = 0; // restart sound if spammed
        audio.play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSquareClick = (index: number) => {
    setRevealedSquares((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setRevealedSquares(new Set());
      setShowAll(false);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setRevealedSquares(new Set());
      setShowAll(false);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern - Plus Signs */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, #d1d5db 1px, transparent 1px),
          linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
        `,
          backgroundSize: "30px 30px",
          backgroundPosition: "center center",
          opacity: 0.15,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex pt-6 pb-6 flex-col items-center w-full h-full justify-center">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl tracking-[0.3em] text-gray-800 mb-4"
            style={{ fontWeight: 300, letterSpacing: "0.3em" }}
          >
            GUESS WHO?
          </h1>
          <p className="text-sm text-gray-400 tracking-widest uppercase">
            Kapatid sa Molave
          </p>
        </div>

        {/* Game Card */}
        <div className="relative bg-white rounded-3xl shadow-lg p-4 mb-10 flex-1 flex items-center justify-center max-h-[calc(90vh-200px)]">
          {/* Grid */}
          <div className="relative flex justify-center" key={currentPage}>
            <div className="grid grid-cols-4 w-[min(calc(90vh-220px),90vw)] h-[min(calc(90vh-220px),90vw)] overflow-hidden rounded-2xl">
              {Array.from({ length: 16 }).map((_, index) => {
                const row = Math.floor(index / 4);
                const col = index % 4;
                const isRevealed = showAll || revealedSquares.has(index);

                return (
                  <div
                    key={index}
                    className="relative overflow-hidden cursor-pointer transition-all duration-200 hover:brightness-110"
                    onClick={() => handleSquareClick(index)}
                  >
                    {/* Background image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundPosition: `${(col / 3) * 100}% ${(row / 3) * 100}%`,
                        backgroundSize: "400%",
                        opacity: isRevealed ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    {/* Cover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center transition-opacity duration-300 border-r border-b border-gray-200 ${
                        isRevealed
                          ? "opacity-0 pointer-events-none"
                          : "opacity-100"
                      }`}
                    >
                      <Lock
                        className="w-6 h-6 md:w-8 md:h-8 text-gray-300 mb-2"
                        strokeWidth={1.5}
                      />
                      <span className="text-xs text-gray-300 tracking-wider">
                        CLUE {index + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase text-sm tracking-wider"
          >
            Previous
          </button>

          <div className="text-gray-500 min-w-[60px] text-center">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase text-sm tracking-wider"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
