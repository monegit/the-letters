import { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Paragraph from "../../components/write/ParagraphItem";
import PageItem from "../../components/write/PageItem";
import { useEffect } from "react";
import { letterStore } from "../../store/write/letter";
import { pageStore } from "../../store/write/page";

const ParagraphItem = (props: {
  content: string;
  pageIndex: number;
  paragraphIndex: number;
}) => {
  const { paragraphList } = letterStore();

  return (
    <Paragraph
      key={`write/paragraph/${props.pageIndex ?? ""}${props.paragraphIndex}`}
      content={props.content}
      onChange={(e) => {
        paragraphList[props.pageIndex][props.paragraphIndex] = e.target.value;
      }}
    />
  );
};

const LetterPanel = () => {
  const [paragraph, setParagraph] = useState<ReactElement[]>([]);
  const { selectedPageIndex } = pageStore();
  const { paragraphList } = letterStore();

  useEffect(() => {
    /** 문단 초기화 */
    const paragraphContents =
      paragraphList[selectedPageIndex].length === 0
        ? [
            <ParagraphItem
              content={""}
              pageIndex={selectedPageIndex}
              paragraphIndex={0}
            />,
          ]
        : paragraphList[selectedPageIndex].map((paragraph, index) => (
            <ParagraphItem
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
      <button
        className={`bg-slate-500 text-white px-6 py-2 w-fit place-self-center rounded-lg `}
        onClick={() => {
          setParagraph(
            paragraph.concat(
              <ParagraphItem
                content={""}
                pageIndex={selectedPageIndex}
                paragraphIndex={paragraph.length}
              />
            )
          );
        }}
      >
        추가
      </button>
    </div>
  );
};

function Write() {
  const navigate = useNavigate();
  const bodyAnimation = useAnimation();
  const [pages, setPages] = useState<ReactElement[]>([
    <PageItem pageIndex={0} />,
  ]);

  const { paragraphList, name } = letterStore();

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
              pages.concat([<PageItem pageIndex={paragraphList.length} />])
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
          <LetterPanel />
          <Link to={"../read"}>
            <button>dd</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Write;
