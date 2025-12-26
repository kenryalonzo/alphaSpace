export const API_KEY = 'DEMO_KEY'; // In production, use import.meta.env.VITE_NASA_KEY

export const URLS = {
    APOD: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
    SPACEX_UPCOMING: 'https://api.spacexdata.com/v4/launches/upcoming',
    SPACEX_LATEST: 'https://api.spacexdata.com/v4/launches/latest',
    NEWS: 'https://api.spaceflightnewsapi.net/v4/articles/'
};

// Mock Data for Telescopes
import type { TelescopeImage } from "../utils/types";

export const MOCK_WEBB: TelescopeImage[] = [
    {
        id: "webb-1",
        title: "Carina Nebula",
        description: "The Cosmic Cliffs. A landscape of glittering stars and jagged mountains in the Carina Nebula.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Carina_Nebula_by_James_Webb_Space_Telescope.jpg/1280px-Carina_Nebula_by_James_Webb_Space_Telescope.jpg",
        date: "2022-07-12"
    },
    {
        id: "webb-2",
        title: "Southern Ring Nebula",
        description: "The Southern Ring Nebula. A dying star covered in dust and layers of light.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Southern_Ring_Nebula_NIRCam.jpg/1280px-Southern_Ring_Nebula_NIRCam.jpg",
        date: "2022-07-12"
    },
    {
        id: "webb-3",
        title: "Stephans Quintet",
        description: "Stephan's Quintet. A visual grouping of five galaxies, best known for being featured in the film It's a Wonderful Life.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Stephans_Quintet_NIRCam_MIRI_Composite.jpg/1280px-Stephans_Quintet_NIRCam_MIRI_Composite.jpg",
        date: "2022-07-12"
    },
    {
        id: "webb-4",
        title: "Pillars of Creation",
        description: "The Pillars of Creation. A famous star-forming region in the Eagle Nebula.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1024px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
        date: "2022-10-19"
    }
];

export const MOCK_HUBBLE: TelescopeImage[] = [
    {
        id: "hubble-1",
        title: "Butterfly Nebula",
        description: "This celestial object looks like a delicate butterfly. But it is far from serene.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/NGC_6302_Hubble_2009.full.jpg/1280px-NGC_6302_Hubble_2009.full.jpg",
        date: "2009-09-09"
    },
    {
        id: "hubble-2",
        title: "Mystic Mountain",
        description: "This craggy mountain of dust and gas rises from the Carina Nebula.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Mystic_Mountain_%28captured_by_the_Hubble_Space_Telescope%29.jpg/1024px-Mystic_Mountain_%28captured_by_the_Hubble_Space_Telescope%29.jpg",
        date: "2010-04-23"
    },
    {
        id: "hubble-3",
        title: "Bubble Nebula",
        description: "The Bubble Nebula, also known as NGC 7635, is an emission nebula located 8,000 light-years away.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/The_Bubble_Nebula_-_NGC_7635.jpg/1280px-The_Bubble_Nebula_-_NGC_7635.jpg",
        date: "2016-04-21"
    },
     {
        id: "hubble-4",
        title: "Lagoon Nebula",
        description: "At the center of the Lagoon Nebula, a monster young star 200,000 times brighter than our Sun is blasting powerful ultraviolet radiation.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Lagoon_Nebula_%28captured_by_the_Hubble_Space_Telescope%29.jpg/1280px-Lagoon_Nebula_%28captured_by_the_Hubble_Space_Telescope%29.jpg",
        date: "2018-04-19"
    }
];
