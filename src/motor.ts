import { Carta, Tablero } from "./model";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas.sort(() => Math.random() - 0.5);
};

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    tablero.cartas[indice].encontrada ||
    tablero.indiceCartaVolteadaB !== undefined
  ) {
    return false;
  }
  return true;
};

const mostrarTextoInformativo = (texto: string, card: HTMLElement): void => {
  const tooltipDiv = card.appendChild(document.createElement("div"));
  const tooltipSpan = tooltipDiv.appendChild(document.createElement("span"));

  tooltipDiv.className = "tooltip";
  tooltipSpan.className = "tooltiptext";
  tooltipSpan.innerText = texto;
  setTimeout(() => {
    tooltipDiv.remove();
  }, 1500);
};

const voltearLaCarta = (
  tablero: Tablero,
  indice: number,
  card: HTMLElement
): void => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    tablero.cartas[indice].estaVuelta = true;
    if (tablero.indiceCartaVolteadaA === undefined) {
      tablero.indiceCartaVolteadaA = indice;
    } else if (tablero.indiceCartaVolteadaA !== indice) {
      tablero.indiceCartaVolteadaB = indice;
    } else {
      mostrarTextoInformativo("Esta carta ya está volteada", card);
    }
    mostrarImagen(tablero, card, indice);
    animacionMostrarCarta(card);
  } else {
    mostrarTextoInformativo("Esta carta ya está volteada", card);
  }
};

const animacionMostrarCarta = (card: HTMLElement): void => {
  const image = card.querySelector("img");
  if (image) {
    image.style.transform = "rotateY(180deg)";
  }
};

const mostrarImagen = (
  tablero: Tablero,
  card: HTMLElement,
  indice: number
): void => {
  const image = card.querySelector("img");
  if (image) {
    image.src = tablero.cartas[indice].imagen;
  }
};

const ocultarImagen = (indiceA: number, indiceB: number): void => {
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

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";
  }
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "PartidaNoIniciada";
  tablero.cartas.forEach((_, index) => {
    const card = document.getElementById(`image-container-${index}`);
    if (card && card instanceof HTMLElement) {
      card.addEventListener("click", () => {
        voltearLaCarta(tablero, index, card);
        if (
          tablero.indiceCartaVolteadaA !== undefined &&
          tablero.indiceCartaVolteadaB !== undefined
        ) {
          if (
            sonPareja(
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB,
              tablero
            )
          ) {
            parejaEncontrada(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );
          } else {
            parejaNoEncontrada(
              tablero,
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );
            ocultarImagen(
              tablero.indiceCartaVolteadaA,
              tablero.indiceCartaVolteadaB
            );
          }
          tablero.indiceCartaVolteadaA = undefined;
          tablero.indiceCartaVolteadaB = undefined;
        }
      });
    }
  });
};
