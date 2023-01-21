import React from "react";
import { motion } from "framer-motion";
import { AnimationTypes } from "../types";

interface ButtonProps {
  isVisible?: boolean;
  background?: string;
  fontColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  content: string;

  animate?: AnimationTypes;
}

function Button(props: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      className={`${props.background || "bg-slate-500"} ${
        props.fontColor || "text-white"
      } ${
        props.isVisible ?? "visible" ? "visible" : "hidden"
      } px-6 py-2 w-fit place-self-center rounded-lg md:text-lg sm:text-sm text-sm font-bold select-none`}
      onClick={props.onClick}
    >
      {props.content}
    </motion.button>
  );
}

export default Button;
