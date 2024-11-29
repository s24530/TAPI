export type Pracownik = {
    id: number;
    imie: string;
    nazwisko: string;
    stanowisko: Stanowisko;
    pseudonim?: string;
    opis?: string;
    pensja: [number, Waluta];
    zwolnij?: (...args:(string | number)[]) => void;
}

type PaniBasia = {
    graNaSkrzypcach: string;
    bezNiejTenZakładUpadnie: boolean;
} & Pracownik

export type Pies = {
    isPies: boolean;
}

export enum Stanowisko {
    "szef",
    "anetka",
    "pani basia",
    "podbutnik"
}

export enum Waluta {
    Złoty_Polski_Peelen,
    Erło_jedne_niemieckie,
    Dolar_fajny_taki_amerykanski
}