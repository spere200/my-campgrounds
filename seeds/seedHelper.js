const cities = require("./cities");

const descriptors = [
  "Sandy",
  "Windy",
  "Tranquil",
  "Warm",
  "Cool",
  "Relaxing",
  "Beautiful",
  "Somber",
  "Gloomy",
  "Dark",
  "Sunny",
];

const places = [
  "Village",
  "Canyon",
  "Pond",
  "Group Camp",
  "Camp",
  "River",
  "Creek",
  "Bay",
  "Spring",
  "Mountain",
  "Cliff",
  "Hollow",
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
  "https://images.unsplash.com/photo-1618418518996-0e55c720b366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1527824404775-dce343118ebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1548095779-26dbc38010ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1493668068984-ac1a19928fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8NDk3NzI1Njd8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1435783099294-283725c37230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxNTI3OTY4fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/reserve/B6PfiQ8QoSzmsZYOCkSB__DSC0530-1.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wxNTI3OTY4fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1505816328275-34db3b7cef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnwxNTI3OTY4fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1466495227171-d05d7e3ac2b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxNTI3OTY4fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXwxNTI3OTY4fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8MTUyNzk2OHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1536415674649-19c6de404a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w1MjA0NjR8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8NTIwNDY0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1508163223045-1880bc36e222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTl8NTIwNDY0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1506104489822-562ca25152fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw2MjI4OTg3M3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1486435286105-07c4f2698498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w2MjI4OTg3M3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHw2MjI4OTg3M3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w2MjI4OTg3M3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1506104489822-562ca25152fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw2MjI4OTg3M3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxODg3MzY1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxODg3MzY1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxODg3MzY1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXwxODg3MzY1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwyMzQ3Nzk1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwyMzQ3Nzk1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wyMzQ3Nzk1fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
];

module.exports = createCityPropObj = () => {
  const descriptor =
    descriptors[Math.floor(Math.random() * descriptors.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const cityObj = cities[Math.floor(Math.random() * cities.length)];
  const price = Math.floor(Math.random() * 20) + 10;
  const description = `A ${descriptor} ${place} in ${cityObj.city}.`;
  const location = `${cityObj.city}, ${cityObj.state}`;

  // image selection, random 1-3 images from the imagesSrc array
  const numImages = Math.floor(Math.random() * 3 + 1);
  const imageInitialIndex = Math.floor(Math.random() * imagesSrc.length);
  const images = [];

  for (let i = 0; i < numImages; i++) {
    images.push({
      url: imagesSrc[(imageInitialIndex + i) % imagesSrc.length],
      filename: descriptor,
    });
  }

  return {
    title: `${descriptor} ${place}`,
    images,
    geometry: {
      type: "Point",
      coordinates: [cityObj.longitude, cityObj.latitude],
    },
    price,
    description,
    location,
    author: "6542119e0691d7aa0083df6d",
    creationDate: new Date().toDateString()
  };
};
