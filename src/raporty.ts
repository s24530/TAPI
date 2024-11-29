import { Priorytet, Raport } from "./types/raportTypes.js";
//jakis return type
export const generujRaport = <T>(daneRaportu: T, efektywność: number, priorytet: Priorytet): Promise<T & { efektywność: number; priorytet: Priorytet }> => {
    return new Promise((resolve) => {
        resolve({
        efektywność,
        priorytet,
        ...daneRaportu
    })});
}