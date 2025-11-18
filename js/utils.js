// Ambil video ID dari path: /f/:id
export function getVideoIdFromPath() {
  const pathParts = window.location.pathname.split('/');
  return parseInt(pathParts[2]) || 1;
}

// Load JSON daftar video
export async function loadVideoList(jsonPath = 'videos.json') {
  try {
    const res = await fetch(jsonPath);
    return await res.json();
  } catch(err) {
    console.error('Failed to load videos.json:', err);
    return [];
  }
}