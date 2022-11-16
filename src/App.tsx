import { Graphviz } from "graphviz-react";
import { fordFulkerson } from "./ford-fulkerson/FordFulkerson";
import { DirectedEdge } from "./ford-fulkerson/DirectedEdge";
import React, { useState } from "react";
import { parse } from "./ford-fulkerson/Parser";

function App() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [dotString, setDotString] = useState<string>();

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (!files) return;
    setSelectedFile(files[0]);
  };

  const handleSubmission = () => {
    if (!selectedFile) return;
    reader.readAsText(selectedFile);
  };

  const reader = new FileReader();

  reader.onerror = () => console.error(reader.error);

  reader.onload = async () => {
    if (!reader.result || reader.result instanceof ArrayBuffer) return;
    const graph = await parse(reader.result);

    fordFulkerson(graph);
    const pred = (e: DirectedEdge) =>
      e.flow > 0 && e.from !== graph.source && e.to !== graph.sink;
    setDotString(graph.generateDOTstring(1, 2, pred, "red", "black"));

    console.log(dotString);
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
      {dotString !== undefined && (
        <Graphviz dot={dotString} options={{ engine: "dot" }} />
      )}
    </div>
  );
}
export default App;
