import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  background?: string;
  fontColor?: string;
  onClick?: () => void;
  content: string;
}

function Button(props: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      className={`${props.background || "bg-slate-500"} ${
        props.fontColor || "text-white"
      } px-6 py-2 w-fit place-self-center rounded-lg md:text-lg sm:text-sm text-sm font-bold`}
      onClick={props.onClick}
    >
      {props.content}
    </motion.button>
  );
}

export default Button;
