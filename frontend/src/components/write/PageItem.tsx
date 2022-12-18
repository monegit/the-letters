import { motion, useAnimation } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { letterStore } from "../../store/write/letter";

function PageIndex(props: { pageIndex: number; paragraphs?: string[] }) {
  const navigate = useNavigate();
  const itemAnimation = useAnimation();
  const { paragraphs } = letterStore();
  const [paragraphsData, setParagraphsData] = useState([""]);
  const [paragraphItemList, setParagraphItemList] = useState<ReactElement[]>(
    []
  );
  const sp = new URLSearchParams();

  useEffect(() => {
    setParagraphsData(paragraphs[props.pageIndex]);
    setParagraphItemList(
      paragraphsData?.map((p, index) => (
        <div className="text-center" key={`${props.pageIndex}${index}`}>
          <div key={`${props.pageIndex}${p}${index}`}>{p}</div>
        </div>
      ))
    );
  }, [paragraphsData, paragraphItemList, paragraphs, props.pageIndex]);

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
        paragraphsData?.forEach((p, index) => {
          sp.append(index.toString(), p);
        });
        navigate(`?page=${props.pageIndex}&${sp.toString()}`);
      }}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        {paragraphItemList}
      </div>
    </motion.div>
  );
}

export default PageIndex;
