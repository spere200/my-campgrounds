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

const imagesSrc = [
    "https://images.unsplash.com/photo-1517398825998-780ca786555f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1640189668430-f9791d4db74a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1621306558057-1d040ee57bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1531739749582-b1e2443949d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1531208730879-a0470d015a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1590764089847-68e93f378ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1565575726815-69ab316d5af4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw0OTc3MjU2N3x8ZW58MHx8fHx8&w=1000&q=80",
    "https://images.unsplash.com/photo-1492133969098-09ba49699f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1464725516711-da37f638782a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1545378033-79a3a9770ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTJ8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1618418518996-0e55c720b366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1527824404775-dce343118ebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1548095779-26dbc38010ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1509295790761-be78a9ee52f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1493668068984-ac1a19928fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
];

module.exports = createCityPropObj = () => {
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    const place = places[Math.floor(Math.random() * places.length)];
    const cityObj = cities[Math.floor(Math.random() * cities.length)];
    const price = Math.floor(Math.random() * 20) + 10;
    const description = `A ${descriptor} ${place} in ${cityObj.city}.`;
    const images = [{url: imagesSrc[Math.floor(Math.random() * imagesSrc.length)], filename: descriptor}];

    return {
        title: `${descriptor} ${place}`,
        images, 
        price,
        description,
        location: cityObj.city,
        author: "64c7612a6e322a99f1f35737"
    };
}

