import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClunkyTodoList } from "./ClunkyTodoList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClunkyTodoList />
  </StrictMode>
);
