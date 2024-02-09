
export async function getAddress(address) {
    const apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address) + '.json?country=fr&proximity=ip&language=fr&access_token='
        + import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    try {
        const responses = await fetch(apiUrl);
        const data = await responses.json();

        return data.features.map((feature) => ({
            id: feature.id,
            name: feature.place_name,
            geometry: feature.geometry,
        }));
    }
    catch (error) {
        console.error('Error fetching address', error);
    }

    return [];
}
