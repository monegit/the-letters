import { ReactElement, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import PageItem from "../../components/write/PageItem";
import { useEffect } from "react";
import { useLetterStore } from "../../store/letter/letter";
import Modal from "../../components/Modal";
import WriteExit from "../../components/modal/WriteExit";
import LetterTable from "../../components/write/LetterTable";

function Write() {
  const navigate = useNavigate();
  const pageKey = useRef(0);

  const bodyAnimation = useAnimation();

  const { paragraphContents, name, effectData } = useLetterStore();

  const [pages, setPages] = useState<ReactElement[]>(
    paragraphContents.length === 0
      ? [<PageItem key={`Write/Write/pageIndex:0`} index={0} />]
      : paragraphContents.map((data, index) => {
          return (
            <PageItem
              key={`Write/Write/pageIndex:${++pageKey.current}`}
              index={index}
              paragraphs={data}
            />
          );
        })
  );

  useEffect(() => {
    if (name === "") {
      navigate("/info");
    }
  });

  return (
    <motion.div
      className="flex h-screen md:text-2xl sm:text-base text-base font-bold text-slate-600 md:flex-row sm:flex-col-reverse flex-col-reverse"
      animate={bodyAnimation}
      initial={{ opacity: 0 }}
      onViewportEnter={() => bodyAnimation.start({ opacity: 1 })}
    >
      <div className="flex md:flex-col sm:flex-row flex-row gap-2 md:ml-2 md:my-2 sm:mb-2 sm:mx-2 mb-2 mx-2 bg-slate-300 rounded-md">
        <div className="grid gap-2 overflow-y-scroll p-4">{pages}</div>

        <button
          onClick={() => {
            setPages(
              pages.concat([
                <PageItem
                  key={`Write/Write/pageIndex:${++pageKey.current}`}
                  index={paragraphContents.length}
                />,
              ])
            );

            paragraphContents.push([]);
            effectData.push([]);
          }}
          className="md:w-[70px] md:h-fit sm:w-9 sm:h-[70px] w-9 h-[70px] text-2xl place-self-center bg-slate-500 text-white rounded-full select-none"
        >
          +
        </button>
      </div>

      <Modal content={<WriteExit bodyAnimation={bodyAnimation} />} />
      <div className="flex w-screen flex-col items-center h-screen">
        <div className="flex mt-5 px-3 border-b-2 border-slate-400 w-fit">
          {name}님께 보내는 편지
        </div>
        <div className="grid gap-3">
          <LetterTable animation={bodyAnimation} />
        </div>
      </div>
    </motion.div>
  );
}

export default Write;
