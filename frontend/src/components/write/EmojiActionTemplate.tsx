import { AnimatePresence, motion } from "framer-motion";

function EmojiActionTemplate(props: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {props.isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="absolute w-80 h-52 top-10 -translate-x-1/2 left-4 bg-rose-400 shadow-round rounded-xl"
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmojiActionTemplate;
