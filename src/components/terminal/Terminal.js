import React from "react";

const Terminal = ({ closeButtonHandler, outPutDetails }) => {
  const formatOutput = () => {
    let resArr = [];
    if (atob(outPutDetails.stdout) !== null) {
      resArr = atob(outPutDetails.stdout)
        .split(/\r?\n/)
        .filter((element) => element)
        .map((element) => (
          <>
            <span>&gt; {element}</span> <br />
          </>
        ));
    }
    return resArr;
  };

  const getOutPut = () => {
    let statusId = outPutDetails?.status?.id;

    if (statusId === 6) {
      return (
        <pre className="px-2 py-1 text-xs text-red-500">
          {atob(outPutDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return <pre className="px-2 py-1 text-xs">{formatOutput()}</pre>;
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 text-xs text-red-500">
          {atob(outPutDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="flex-col bg-white text-slate-600 w-full mb-1 mt-2">
      <div className="flex justify-between px-4 py-2 rounded border border-bg-slate-900">
        <h4 className="text-sm">Output</h4>
        <h4 className="text-sm">
          Status :{" "}
          <span className="bg-gray-300 rounded px-2 font-bold">
            {outPutDetails?.status?.description}
          </span>
        </h4>
        <h4 className="text-sm">
          Memory :{" "}
          <span className="bg-gray-300 rounded px-2 font-bold">
            {outPutDetails?.memory}
          </span>
        </h4>
        <h4 className="text-sm">
          Time :{" "}
          <span className="bg-gray-300 rounded px-2 font-bold">
            {outPutDetails?.time}
          </span>
        </h4>
        <svg
          fill="#475569"
          height="15px"
          width="15px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 512 512"
          className="pt-1 hover:cursor-pointer"
          onClick={closeButtonHandler}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <div className="mb-0 px-4 py-2 text-sm h-44 overflow-y-scroll">
        {getOutPut()}
      </div>
    </div>
  );
};

export default Terminal;
