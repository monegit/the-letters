import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import EmojiActionItem from "./EmojiActionItem";

interface Props {
  isVisible: boolean;
  isFocus: React.RefObject<HTMLInputElement>;
}

function EmojiActionTemplate(props: Props) {
  return (
    <AnimatePresence>
      {props.isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          onMouseDown={(e) => {
            e.preventDefault();
            if (props.isFocus !== null) props.isFocus.current?.focus();
          }}
          className="absolute w-80 h-52 top-10 -translate-x-1/2 left-4 bg-white border border-slate-200 shadow-round rounded-xl"
        >
          <legend>
            <EmojiActionItem />
            <EmojiActionItem />
            <EmojiActionItem />
            <EmojiActionItem />
            <EmojiActionItem />
            <EmojiActionItem />
          </legend>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmojiActionTemplate;
