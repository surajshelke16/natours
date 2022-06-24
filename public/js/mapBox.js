
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic3VyYWpzaGVsa2UiLCJhIjoiY2w0OGVvZGR4MGRiNTNqcWVkdjQwYmM0NyJ9.y6fkHMgPIF1ZuZP09Y_8_A';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/surajshelke/cl48ffsv4002214p8g35dfy0s',
    scrollZoom: false,
    //   style: 'mapbox://styles/surajshelke/cl48fi754000y14ofy61or81q',
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // New Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
