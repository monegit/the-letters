import { AnimationControls, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/main/Button";
import OpenLetterItem from "../components/main/OpenLetterItem";
import { motion } from "framer-motion";

const Table = (props: { bodyAnimation: AnimationControls }) => {
  let navigate = useNavigate();

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
  let bodyAnimation = useAnimation();
  return (
    <motion.div className="flex flex-col items-center" animate={bodyAnimation}>
      <Table bodyAnimation={bodyAnimation} />
      <div>
        <OpenLetterItem />
        <OpenLetterItem />
        <OpenLetterItem />
        <OpenLetterItem />
      </div>
    </motion.div>
  );
}

export default Main;
