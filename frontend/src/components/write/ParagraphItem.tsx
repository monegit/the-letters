import { motion, useAnimation } from "framer-motion";
import React from "react";

interface ParagraphContent {
  content?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = (props: ParagraphContent) => {
  const focusAnimation = useAnimation();

  return (
    <motion.input
      className="outline-none resize-none text-center p-2 text-clip rounded-xl"
      autoFocus
      animate={focusAnimation}
      initial={{
        background: "rgb(241,245,249)",
        color: "rgb(100,116,139)",
      }}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      onFocus={() => {
        focusAnimation.start({
          background: "rgb(226,232,240)",
          color: "rgb(71,85,105)",
          scale: 1.1,
          transition: { duration: 0.2 },
        });
      }}
      onBlur={() => {
        focusAnimation.start({
          background: "rgb(241,245,249)",
          color: "rgb(100,116,139)",
          scale: 1,
          transition: { duration: 0.2 },
        });
      }}
      defaultValue={props.content}
    />
  );
};

const ParagraphItem = (props: ParagraphContent) => {
  return (
    <div className="h-max">
      <Input content={props.content ?? ""} onChange={props.onChange} />
    </div>
  );
};

export default ParagraphItem;
