import { dodajNowegoPracownika, dodajPracownika, dodajPracownikówZListy, zwolnijPracownika } from "./pracownicy.js";
import { generujRaport } from "./raporty.js";
import { Pracownik, Stanowisko, Waluta } from "./types/pracownikTypes.js";
import { Priorytet } from "./types/raportTypes.js";

export const listaPracowników: Pracownik[] = [];

const paniBasia = {
    id: 0,
    imie: "Basia",
    nazwisko: "Kowalska",
    stanowisko: Stanowisko["pani basia"],
    pensja: [500, 1] as [number, Waluta],
    graNaSkrzypcach: "pięknie",
    bezNiejTenZakładUpadnie: true
}

const uruchomDzieńPracy = async () => {
    dodajNowegoPracownika("Jan", "Kowalski", Stanowisko["podbutnik"], /* ?? ---> */ 0);
    dodajPracownikówZListy();
    dodajPracownika(paniBasia);
    zwolnijPracownika([0, 1]);

    const efektyPracy = {
        obniżonaEfektywność: true,
        spadekPensji: 1000
    };
    const raportPracownika = generujRaport(efektyPracy, 0, Priorytet["brak"]);
    const raportPracowników = generujRaport({
        0: efektyPracy,
        1: efektyPracy
    }, 0, Priorytet["brak"]);
    const raportPieseczka = await generujRaport({szczekanie: true, isPies: true, aKtoToJestTakimSłodkimPieseczkiem: true}, 0, Priorytet["brak"]);

    if(raportPieseczka.isPies){
        console.log("Dobra psinka!");
    }
}

uruchomDzieńPracy();