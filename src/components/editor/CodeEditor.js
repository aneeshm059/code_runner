import React, { useState, useEffect } from "react";
import { defineTheme } from "../../lib/defineTheme";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {
  const [value, setValue] = useState(props.code);
  const [theme, setTheme] = useState("oceanic-next");
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);
  const handleEditorChange = (value) => {
    setValue(value);
    props.codeChangeHandler(value);
  };
  return (
    <div className="overlay rounded-md overflow-hidden shadow-xl mx-4">
      <Editor
        height={props.height}
        width={`100%`}
        language={props.language}
        theme={theme.value}
        defaultValue="// type your code here"
        value={value}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;
