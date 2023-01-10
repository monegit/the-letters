import { motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useLetterStore } from "../../store/write/letter";
import { usePageStore } from "../../store/write/page";

const PageParagraphItem = (props: {
  paragraph: string;
  pageIndex: number;
  paragraphIndex: number;
}) => {
  return <div className={`text-center`}>{props.paragraph}</div>;
};

function PageItem(props: { index: number; paragraphs?: string[] }) {
  const { paragraphContents } = useLetterStore();
  const { selectedPageIndex } = usePageStore();
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    paragraphContents[props.index]?.map((data, index) => (
      <PageParagraphItem
        key={index}
        paragraph={data}
        pageIndex={props.index}
        paragraphIndex={index}
      />
    ))
  );

  useEffect(() => {
    // keydown 할때마다 상태관리 정보 갱신
    function handlekeydownEvent() {
      paragraphContents[props.index].length === 0
        ? setParagraphItemList([])
        : setParagraphItemList(
            paragraphContents[props.index]?.map((data, index) => (
              <PageParagraphItem
                key={index}
                paragraph={data}
                pageIndex={props.index}
                paragraphIndex={index}
              />
            ))
          );
    }

    document.addEventListener("keydown", handlekeydownEvent);

    return () => {
      document.removeEventListener("keydown", handlekeydownEvent);
    };
  }, [paragraphContents, props.index]);

  return (
    <motion.div
      className={`grid ${
        selectedPageIndex === props.index ? "border-4 border-slate-400" : ""
      } relative w-[130px] h-[160px] bg-white rounded-md place-content-center text-[6px] leading-relaxed cursor-pointer select-none`}
      animate={{
        top: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      }}
      initial={{ bottom: 10, opacity: 0 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 },
      }}
      onClick={() => {
        usePageStore.setState({ selectedPageIndex: props.index });
      }}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        {paragraphItemList}
      </div>
    </motion.div>
  );
}

export default PageItem;
