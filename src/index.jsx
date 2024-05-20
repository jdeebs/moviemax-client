import { createRoot } from "react-dom/client";

// Import statement to indicate that you need to bundle "./index.scss"
import "./index.scss";

// Main component (will eventually use all the others)
const MovieMaxApplication = () => {
  return (
    <div className="moviemax">
      <div>Good morning</div>
    </div>
  );
};

// Find the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell React to render the app in the root DOM element
root.render(<MovieMaxApplication />);
