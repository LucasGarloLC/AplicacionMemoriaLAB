import { Carta, Tablero } from "./model";
import { animacionMostrarCarta, esPartidaCompleta, mostrarImagen, mostrarTextoInformativo, ocultarImagen, sePuedeVoltearLaCarta } from "./ui";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  return cartas.sort(() => Math.random() - 0.5);
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

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
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

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
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
