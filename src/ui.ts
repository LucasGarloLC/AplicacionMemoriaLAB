import "./style.css";
import { tablero } from "./model";
import { iniciaPartida } from "./motor";

const start = document.getElementById("start");
if (start && start instanceof HTMLElement) {
  start.addEventListener("click", () => {
    iniciaPartida(tablero);
  });
}
