
export async function getAddress(address) {
    const apiUrl = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`)
    apiUrl.searchParams.set("country", "fr");
    apiUrl.searchParams.set("proximity", "ip");
    apiUrl.searchParams.set("language", "fr");
    apiUrl.searchParams.set("access_token", import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);

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
