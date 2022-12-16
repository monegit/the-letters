import React, { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const LetterPanel = () => {
  const Paragraph = () => {
    const focusAnimation = useAnimation();
    return (
      <div className="">
        <motion.input
          className="outline-none p-2 text-center rounded-xl resize-y overflow-hidden"
          autoFocus
          animate={focusAnimation}
          initial={{
            background: "rgb(241,245,249)",
            color: "rgb(100,116,139)",
          }}
          onFocus={(event) => {
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
          // whileFocus={{
          //   background: "rgb(226,232,240)",
          //   color: "rgb(71,85,105)",
          //   scale: 1.1,
          //   transition: { duration: 0.2 },
          // }}
          onKeyDown={(key) => {
            if (key.key === "Enter") {
              // if (key.key==="Backspace"){
              // setParagraph(paragraph.)
              // }
            }
          }}
        ></motion.input>
      </div>
    );
  };

  const [paragraph, setParagraph] = useState<ReactElement[]>([<Paragraph />]);

  return (
    <div
      id="paragraph-panel"
      className="grid gap-3 w-screen justify-center md:text-lg sm:text-sm text-sm"
    >
      {paragraph}
      <button
        onClick={() => {
          setParagraph(paragraph.concat(<Paragraph key={paragraph.length} />));
        }}
      >
        추가
      </button>
    </div>
  );
};

function Write() {
  const location = useParams();
  const bodyAnimation = useAnimation();

  return (
    <motion.div
      className="grid md:text-2xl sm:text-base text-base font-bold text-slate-600 justify-center h-screen place-items-center w-full"
      animate={bodyAnimation}
      initial={{ opacity: 0 }}
      onViewportEnter={() => bodyAnimation.start({ opacity: 1 })}
    >
      <div className="grid w-screen gap-3">
        <div className="w-fit px-3 border-b-2 border-slate-300 place-self-center">
          {location.name}님께 보내는 편지
        </div>
        <LetterPanel />
      </div>
    </motion.div>
  );
}

export default Write;
