const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

// Version to force cache invalidation
const VERSION = '2.0.0';

/**
 * Fetches nearby hospitals using Google Places API via Vite proxy to avoid CORS issues.
 * Falls back to mock data if API fails.
 * @returns {Promise<Array<Object>>} A list of hospital objects.
 */
export const getNearbyHospitals = async () => {
  const lat = -1.9441;
  const lng = 30.0619;
  const radius = 5000; // meters

  try {
    // Use Vite proxy to avoid CORS issues
    const proxyUrl = `/api/google-maps/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=hospital&key=${API_KEY}&t=${Date.now()}`;
    console.log(`[${VERSION}] Fetching hospitals from proxy URL:`, proxyUrl);
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Places API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API returned status: ${data.status}`);
    }

    return data.results.map((place) => ({
      id: place.place_id,
      name: place.name,
      rating: place.rating || 0,
      isOpen: place.opening_hours ? place.opening_hours.open_now : undefined,
      photo: place.photos && place.photos[0] 
        ? `/api/google-maps/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
        : null,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`,
      phone: null,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }));

  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    
    // Fallback to mock data for development
    return getMockHospitals();
  }
};

/**
 * Mock hospital data for development when API is not available.
 */
function getMockHospitals() {
  return [
    {
      id: 'mock-1',
      name: 'King Faisal Hospital',
      rating: 4.2,
      isOpen: true,
      photo: null,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=King+Faisal+Hospital+Kigali',
      phone: '+250 788 123 456',
      lat: -1.9441,
      lng: 30.0619,
    },
    {
      id: 'mock-2',
      name: 'Kigali University Teaching Hospital',
      rating: 4.0,
      isOpen: true,
      photo: null,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kigali+University+Teaching+Hospital',
      phone: '+250 788 234 567',
      lat: -1.9500,
      lng: 30.0500,
    },
    {
      id: 'mock-3',
      name: 'Kibagabaga Hospital',
      rating: 3.8,
      isOpen: false,
      photo: null,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kibagabaga+Hospital+Kigali',
      phone: '+250 788 345 678',
      lat: -1.9300,
      lng: 30.0700,
    },
    {
      id: 'mock-4',
      name: 'Muhima Health Center',
      rating: 3.5,
      isOpen: true,
      photo: null,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Muhima+Health+Center+Kigali',
      phone: '+250 788 456 789',
      lat: -1.9600,
      lng: 30.0400,
    }
  ];
}
