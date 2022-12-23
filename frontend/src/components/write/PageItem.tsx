import { motion, useAnimation } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { letterStore } from "../../store/write/letter";
import { pageStore } from "../../store/write/page";

// load되면 상태관리에서 정보 가져오기.

function PageIndex(props: { pageIndex: number; paragraphs?: string[] }) {
  const itemAnimation = useAnimation();
  const { paragraphList } = letterStore();
  const [paragraphsData, setParagraphsData] = useState([""]);
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    []
  );
  const { setPageIndex } = pageStore();
  useEffect(() => {
    function handlekeydownEvent() {
      setParagraphsData(paragraphList[props.pageIndex]);
      setParagraphItemList(
        paragraphsData?.map((p, index) => (
          <div className="text-center" key={`${props.pageIndex}${index}`}>
            <div key={`${props.pageIndex}${p}${index}`}>{p}</div>
          </div>
        ))
      );
    }

    document.addEventListener("keyup", handlekeydownEvent);
    return () => {
      document.removeEventListener("keyup", handlekeydownEvent);
    };
  }, [paragraphsData, paragraphItemList, paragraphList, props.pageIndex]);

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
        setPageIndex(props.pageIndex);
      }}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        {paragraphItemList}
      </div>
    </motion.div>
  );
}

export default PageIndex;
