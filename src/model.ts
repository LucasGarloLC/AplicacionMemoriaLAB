type NombreCarta =
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png"
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png"
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png"
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png"
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png"
  | "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png";

interface InfoCarta {
  idFoto: number;
  imagen: NombreCarta;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
  },
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png",
  },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const infoCartasMapped: Carta[] = [];
  infoCartas.map((infoCarta) => {
    const carta = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    infoCartasMapped.push(carta);
    infoCartasMapped.push(carta);
  });
  return infoCartasMapped;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();
