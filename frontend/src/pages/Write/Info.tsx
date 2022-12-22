import { AnimationControls, motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { letterStore } from "../../store/write/letter";

const Information = (props: { animate: AnimationControls }) => {
  const titleAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const buttonAnimation = useAnimation();
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const { name, setName } = letterStore();

  const examNameList = [
    "내 사랑",
    "어머니",
    "아버지",
    "선생님",
    "단짝친구",
    "아가",
    "공주",
    "사랑하는 딸",
    "사랑하는 아들",
    "홍길동",
    "박종원",
  ];

  function Submit() {
    if (name !== "") {
      props.animate.start({ opacity: 0 }).then(() => {
        navigate(`/write/`);
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
      <motion.input
        className="relative mx-10 bg-slate-100 text-center md:text-lg sm:text-sm text-sm font-bold outline-none p-2 rounded-xl"
        layout
        placeholder={
          examNameList[Math.floor(Math.random() * examNameList.length)]
        }
        onChange={(value) => {
          // setName(value.target.value);
          setName(value.target.value);
        }}
        animate={inputAnimation}
        initial={{ left: 0, opacity: 0, visibility: "collapse", top: 10 }}
        onKeyDown={(key) => {
          if (key.key === "Enter") Submit();
        }}
      ></motion.input>
      <motion.button
        className="relative w-fit justify-self-center md:text-lg sm:text-sm text-sm bg-slate-200 p-2 px-8 rounded-xl font-bold"
        animate={buttonAnimation}
        initial={{ opacity: 0, visibility: "collapse", top: 10 }}
        onClick={() => {
          Submit();
        }}
      >
        확인
      </motion.button>
    </motion.div>
  );
};

function InfoForm() {
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

export default InfoForm;
