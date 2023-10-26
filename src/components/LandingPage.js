import React, { useState } from "react";
import NavBar from "./navbar/NavBar";
import CodeEditor from "./editor/CodeEditor";
import Terminal from "./terminal/Terminal";
import { languageOptions } from "../constants/languageOptions";
import axios from "axios";
import Spinner from "./spinner/Spinner";

const LandingPage = () => {
  const [isTerminal, setTerminalOpen] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [height, setHeight] = useState("86vh");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [outPutDetails, setOutPutDetails] = useState(null);

  const findLanguageId = (value) => {
    var langId;
    languageOptions.map((languageObj) => {
      if (languageObj.value === value) {
        langId = languageObj.id;
      }
    });
    return langId;
  };

  const handleCompile = () => {
    console.log(code);
    const formData = {
      language_id: findLanguageId(language),
      source_code: btoa(code),
      stdin: btoa(""),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*", wait: true },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "600d046ef4msh1c8f1c0ab256eb4p1dfa9ejsndbef161b775d",
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        setProcessing(false);
        console.log("response.data", response.data);
        //console.log(atob(response.data.stdout));
        setOutPutDetails(response.data);
        setTerminalOpen(true);
        setHeight("65vh");
      })
      .catch((err) => {
        setProcessing(false);
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
      });
  };

  const codeChangeHandler = (value) => {
    setCode(value);
  };
  const languageHandler = (value) => {
    setLanguage(value);
  };
  const runButtonHandler = () => {
    setTerminalOpen(false);
    setProcessing(true);
    handleCompile();
  };
  const terminalClose = () => {
    setTerminalOpen(false);
    setHeight("86vh");
  };
  return (
    <div className="bg-slate-100 h-screen mb-0">
      {isProcessing && <Spinner />}
      <NavBar
        runButtonHandler={runButtonHandler}
        languageHandler={languageHandler}
      />
      <div className="flex flex-1 flex-col mt-4 mb-0">
        <CodeEditor
          height={height}
          language={language}
          code={code}
          codeChangeHandler={codeChangeHandler}
        />
        {isTerminal && (
          <Terminal
            closeButtonHandler={terminalClose}
            outPutDetails={outPutDetails}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
