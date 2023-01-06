import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useModalStore } from "../store/modal/modal";

function Modal(props: { content: ReactNode }) {
  const modalAnimation = useAnimation();
  const backgroundAnimation = useAnimation();
  const contentAnimation = useAnimation();

  const { isVisible } = useModalStore();

  useEffect(() => {
    if (isVisible) {
      modalAnimation.set({ display: "grid" });
      modalAnimation.start({ opacity: 1, transition: { duration: 0.15 } });
    } else {
      modalAnimation
        .start({ opacity: 0, transition: { duration: 0.15 } })
        .then(() => {
          modalAnimation.set({ display: "none" });
          useModalStore.setState({ isVisible: false });
        });
    }
  }, [isVisible, modalAnimation]);

  return (
    <motion.div
      className="grid absolute w-full h-screen z-10"
      initial={{ opacity: 0, display: "none" }}
      animate={modalAnimation}
    >
      <motion.div
        className="place-self-center bg-slate-50 z-10 shadow-xl p-14 rounded-xl"
        animate={contentAnimation}
      >
        {props.content}
      </motion.div>
      <motion.div
        className="absolute w-full h-full bg-gray-800/50"
        animate={backgroundAnimation}
        onTap={() => {
          modalAnimation
            .start({ opacity: 0, transition: { duration: 0.15 } })
            .then(() => {
              modalAnimation.set({ display: "none" });
              useModalStore.setState({ isVisible: false });
            });
        }}
      />
    </motion.div>
  );
}

export default Modal;
