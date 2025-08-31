"use client";
import { motion } from "framer-motion";

export const FadeIn = ({ children, delay=0 }: any) => (
  <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.6, delay}}>
    {children}
  </motion.div>
);
