import axios from "axios";
import {
  animate,
  AnimationControls,
  motion,
  useAnimation,
} from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useLetterStore } from "../../store/letter/letter";

const Information = (props: { animate: AnimationControls }) => {
  const titleAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const buttonAnimation = useAnimation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function Submit() {
    if (name !== "") {
      props.animate.start({ opacity: 0 }).then(() => {
        useLetterStore.setState({ isPreview: true });
        axios.get(
          `http://localhost:3001/letter/receive?name=${name}&password=${password}`
        );
        // .then((data) => useLetterStore.setState({}) (data.data.data));
        // navigate(`/read/`);
      });
    } else {
      inputAnimation.set({ left: 10 });
      inputAnimation.start({
        left: 0,
        transition: { duration: 0.1, type: "spring", damping: 20 },
      });
    }
  }

  return (
    <motion.div
      className="grid gap-5 text-slate-600"
      onViewportEnter={() => {
        titleAnimation
          .start({
            opacity: 1,
            visibility: "visible",
            top: 0,
            transition: { duration: 0.5 },
          })
          .then(() => {
            inputAnimation
              .start({
                opacity: 1,
                visibility: "visible",
                top: 0,
                transition: { duration: 0.3 },
              })
              .then(() => {
                buttonAnimation.start({
                  opacity: 1,
                  visibility: "visible",
                  top: 0,
                  transition: { duration: 0.3 },
                });
              });
          });
      }}
    >
      <motion.div
        className="relative md:text-2xl text-center sm:text-base text-base font-bold"
        animate={titleAnimation}
        initial={{ opacity: 0, visibility: "collapse", top: 10 }}
      >
        보내고자 하는 사람의 이름 혹은 애칭을 입력해주세요
      </motion.div>
      <Input
        placeholder={"이름"}
        onChange={(value) => {
          setName(value.target.value);
        }}
        animate={{
          animate: inputAnimation,
          initial: { left: 0, opacity: 0, visibility: "collapse", top: 10 },
        }}
        onKeyDown={(key) => {
          if (key.key === "Enter") Submit();
        }}
      />
      <Input
        placeholder={"비밀번호"}
        password
        onChange={(value) => {
          setPassword(value.target.value);
        }}
        animate={{
          animate: inputAnimation,
          initial: { left: 0, opacity: 0, visibility: "collapse", top: 10 },
        }}
        onKeyDown={(key) => {
          if (key.key === "Enter") Submit();
        }}
      />
      <Button
        content={"확인"}
        animate={{
          animate: buttonAnimation,
          initial: { opacity: 0, visibility: "collapse", top: 10 },
        }}
        onClick={() => {
          Submit();
        }}
      />
    </motion.div>
  );
};

function Info() {
  const bodyAnimation = useAnimation();
  return (
    <motion.div
      className="grid place-items-center h-screen"
      animate={bodyAnimation}
    >
      <Information animate={bodyAnimation} />
    </motion.div>
  );
}

export default Info;
