export interface Driver {
  id: number;
  name: string;
  description: string;
  car: string;
  assessment: number;
  rate: number;
  kmMin: number;
  createdAt: Date;
}

const drivers: Driver[] = [
  {
    id: 1,
    name: "Homer Simpson",
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    car: "Plymouth Valiant 1973 rosa e enferrujado",
    assessment: 2,
    rate: 2.5,
    kmMin: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    car: "Dodge Charger R/T 1970 modificado",
    assessment: 4,
    rate: 5,
    kmMin: 5,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem. ",
    car: "Aston Martin DB5 clássico",
    assessment: 5,
    rate: 10,
    kmMin: 10,
    createdAt: new Date(),
  },
];

export default drivers;
