"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = { children: ReactNode; delay?: number };

export const FadeIn = ({ children, delay = 0 }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);
