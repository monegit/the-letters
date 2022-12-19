import React, { ReactElement, useState } from "react";
import { letterStore } from "../../store/write/letter";
import { motion, useAnimation } from "framer-motion";

const ParagraphItem = (props: { content: string }) => {
  const paragraphAnimation = useAnimation();

  return (
    <motion.div
      className="text-center font-bold text-slate-600"
      animate={paragraphAnimation}
      initial={{ opacity: 0 }}
      key={props.content}
      onViewportEnter={() => paragraphAnimation.start({ opacity: 1 })}
    >
      {props.content}
    </motion.div>
  );
};

function Read() {
  const { paragraphList } = letterStore();
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const paragraphContents = paragraphList.map((p) => {
    return p;
  });
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    []
  );

  return (
    <motion.div
      className="grid w-screen h-screen cursor-pointer place-content-center md:text-2xl sm:text-base text-base"
      onTap={() => {
        setParagraphItemList(
          paragraphItemList.concat(
            <ParagraphItem content={paragraphContents[0][paragraphIndex]} />
          )
        );
        setParagraphIndex(paragraphIndex + 1);
      }}
    >
      <div className="flex flex-col gap-4">{paragraphItemList}</div>
    </motion.div>
  );
}

export default Read;
