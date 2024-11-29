export type Raport = {
    efektywność: number;
    priorytet: Priorytet;
}

type RaportPracownika = {
    obniżonaEfektywność: boolean;
    spadekPensji: number;
}

type RaportPracowników = {
    id: RaportPracownika;
}

type RaportPieseczka = {
    szczekanie: true;
    isPies: true;
    aKtoToJestTakimSłodkimPieseczkiem: true;
}

export enum Priorytet{
    "brak",
    "na kiedyś",
    "jak się upomną"
}