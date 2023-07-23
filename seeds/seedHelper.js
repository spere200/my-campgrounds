const cities = require('./cities');

const descriptors = [
    'Sandy',
    'Windy',
    'Tranquil',
    'Warm',
    'Cool',
    'Relaxing',
    'Beautiful',
    'Somber',
    'Gloomy',
    'Dark',
    'Sunny'
];

const places = [
    'Village',
    'Canyon',
    'Pond',
    'Group Camp',
    'Camp',
    'River',
    'Creek',
    'Bay',
    'Spring',
    'Mountain',
    'Cliff',
    'Hollow'
];

module.exports = createCityPropObj = () => {
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    const place = places[Math.floor(Math.random() * places.length)];
    const cityObj = cities[Math.floor(Math.random() * cities.length)];
    const price = Math.floor(Math.random() * 20) + 10;
    const description = `A ${descriptor} ${place} in ${cityObj.city}.`;
    const image = 'https://source.unsplash.com/random/?camping';

    return {
        title: `${descriptor} ${place}`,
        image, 
        price,
        description,
        location: cityObj.city
    };
}

