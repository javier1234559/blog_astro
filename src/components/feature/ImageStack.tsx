import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    name: "HCMUTE",
    src: "/images/hcmute.png",
    alt: "This is my school HCMUTE",
  },
  {
    name: "CLOUD",
    src: "/images/cloudy.png",
    alt: "This scene is so beautiful and peaceful",
  },
  {
    name: "HO CHI MINH CITY",
    src: "/images/hcm_city.png",
    alt: "The city where I live",
  },
];

const ImageStack = () => {
  const [cards, setCards] = useState(images);

  const handleSwipe = (index: number) => {
    setCards((prev) => {
      const updated = [...prev];
      const [swiped] = updated.splice(index, 1); //remove the index and save in swiped
      updated.push(swiped); // at last
      return updated;
    });
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.name}
            className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden"
            style={{
              zIndex: cards.length - index,
            }}
            initial={{ scale: 0.9, y: index * 10 }}
            animate={{ scale: 1, y: index * 10, rotate: index * 6 }}
            transition={{
              rotate: { duration: 0.5 },
            }}
            exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100 || info.offset.x < -100) {
                handleSwipe(index); // Trigger swipe when dragged sufficiently
              }
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              className="w-full h-full object-cover"
              draggable="false"
            />
             <div
              className="absolute bottom-2 left-2 text-white text-sm p-2 rounded opacity-50"
              style={{
                background: "linear-gradient(45deg, #000, #333)",
                transform: "skewX(-10deg)", // Skew for parallelogram
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Add shadow
              }}
            >
              {card.alt}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ImageStack;
