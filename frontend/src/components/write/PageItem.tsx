import { motion, useAnimation } from "framer-motion";
import { ReactElement, useEffect, useMemo } from "react";
import { useState } from "react";
import { letterStore } from "../../store/write/letter";
import { pageStore } from "../../store/write/page";

const PageParagraphItem = (props: {
  paragraph: string;
  pageIndex: number;
  paragraphIndex: number;
}) => {
  return (
    <div
      className="text-center"
      key={`write/PageItem/pageIndex:${props.pageIndex}&paragraphIndex:${props.paragraphIndex}`}
    >
      <div
        key={`write/PageItem/PageParagraphItem/pageIndex:${props.pageIndex}&paragraphIndex:${props.paragraphIndex}`}
      >
        {props.paragraph}
      </div>
    </div>
  );
};

function PageItem(props: { index: number; paragraphs?: string[] }) {
  const itemAnimation = useAnimation();
  const { paragraphList } = letterStore();
  const [paragraphsData, setParagraphsData] = useState([""]);
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    paragraphList.length === 0
      ? []
      : paragraphList[props.index]?.map((data, index) => (
          <PageParagraphItem
            paragraph={data}
            pageIndex={props.index}
            paragraphIndex={index}
          />
        ))
  );

  const { setPageIndex } = pageStore();

  useEffect(() => {
    // keydown 할때마다 상태관리 정보 갱신
    function handlekeydownEvent() {
      setParagraphsData(paragraphList[props.index]);
      setParagraphItemList(
        paragraphsData?.map((data, index) => (
          <PageParagraphItem
            paragraph={data}
            pageIndex={props.index}
            paragraphIndex={index}
          />
        ))
      );
    }

    document.addEventListener("keyup", handlekeydownEvent);

    return () => {
      document.removeEventListener("keyup", handlekeydownEvent);
    };
  }, [paragraphsData, paragraphItemList, paragraphList, props.index]);

  return (
    <motion.div
      className="grid relative w-[130px] h-[160px] bg-white rounded-md place-content-center text-[6px] leading-relaxed cursor-pointer select-none"
      animate={itemAnimation}
      initial={{ bottom: 10, opacity: 0 }}
      onViewportEnter={() => {
        itemAnimation.start({
          top: 0,
          opacity: 1,
          transition: { duration: 0.3 },
        });
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 },
      }}
      onTap={() => {
        setPageIndex(props.index);
      }}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        {paragraphItemList}
      </div>
    </motion.div>
  );
}

export default PageItem;
