import pracownicy from "../dane/pracownicy.json" assert { type: "json" };
import { listaPracowników } from "./index.js";
import { Pracownik, Stanowisko, Waluta, Pies } from "./types/pracownikTypes.js";

export const dodajPracownikówZListy = () => {
    (pracownicy as (Pracownik | Pies)[]).forEach((pracownik) => {
        if (!("isPies" in pracownik)) dodajPracownika(pracownik);
    });
};

export const dodajNowegoPracownika = (
    imie: string,
    nazwisko: string,
    stanowisko: Stanowisko,
    pensja: [number, Waluta],
    zwolnij?: (...args: (string | number)[]) => void
) => {
    listaPracowników.push({
        imie,
        nazwisko,
        stanowisko,
        pensja,
        zwolnij,
    } as Pracownik);
};
export const dodajPracownika = (pracownik: Pracownik) => {
    listaPracowników.push(pracownik);
};

export const zwolnijPracownika = (id: number, powody: (string | number)[]) => {
    //odfiltrowac
    const pracownik = listaPracowników.find(
        (pracownik) => pracownik.id === id && pracownik.zwolnij != undefined
    );
    if (!pracownik) {
        console.warn(`Nie znaleziono pracownika z ID ${id}.`);
        return;
    }
    if (typeof pracownik.zwolnij === "function") {
        pracownik.zwolnij(powody);
    } else {
        console.error(`Pracownik z ID ${id} nie ma metody 'zwolnij'.`);
    }
};

const zwolnijGo = (powody: (string | number)[]) => {
    powody.forEach((powód) => {
        console.log("Zwolniono z powodu numer: " + powód);
        console.log("Zwolniono z powodu: " + powód);
        console.log("NIE UDAŁO SIĘ ZWOLNIĆ, ZOSTAJĘ W TYM GRAJDOŁKU!");
    });
};
