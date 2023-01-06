import { motion } from "framer-motion";
import React from "react";

interface EdgeButtonProps {
  content: string;
  onClick: () => void;
}

function EdgeButton(props: EdgeButtonProps) {
  return (
    <motion.button
      className="w-9 h-9 overflow-hidden bg-rose-500 text-center rounded-md text-white"
      onTap={props.onClick}
    >
      {props.content}
    </motion.button>
  );
}

export default EdgeButton;
