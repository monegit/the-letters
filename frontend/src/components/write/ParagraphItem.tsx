import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useLetterStore } from "../../store/write/letter";
import { usePageStore } from "../../store/write/page";
import EdgeButton from "./EdgeButton";
import EmojiInput from "./EmojiInput";

interface ParagraphProps {
  content?: string;
  index: number;
  uniqueIndex: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = (props: ParagraphProps) => {
  const focusAnimation = useAnimation();
  const templateAnimation = useAnimation();
  const optionAnimation = useAnimation();

  const { selectedPageIndex } = usePageStore();
  const { paragraphContents } = useLetterStore();

  return (
    <motion.div
      className="flex gap-3 items-center"
      animate={templateAnimation}
      onBlur={() => {
        templateAnimation.start({
          scale: 1,
          transition: { duration: 0.2 },
        });
        focusAnimation.start({
          background: "rgb(241,245,249)",
          color: "rgb(100,116,139)",
          transition: { duration: 0.2 },
        });
        optionAnimation
          .start({
            opacity: 0,
            transition: { duration: 0.2 },
          })
          .then(() => {
            optionAnimation.set({ display: "hidden" });
          });
      }}
      onFocus={() => {
        usePageStore.setState({ selectedParagraphIndex: props.index });

        templateAnimation.start({
          scale: 1.1,
          transition: { duration: 0.2 },
        });
        focusAnimation.start({
          background: "rgb(226,232,240)",
          color: "rgb(71,85,105)",
          transition: { duration: 0.2 },
        });
        optionAnimation.start({
          opacity: 1,
          transition: { duration: 0.2 },
        });
      }}
    >
      <motion.div
        animate={optionAnimation}
        initial={{ opacity: 0, display: "hidden" }}
      >
        <EmojiInput
          pageIndex={selectedPageIndex}
          paragraphIndex={props.index}
        />
      </motion.div>
      <motion.input
        name="paragraphInput"
        className="outline-none resize-none text-center p-2 text-clip rounded-xl"
        autoFocus
        animate={focusAnimation}
        initial={{
          background: "rgb(241,245,249)",
          color: "rgb(100,116,139)",
        }}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        defaultValue={props.content}
      />
      <motion.div
        animate={optionAnimation}
        initial={{ opacity: 0, display: "hidden" }}
      >
        <EdgeButton
          content={"✖︎"}
          onClick={() => {
            paragraphContents[selectedPageIndex].splice(props.index, 1);
            useLetterStore.setState({
              paragraphContents: [...paragraphContents],
            });
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ParagraphItem = (props: ParagraphProps) => {
  return (
    <div className="h-full">
      <Input
        content={props.content ?? ""}
        onChange={props.onChange}
        index={props.index}
        uniqueIndex={props.uniqueIndex}
      />
    </div>
  );
};

export default ParagraphItem;
