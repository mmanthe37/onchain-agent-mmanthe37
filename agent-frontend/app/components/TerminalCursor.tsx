import { useState, useEffect, useRef, useCallback } from "react";

export default function TerminalCursor() {
  const [text, setText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        console.log("Command entered:", text);
        setText("");
      }
    },
    [text]
  );

  return (
    <div
      className="bg-black font-mono text-lg h-64 overflow-auto mt-4"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex">
        <span className="mr-2">$</span>
        <div className="relative flex-grow">
          {text}
          <span
            className={`absolute inset-y-0 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100`}
            style={{ left: `${text.length * 0.61}em` }}
          >
            ▋
          </span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute"
        autoFocus
      />
    </div>
  );
}
