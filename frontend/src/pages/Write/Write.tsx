import { ReactElement, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimationControls, motion, useAnimation } from "framer-motion";
import Paragraph from "../../components/write/ParagraphItem";
import PageItem from "../../components/write/PageItem";
import { useEffect } from "react";
import { useLetterStore } from "../../store/write/letter";
import { usePageStore } from "../../store/write/page";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import WriteExit from "../../components/modal/WriteExit";
import { useModalStore } from "../../store/modal/modal";

function Write() {
  const navigate = useNavigate();
  const pageKey = useRef(0);

  const bodyAnimation = useAnimation();

  const { paragraphContents, name, effectData } = useLetterStore();

  const [pages, setPages] = useState<ReactElement[]>(
    paragraphContents.length === 0
      ? [<PageItem key={`Write/Write/pageIndex:0`} index={0} />]
      : paragraphContents.map((data, index) => {
          return (
            <PageItem
              key={`Write/Write/pageIndex:${++pageKey.current}`}
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
      <div className="flex md:flex-col sm:flex-row flex-row gap-2 md:ml-2 md:my-2 sm:mb-2 sm:mx-2 mb-2 mx-2 bg-slate-300 rounded-md">
        <div className="grid gap-2 overflow-y-scroll p-4">{pages}</div>

        <button
          onClick={() => {
            setPages(
              pages.concat([
                <PageItem
                  key={`Write/Write/pageIndex:${++pageKey.current}`}
                  index={paragraphContents.length}
                />,
              ])
            );

            paragraphContents.push([]);
            effectData.push([]);
          }}
          className="md:w-[70px] md:h-fit sm:w-9 sm:h-[70px] w-9 h-[70px] text-2xl place-self-center bg-slate-500 text-white rounded-full select-none"
        >
          +
        </button>
      </div>

      <Modal content={<WriteExit bodyAnimation={bodyAnimation} />} />
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

const ParagraphItem = (props: {
  content?: string;
  pageIndex: number;
  paragraphIndex: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) => {
  const { paragraphContents } = useLetterStore();

  return (
    <Paragraph
      content={props.content}
      onChange={(e) => {
        paragraphContents[props.pageIndex][props.paragraphIndex] =
          e.target.value;
      }}
      onKeyDown={props.onKeyDown}
      index={props.paragraphIndex}
    />
  );
};

const LetterPanel = (props: { animation: AnimationControls }) => {
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
          />,
        ])
      : setParagraphItems(
          paragraphContents[selectedPageIndex].map((paragraph, index) => (
            <ParagraphItem
              key={++paragraphKey.current}
              content={paragraph}
              pageIndex={selectedPageIndex}
              paragraphIndex={index}
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

export default Write;
