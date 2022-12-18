import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { letterStore } from "../../store/write/letter";

function PageIndex(props: { pageIndex: number; paragraphs?: string[] }) {
  const navigate = useNavigate();
  const itemAnimation = useAnimation();
  const sp = new URLSearchParams();
  const { paragraphs } = letterStore();
  //TODO: 실시간으로 바뀌게 변경
  const [displayParagraphs, setDisplayParagraphs] = useState([""]);

  useEffect(() => {
    setDisplayParagraphs(paragraphs[props.pageIndex]);
  }, [paragraphs, props.pageIndex]);
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
        displayParagraphs?.forEach((p, index) => {
          sp.append(index.toString(), p);
        });
        navigate(`?page=${props.pageIndex}&${sp.toString()}`);
      }}
    >
      <div className="flex flex-col gap-2 overflow-hidden">
        {displayParagraphs?.map((p, index) => (
          <div className="text-center" key={`${props.pageIndex}${index}`}>
            <div key={`${props.pageIndex}${p}${index}`}>{p}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default PageIndex;
