import React, { useRef, useState } from "react";
import { useLetterStore } from "../../store/write/letter";
import EmojiActionTemplate from "./EmojiActionTemplate";

interface Props {
  pageIndex: number;
  paragraphIndex: number;
}

function EmojiInput(props: Props) {
  const { effectData } = useLetterStore();
  const [isTemplateVisible, setTemplateVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        name="emojiInput"
        ref={inputRef}
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
      <EmojiActionTemplate
        isFocus={inputRef}
        key={props.paragraphIndex}
        isVisible={isTemplateVisible}
      />
    </div>
  );
}

export default EmojiInput;
