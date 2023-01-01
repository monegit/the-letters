import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useModalStore } from "../store/modal/modal";

function Modal(props: { content: ReactNode }) {
  const modalAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const contentAnimation = useAnimation();

  const { isVisible, setVisible } = useModalStore();

  useEffect(() => {
    if (isVisible) {
      modalAnimation.set({ display: "grid" });
      modalAnimation.start({ opacity: 1, transition: { duration: 0.2 } });
    }
  }, [isVisible, modalAnimation]);

  return (
    <motion.div
      className="grid absolute w-full h-full"
      initial={{ opacity: 0, display: "none" }}
      animate={modalAnimation}
    >
      <motion.div
        className="place-self-center bg-slate-50 z-10 shadow-xl p-5 rounded-xl"
        animate={contentAnimation}
      >
        {props.content}
      </motion.div>
      <motion.div
        className="absolute w-full h-full bg-gray-800/50"
        animate={backgroundAnimation}
        onTap={() => {
          modalAnimation.start({ opacity: 0 }).then(() => {
            modalAnimation.set({ display: "none" });
            setVisible(false);
          });
        }}
      />
    </motion.div>
  );
}

export default Modal;