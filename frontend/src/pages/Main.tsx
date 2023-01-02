import { AnimationControls, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/main/Button";
import OpenLetterItem from "../components/main/OpenLetterItem";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import { useModalStore } from "../store/modal/modal";
import { useLetterStore } from "../store/write/letter";
import { useEffect } from "react";

const Table = (props: { bodyAnimation: AnimationControls }) => {
  const navigate = useNavigate();

  const { setInit } = useLetterStore();

  useEffect(() => {
    setInit();
  }, [setInit]);

  return (
    <motion.div className={`grid gap-10 md:grid-flow-col`}>
      <div
        onClick={() => {
          props.bodyAnimation.start({ opacity: 0 }).then(() => {
            return navigate("/info");
          });
        }}
      >
        <Button content="편지 쓰기" icon="memo" />
      </div>
      <div
        onClick={() => {
          return navigate("/read");
        }}
      >
        <Button content="편지 읽기" icon="envelope" />
      </div>
    </motion.div>
  );
};

function Main() {
  const bodyAnimation = useAnimation();
  const { setVisible, isVisible } = useModalStore();

  return (
    <motion.div className="flex flex-col items-center" animate={bodyAnimation}>
      <Modal content={<>asdf</>} />
      <Table bodyAnimation={bodyAnimation} />
      <div>
        <OpenLetterItem />
        <OpenLetterItem />
        <OpenLetterItem />
        <OpenLetterItem />
      </div>
      <button
        onClick={() => {
          setVisible(true);
          console.log(isVisible);
        }}
      >
        asdf
      </button>
    </motion.div>
  );
}

export default Main;
