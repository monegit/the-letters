import { ReactElement, useState } from "react";
import { useLetterStore } from "../../store/letter/letter";
import { motion, useAnimation } from "framer-motion";
import { ParagraphItem } from "../../components/read/ParagraphItem";
import Button from "../../components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Read() {
  const nameAnimation = useAnimation();
  const paragraphAnimation = useAnimation();
  const exitAnimation = useAnimation();
  const bodyAnimation = useAnimation();

  const { name, isPreview, contents } = useLetterStore();

  const [enable, setEnable] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const navigate = useNavigate();

  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    []
  );

  function init() {
    nameAnimation.set({ display: "block" });
    nameAnimation
      .start({
        opacity: 1,
        top: 0,
        transition: { duration: 0.5, ease: "circOut" },
      })
      .then(() => {
        setEnable(false);
        nameAnimation
          .start({
            opacity: 0,
            top: 10,
            transition: { duration: 0.5, ease: "circOut", delay: 1.7 },
          })
          .then(() => {
            setEnable(true);
            nameAnimation.set({ display: "none", opacity: 0 });
            setCurrentPageIndex(0);
            setCurrentParagraphIndex(0);
          });
      });
  }

  return (
    <motion.div
      className="grid w-screen h-screen select-none cursor-pointer place-content-center md:text-2xl sm:text-base text-base"
      animate={bodyAnimation}
      onTap={() => {
        if (!enable) return;

        console.log(contents);

        // currentParagraphIndex 증가
        setCurrentParagraphIndex(currentParagraphIndex + 1);

        // 문장 추가
        if (contents[currentPageIndex].length - 1 >= currentParagraphIndex) {
          setParagraphItemList(
            paragraphItemList.concat(
              <ParagraphItem
                key={`${currentPageIndex}${currentParagraphIndex}`}
                paragraph={
                  contents[currentPageIndex][currentParagraphIndex].paragraph
                }
              />
            )
          );
        }

        // 페이지의 문장이 모두 출력되면 page 초기화
        if (contents[currentPageIndex].length <= currentParagraphIndex) {
          paragraphAnimation
            .start({ opacity: 0 })
            .then(() => {
              setEnable(false);
              setCurrentPageIndex(currentPageIndex + 1);
              setCurrentParagraphIndex(0);

              setParagraphItemList([]);
            })
            .then(() => {
              setEnable(true);
              paragraphAnimation.set({ opacity: 1 });
            })
            .then(() => {
              // currentPageIndex, currentParagraphIndex가 끝에 도달했을때
              if (
                contents.length - 1 === currentPageIndex &&
                contents[contents.length - 1].length === currentParagraphIndex
              ) {
                exitAnimation.set({
                  display: "flex",
                  opacity: 0,
                });
                exitAnimation.start({ opacity: 1, transition: { delay: 0.3 } });
              }
            });
        }
      }}
    >
      <motion.div
        className="relative md:text-4xl sm:text-2xl text-2xl font-bold"
        animate={nameAnimation}
        initial={{ top: -10 }}
        onViewportEnter={() => {
          init();
        }}
      >
        {name}에게
      </motion.div>
      <motion.div animate={paragraphAnimation} className="flex flex-col gap-4">
        {paragraphItemList}
      </motion.div>
      <motion.div
        animate={exitAnimation}
        initial={{ display: "none" }}
        className="flex flex-col gap-5 items-center"
      >
        <span className="font-bold md:text-3xl sm:text-xl text-xl">
          모든 편지 내용을 읽으셨습니다
        </span>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex gap-4 justify-center">
              <Button
                isVisible={isPreview}
                content={"계속 작성"}
                background="bg-emerald-500"
                onClick={() => {
                  bodyAnimation.start({ opacity: 0 }).then(() => {
                    navigate("../Write");
                  });
                }}
              />

              <Button
                isVisible={isPreview}
                content={"작성 완료"}
                background="bg-rose-500"
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post("http://localhost:3001/letter/send", {
                      name: name,
                      data: contents,
                    })
                    .then((body) => {
                      console.log(body);
                    });
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex gap-4 justify-center">
              <Button
                content={"다시 읽기"}
                background="bg-sky-500"
                onClick={() => {
                  exitAnimation.start({ opacity: 0 }).then(() => {
                    exitAnimation.set({ display: "none" });
                    nameAnimation.set({ opacity: 0, top: -10 });
                    init();
                  });
                }}
              />
              <Button
                isVisible={!isPreview}
                content={"읽기 종료"}
                background="bg-rose-500"
                onClick={() => {
                  exitAnimation.start({ opacity: 0 }).then(() => {
                    navigate("/");
                  });
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Read;
