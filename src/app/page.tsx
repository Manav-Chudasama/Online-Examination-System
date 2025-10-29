"use client";
import { motion } from "framer-motion";
import Coding from "@/LottieFiles/anims/Coding";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="flex items-center justify-center min-h-screen"
    >
      <h1 className="text-2xl font-bold">Basic Setup for Project</h1>
      <Coding />
    </motion.div>
  );
};

export default Home;
