// Ambil video ID dari query string
export function getVideoIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1; // default ID = 1
}

// Load daftar video dari JSON
export async function loadVideoList(jsonPath = 'videos.json') {
  try {
    const res = await fetch(jsonPath);
    return await res.json();
  } catch (err) {
    console.error('Failed to load videos.json:', err);
    return [];
  }
}