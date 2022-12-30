import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import Paragraph from "../../components/write/ParagraphItem";
import PageItem from "../../components/write/PageItem";
import { useEffect } from "react";
import { letterStore } from "../../store/write/letter";
import { pageStore } from "../../store/write/page";
import Button from "../../components/Button";

// TODO: key error 잡기
const ParagraphItem = (props: {
  content?: string;
  pageIndex: number;
  paragraphIndex: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) => {
  const { paragraphList } = letterStore();

  return (
    <Paragraph
      content={props.content}
      onChange={(e) => {
        paragraphList[props.pageIndex][props.paragraphIndex] = e.target.value;
      }}
      onKeyDown={props.onKeyDown}
    />
  );
};

const LetterPanel = (props: { animation: AnimationControls }) => {
  const [paragraph, setParagraph] = useState<ReactElement[]>([]);
  const { selectedPageIndex } = pageStore();
  const { paragraphList } = letterStore();
  const navigate = useNavigate();

  useEffect(() => {
    /** 문단 초기화 */
    const paragraphContents =
      paragraphList[selectedPageIndex].length === 0
        ? [
            <ParagraphItem
              key={`Write/LetterPanel/pageIndex:${selectedPageIndex}&paragraphIndex:${0}`}
              pageIndex={selectedPageIndex}
              paragraphIndex={0}
            />,
          ]
        : paragraphList[selectedPageIndex].map((paragraph, index) => (
            <ParagraphItem
              key={`Write/LetterPanel/pageIndex:${selectedPageIndex}&paragraphIndex:${
                index + 1
              }`}
              content={paragraph}
              pageIndex={selectedPageIndex}
              paragraphIndex={index}
            />
          ));

    setParagraph(paragraphContents);
  }, [paragraphList, selectedPageIndex]);

  return (
    <div className="grid gap-3 md:text-lg sm:text-sm text-sm">
      <div className="grid p-6 gap-3">{paragraph}</div>
      <div className="flex gap-2 justify-center">
        <Button
          content="문단 추가"
          onClick={() => {
            if (paragraph.length >= 6) return;
            setParagraph(
              paragraph.concat(
                <ParagraphItem
                  key={`Write/LetterPanel/pageIndex:${selectedPageIndex}&paragraphIndex:${paragraph.length}`}
                  pageIndex={selectedPageIndex}
                  paragraphIndex={paragraph.length}
                  onKeyDown={(e) => {
                    // if(e.key==="Backspace")
                  }}
                />
              )
            );
          }}
        />
        <Button
          content="작성 점검"
          background="bg-emerald-500"
          onClick={() => {
            props.animation.start({ opacity: 0 }).then(() => {
              navigate("../read");
            });
          }}
        />
        <Button
          background="bg-rose-500"
          content="작성 중단"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

function Write() {
  const navigate = useNavigate();
  const bodyAnimation = useAnimation();
  const { paragraphList, name } = letterStore();
  const [pages, setPages] = useState<ReactElement[]>(
    paragraphList.length === 0
      ? [<PageItem key={`Write/Write/pageIndex:0`} index={0} />]
      : paragraphList.map((data, index) => {
          return (
            <PageItem
              key={`Write/Write/pageIndex:${index}`}
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
      <div className="flex md:flex-col sm:flex-row flex-row gap-2 md:ml-2 md:my-2 sm:mb-2 sm:mx-2 mb-2 mx-2 bg-slate-300 p-4 rounded-md">
        {pages}

        <button
          onClick={() => {
            setPages(
              pages.concat([
                <PageItem
                  key={`Write/Write/pageIndex:${paragraphList.length}`}
                  index={paragraphList.length}
                />,
              ])
            );

            paragraphList.push([]);
          }}
          className="md:w-[70px] md:h-fit sm:w-9 sm:h-[70px] w-9 h-[70px] text-2xl place-self-center bg-slate-500 text-white rounded-full"
        >
          +
        </button>
      </div>
      <div className="flex w-screen flex-col items-center h-screen">
        <div className="flex mt-5 px-3 border-b-2 border-slate-400 w-fit">
          {name}님께 보내는 편지
        </div>
        <div className="grid gap-3">
          <LetterPanel animation={bodyAnimation} />
        </div>
      </div>
    </motion.div>
  );
}

export default Write;
