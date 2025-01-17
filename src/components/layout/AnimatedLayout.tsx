import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-3xl min-h-screen px-5 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={window.location.pathname} // Unique key for each route
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.main>{children}</motion.main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLayout;
