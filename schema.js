export const typeDefs = `#graphql

    scalar Email

    type Galaxy{
        id: Int!
        name: String
        distance: Float
        size: Int
        mainStar: String
        planets: [Int]!
        createdBy: Email
    }

    type Planet{
        id: Int!
        name: String
        climate: String
        diameter: Int
        orbitalPeriod: Int
        species: String
        dayLength: Float
        moons: [Int]!
        galaxy: Int
        createdBy: Email
    }

    type Moon{
        id: Int!
        name: String
        distanceFromPlanet: Int
        diameter: Int
        orbitalPeriod: Float
        planet: Int!
        createdBy: Email
    }

    input GalaxyInput{
        name: String!
        distance: Float!
        size: Int!
        mainStar: String!
        planets: [Int]!
    }

    input PlanetInput{
        name: String!
        climate: String!
        diameter: Int!
        orbitalPeriod: Int!
        species: String!
        dayLength: Float!
        moons: [Int]!
        galaxy: Int!
    }

    input MoonInput{
        name: String!
        distanceFromPlanet: Int!
        diameter: Int!
        orbitalPeriod: Float!
        planet: Int!
    }

    input FilterInput {
    field: String!
    operation: String! # EQUAL, NOT_EQUAL, CONTAINS, NOT_CONTAINS, GREATER, LESS, etc.
    value: String!
    }

    input SortInput {
        field: String!
        order: String! # ASC or DESC
    }

    input PageInput {
        limit: Int!
        offset: Int!
    }

    type DeleteResponse{
        success: Boolean!
        message: String
        code: String!
    }

    type ErrorResponse{
        message: String
        code: String
    } 

    union GalaxyResult = Galaxy | ErrorResponse 
    union PlanetResult = Planet | ErrorResponse
    union MoonResult = Moon | ErrorResponse

    type Query{
        galaxies(filter: [FilterInput], sort: SortInput, page: PageInput): [Galaxy]
        planets(filter: [FilterInput], sort: SortInput, page: PageInput): [Planet]
        moons(filter: [FilterInput], sort: SortInput, page: PageInput): [Moon]
        galaxy(id: Int): GalaxyResult
        planet(id: Int): PlanetResult
        moon(id: Int): MoonResult
    }

    type Mutation{
        createGalaxy(galaxyInput: GalaxyInput): Galaxy
        updateGalaxy(id: Int, galaxyInput: GalaxyInput): Galaxy
        deleteGalaxy(id: Int): DeleteResponse

        createPlanet(planetInput: PlanetInput): Planet
        updatePlanet(id: Int, planetInput: PlanetInput): Planet
        deletePlanet(id: Int): DeleteResponse

        createMoon(moonInput: MoonInput): Moon
        updateMoon(id: Int, moonInput: MoonInput): Moon
        deleteMoon(id: Int): DeleteResponse
    }
`;
