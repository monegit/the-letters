import { AnimationControls } from "framer-motion";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLetterStore } from "../../store/letter/letter";
import { usePageStore } from "../../store/letter/page";
import { useModalStore } from "../../store/modal/modal";
import Button from "../common/Button";
import ParagraphItem from "./ParagraphItem";

const LetterTable = (props: { animation: AnimationControls }) => {
  const { selectedPageIndex } = usePageStore();
  const { paragraphContents, effectData } = useLetterStore();

  const navigate = useNavigate();
  const paragraphKey = useRef(0);
  const [paragraphItems, setParagraphItems] = useState<ReactElement[]>([]);

  useEffect(() => {
    // 페이지 문단 초기화
    paragraphContents[selectedPageIndex].length === 0
      ? setParagraphItems([
          <ParagraphItem
            key={++paragraphKey.current}
            content={""}
            pageIndex={selectedPageIndex}
            paragraphIndex={0}
            onChange={(e) => {
              paragraphContents[selectedPageIndex][0] = e.target.value;
            }}
          />,
        ])
      : setParagraphItems(
          paragraphContents[selectedPageIndex].map((paragraph, index) => (
            <ParagraphItem
              key={++paragraphKey.current}
              content={paragraph}
              pageIndex={selectedPageIndex}
              paragraphIndex={index}
              onChange={(e) => {
                paragraphContents[selectedPageIndex][index] = e.target.value;
              }}
            />
          ))
        );

    if (paragraphContents[selectedPageIndex].length === 0) {
      paragraphContents[selectedPageIndex].push("");
      useLetterStore.setState({
        paragraphContents: [...paragraphContents],
        effectData: [...effectData],
      });
    }
  }, [effectData, paragraphContents, selectedPageIndex]);

  return (
    <div className="grid gap-3 md:text-lg sm:text-sm text-sm">
      <div className="grid p-6 gap-3">{paragraphItems}</div>
      <div className="flex gap-2 justify-center">
        <Button
          content="문단 추가"
          onClick={() => {
            if (paragraphContents[selectedPageIndex].length >= 6) return;

            paragraphContents[selectedPageIndex].push("");
            effectData[selectedPageIndex].push([]);
            useLetterStore.setState({
              paragraphContents: [...paragraphContents],
              effectData: [...effectData],
            });
          }}
        />
        <Button
          content="편지 점검"
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
          onClick={() => {
            useModalStore.setState({ isVisible: true });
            useLetterStore.setState({ isPreview: false });
          }}
        />
      </div>
    </div>
  );
};

export default LetterTable;
