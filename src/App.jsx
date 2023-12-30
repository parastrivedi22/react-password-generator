import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [allowedNumber, setAllowedNumber] = useState(true);
  const [allowedChar, setAllowedChar] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowedChar) str += "@#$%&";
    if (allowedNumber) str += "1234567890";

    for (let i = 1; i <= length; i++) {
      pwd += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pwd);
  }, [length, allowedChar, allowedNumber, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  }, [password, length]);

  useEffect(() => {
    passwordGenerator();
    setCopied(false);
  }, [length, allowedChar, allowedNumber, passwordGenerator]);

  return (
    <>
      <div className="  bg-white  shadow-md p-20 rounded-lg w-1/2 m-auto">
        {/* display  flied */}
        <div
          style={{ boxShadow: "0 0 10px 1px black" }}
          className="rounded-lg flex items-stretch"
        >
          <input
            className="size-full px-3 py-2  rounded-s-lg  outline-none"
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
          />

          <button
            type="button"
            onClick={() => {
              copyPasswordToClipboard();
            }}
            className=" w-28  rounded-e-md bg-blue-600  
              font-semibold text-white hover:bg-blue-600/80"
          >
            {isCopied == true ? "Copied" : "Copy"}
          </button>
        </div>

        {/* button sestion */}

        <div className="mt-10 flex justify-between">
          <span>
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              id="range"
              onChange={(event) => setLength(event.target.value)}
            />
            <label htmlFor="range"> Length {length}</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="numberAllowed"
              defaultChecked={allowedNumber}
              onChange={() => {
                setAllowedNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberAllowed">Number</label>
          </span>
          <span>
            <input
              type="checkbox"
              id="charAllowed"
              onChange={() => {
                setAllowedChar((prev) => !prev);
              }}
            />
            <label htmlFor="charAllowed">Character</label>
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
