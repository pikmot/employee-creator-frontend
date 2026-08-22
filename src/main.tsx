import { createRoot } from "react-dom/client";
import App from "./App";

import "./scss/_normalize.scss";

// import "./services/LoadData.js";

createRoot(document.getElementById("root")!).render(<App />);
