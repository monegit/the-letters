import React from "react";

function EmojiInput() {
  return (
    <input
      placeholder="🫥"
      maxLength={1}
      className="bg-stone-100 w-8 h-8 text-sm p-1 text-center rounded-md border border-stone-300"
      onChange={(value) => {
        // FIXME: 숫자 입력 불가능하게 막기
        const emojiRegex = /\p{Emoji}/u;

        if (!emojiRegex.test(value.target.value)) value.target.value = "";
      }}
    ></input>
  );
}

export default EmojiInput;
