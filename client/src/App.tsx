import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col text-center gap-3 bg-background">
        <button className="text-foreground" onClick={() => setCount((count) => count + 1)}>
          up
        </button>
        <p>
          {count}
        </p>
        <button className="bg-red-100" onClick={() => setCount((count) => count - 1)}>
          down
        </button>
      </div>
    </>
  );
}

export default App;
