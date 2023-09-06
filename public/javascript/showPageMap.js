mapboxgl.accessToken = mapToken;

var map = new mapboxgl.Map({
    container: 'show-map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: campground.geometry.coordinates,
    zoom: 10
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map);