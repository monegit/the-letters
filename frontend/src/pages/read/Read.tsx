import { ReactElement, useEffect, useState } from "react";
import { letterStore } from "../../store/write/letter";
import { motion, useAnimation } from "framer-motion";
import { readStore } from "../../store/read/read";

const ParagraphItem = (props: { paragraph: string }) => {
  const paragraphAnimation = useAnimation();
  const { currentPageIndex, currentParagraphIndex } = readStore();

  return (
    <motion.div
      className="text-center font-bold text-slate-600"
      animate={paragraphAnimation}
      initial={{ opacity: 0, top: 10 }}
      key={`pages/Read/${currentPageIndex},${currentParagraphIndex}`}
      onViewportEnter={() => paragraphAnimation.start({ opacity: 1, top: 0 })}
    >
      {props.paragraph}
    </motion.div>
  );
};

function Read() {
  const nameAnimation = useAnimation();
  const { paragraphList, name } = letterStore();
  const {
    currentPageIndex,
    currentParagraphIndex,
    IncreasePageIndex,
    IncreaseParagraphIndex,
    ResetPageIndex,
    ResetParagraphIndex,
  } = readStore();
  const [enable, setEnable] = useState(false);
  const paragraphContents = paragraphList.map((p) => {
    return p;
  });
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    []
  );

  useEffect(() => {
    ResetPageIndex();
    ResetParagraphIndex();
  }, [ResetPageIndex, ResetParagraphIndex]);

  return (
    //TODO: currentParagraphIndex가 초과되면 애니메이션 적용
    <motion.div
      className="grid w-screen h-screen cursor-pointer place-content-center md:text-2xl sm:text-base text-base"
      onTap={() => {
        if (enable) {
          setParagraphItemList(
            paragraphItemList.concat(
              <ParagraphItem
                paragraph={
                  paragraphContents[currentPageIndex][currentParagraphIndex]
                }
              />
            )
          );

          if (
            paragraphList[currentPageIndex].length === currentParagraphIndex
          ) {
            IncreasePageIndex();
            ResetParagraphIndex();

            setParagraphItemList([]);
          } else {
            IncreaseParagraphIndex();
          }
        }
      }}
    >
      <motion.div
        className="relative md:text-4xl sm:text-2xl text-2xl font-bold"
        animate={nameAnimation}
        initial={{ scale: 0.8, opacity: 0, top: -10 }}
        onViewportEnter={() => {
          nameAnimation
            .start({
              opacity: 1,
              top: 0,
              transition: { duration: 0.5, ease: "circOut" },
            })
            .then(() => {
              nameAnimation
                .start({
                  opacity: 0,
                  top: 10,
                  transition: { duration: 0.5, ease: "circOut", delay: 1.7 },
                })
                .then(() => {
                  setEnable(true);
                  nameAnimation.set({ display: "none" });
                });
            });
        }}
      >
        {name}에게
      </motion.div>
      <motion.div className="flex flex-col gap-4">
        {paragraphItemList}
      </motion.div>
    </motion.div>
  );
}

export default Read;
