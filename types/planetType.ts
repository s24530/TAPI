import { Request, Response } from 'express';


export type Planet = {
    id: number,
    name: string,
    climate: string,
    diameter: number,
    orbitalPeriod: number,
    species: string,
    dayLength: number,
    moons: number[]
    galaxy: number
}

export type PlanetWithLinks  = Planet & {
    links: Link[]
}

export type Link = {
    rel: string,
    method: string,
    href: string
}

export interface RequestWithID extends Request{
    id:string;
}