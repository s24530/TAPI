export const moonResolvers = {
    GetMoons: (req, res) => {
        res(null, {
            galaxy_id: 0,
            name: "jajco",
            star_name: "Jajco",
            distance: 1000,
            size: 500,
            planets: [1, 2, 3],
        });
    },

    GetMoon: (req, res) => {
        const galaxyId = req.request.id;
        res(null, {
            galaxy_id: galaxyId,
            name: `Galaxy ${galaxyId}`,
            star_name: `Star ${galaxyId}`,
            distance: 1500,
            size: 600,
            planets: [4, 5, 6],
        });
    },

    updateMoon: (req, res) => {
        const galaxyId = req.request.id;
        res(null, {
            galaxy_id: galaxyId,
            name: `Updated Galaxy ${galaxyId}`,
            star_name: `Updated Star ${galaxyId}`,
            distance: 2000,
            size: 700,
            planets: [7, 8, 9],
        });
    },

    deleteMoon: (req, res) => {
        const galaxyId = req.request.id;
        res(null, {
            galaxy_id: galaxyId,
            name: "",
            star_name: "",
            distance: 0,
            size: 0,
            planets: [],
        });
    },
};
