import "./style.css";
import { Tablero, tablero } from "./model";
import { iniciaPartida, parejaEncontrada, parejaNoEncontrada, sonPareja } from "./motor";

const start = document.getElementById("start");
if (start && start instanceof HTMLElement) {
  start.addEventListener("click", () => {
    iniciaPartida(tablero);
  });
}

export const mostrarTextoInformativo = (texto: string, card: HTMLElement): void => {
  const tooltipDiv = card.appendChild(document.createElement("div"));
  const tooltipSpan = tooltipDiv.appendChild(document.createElement("span"));

  tooltipDiv.className = "tooltip";
  tooltipSpan.className = "tooltiptext";
  tooltipSpan.innerText = texto;
  setTimeout(() => {
    tooltipDiv.remove();
  }, 1500);
};

export const animacionMostrarCarta = (card: HTMLElement): void => {
  const image = card.querySelector("img");
  if (image) {
    image.style.transform = "rotateY(180deg)";
  }
};

export const mostrarImagen = (
  tablero: Tablero,
  card: HTMLElement,
  indice: number
): void => {
  const image = card.querySelector("img");
  if (image) {
    image.src = tablero.cartas[indice].imagen;
  }
};

export const ocultarImagen = (indiceA: number, indiceB: number): void => {
  setTimeout(() => {
    const cardA = document.getElementById(`image-container-${indiceA}`);
    const cardB = document.getElementById(`image-container-${indiceB}`);

    if (cardA) {
      const imageA = cardA.querySelector("img");
      if (imageA) {
        imageA.src = "";
      }
    }
    if (cardB) {
      const imageB = cardB.querySelector("img");
      if (imageB) {
        imageB.src = "";
      }
    }
  }, 1000);
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    tablero.cartas[indice].encontrada ||
    tablero.indiceCartaVolteadaB !== undefined
  ) {
    return false;
  }
  return true;
};
