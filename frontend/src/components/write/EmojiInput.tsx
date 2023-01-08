import { useState } from "react";
import { useLetterStore } from "../../store/write/letter";
import EmojiActionTemplate from "./EmojiActionTemplate";

function EmojiInput(props: { pageIndex: number; paragraphIndex: number }) {
  const { effectData } = useLetterStore();
  const [isTemplateVisible, setTemplateVisible] = useState(false);

  return (
    <div>
      <input
        placeholder="🫥"
        maxLength={1}
        className="bg-stone-100 w-8 h-8 text-sm p-1 text-center rounded-md border border-stone-300 outline-none"
        onChange={(value) => {
          const emojiRegex = /\p{Emoji}/u;
          const decimalRegex = /[0-9]$/;

          if (
            !emojiRegex.test(value.target.value) ||
            decimalRegex.test(value.target.value)
          )
            value.target.value = "";
          effectData[props.pageIndex][props.paragraphIndex] = [
            value.target.value,
          ];
        }}
        defaultValue={effectData[props.pageIndex][props.paragraphIndex] ?? ""}
        onFocus={() => {
          setTemplateVisible(true);
        }}
        onBlur={() => {
          setTemplateVisible(false);
        }}
      />
      <EmojiActionTemplate isVisible={isTemplateVisible} />
    </div>
  );
}

export default EmojiInput;
