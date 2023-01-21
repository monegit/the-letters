import React from "react";
import { motion } from "framer-motion";
import { AnimationTypes } from "../types";

interface InputProps {
  placeholder?: string;
  password?: true;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  animate?: AnimationTypes;
}

function Input(props: InputProps) {
  return (
    <motion.input
      className="relative mx-10 bg-slate-100 text-center md:text-lg sm:text-sm text-sm font-bold outline-none p-2 rounded-xl"
      placeholder={props.placeholder}
      type={props.password ? "password" : ""}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      animate={props.animate?.animate}
      initial={props.animate?.initial}
    />
  );
}

export default Input;
