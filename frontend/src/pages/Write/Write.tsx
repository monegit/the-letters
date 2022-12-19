import { ReactElement, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Paragraph from "../../components/write/ParagraphItem";
import PageItem from "../../components/write/PageItem";
import { useEffect } from "react";
import { useMemo } from "react";
import { letterStore } from "../../store/write/letter";

const ParagraphItem = (props: {
  content: string;
  pageIndex: number;
  paragraphIndex: number;
}) => {
  const { paragraphList } = letterStore();

  return (
    <Paragraph
      key={`paragraph${props.pageIndex ?? ""}${props.paragraphIndex}`}
      content={props.content}
      onChange={(e) => {
        paragraphList[props.pageIndex][props.paragraphIndex] = e.target.value;
      }}
    />
  );
};

const LetterPanel = () => {
  const [searchParams] = useSearchParams();
  const query = useMemo(() => [...searchParams], [searchParams]);
  const [paragraph, setParagraph] = useState<ReactElement[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(Number(query.at(0)?.[1]));

    /** 문단 초기화 */
    const paragraphList =
      query.length === 1
        ? [
            <ParagraphItem
              content={""}
              pageIndex={pageIndex}
              paragraphIndex={0}
            />,
          ]
        : query
            .slice(1, query.length)
            .map((p, index) => (
              <ParagraphItem
                content={p[1]}
                pageIndex={pageIndex}
                paragraphIndex={index}
              />
            ));

    setParagraph(paragraphList);
  }, [pageIndex, query]);

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
                pageIndex={pageIndex}
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
  const location = useParams();
  const bodyAnimation = useAnimation();
  const [pages, setPages] = useState<ReactElement[]>([
    <PageItem pageIndex={0} />,
  ]);

  let pageIndex = pages.length;

  const { paragraphList } = letterStore();

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
            setPages(pages.concat([<PageItem pageIndex={pageIndex++} />]));

            paragraphList.push([]);
          }}
          className="md:w-[70px] md:h-fit sm:w-9 sm:h-[70px] w-9 h-[70px] text-2xl place-self-center bg-slate-500 text-white rounded-full"
        >
          +
        </button>
      </div>
      <div className="flex w-screen flex-col items-center h-screen">
        <div className="flex mt-5 px-3 border-b-2 border-slate-400 w-fit">
          {location.name}님께 보내는 편지
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
