import { motion, useAnimation } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useLetterStore } from "../../store/write/letter";
import { usePageStore } from "../../store/write/page";

const PageParagraphItem = (props: {
  paragraph: string;
  pageIndex: number;
  paragraphIndex: number;
}) => {
  return <div className="text-center">{props.paragraph}</div>;
};

function PageItem(props: { index: number; paragraphs?: string[] }) {
  const itemAnimation = useAnimation();
  const { paragraphContents } = useLetterStore();
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    paragraphContents.length === 0
      ? []
      : paragraphContents[props.index]?.map((data, index) => (
          <PageParagraphItem
            key={`write/PageItem/pageIndex:${props.index}&paragraphIndex:${index}`}
            paragraph={data}
            pageIndex={props.index}
            paragraphIndex={index}
          />
        ))
  );

  const { setPageIndex } = usePageStore();

  useEffect(() => {
    // keydown 할때마다 상태관리 정보 갱신
    function handlekeydownEvent() {
      setParagraphItemList(
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

    document.addEventListener("keyup", handlekeydownEvent);

    return () => {
      document.removeEventListener("keyup", handlekeydownEvent);
    };
  }, [paragraphContents, props.index]);

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
