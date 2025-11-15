async function request(endpoint, options = {}) {
  const res = await fetch(`http://localhost:8080${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} ${errorText}`);
  }

  return res.json();
}


export const getAllUUIDs = () => request('/uuids');

export const getAllArtists = () => request('/artists');
export const getArtistById = (uuid) => request(`/artists/${uuid}`);
export const getPortraitURLById = (type, uuid) => request(`/artists/${type}/${uuid}`);

export const getAllSongs = () => request('/songs');
export const getSongById = (uuid) => request(`/songs/${uuid}`);
export const getAudioURLById = (type, uuid) => request(`/songs/${type}/${uuid}`);
export const getSongByArtistId = (uuid) => request(`/artists/${uuid}/song`);

export const incrementSongPlays = (uuid) => request(`/songs/${uuid}/full/plays`, { method: 'PUT' });
export const incrementSnippetPlays = (uuid) => request(`/songs/${uuid}/snippet/plays`, { method: 'PUT' });

export const updateSongData = (uuid, body) => request(`/songs/${uuid}/update`, { method: 'PUT', body: JSON.stringify(body) });
export const updateArtistData = (uuid, body) => request(`/artists/${uuid}/update`, { method: 'PUT', body: JSON.stringify(body) });

export const getSongFileNameById = (uuid) => request(`/songs/${uuid}/filename`);
export const getArtistFileNameById = (uuid) => request(`/artists/${uuid}/filename`);

export const replaceArtistAndSong = (uuid, body) => request(`/${uuid}/replace`,{ method: 'PUT', body: JSON.stringify(body) });

export const getAllAdmins = () => request('/admin/all');
export const getAdminById = (uuid) => request(`/admin/${uuid}`);
export const adminLogin = (uuid, password) => request(`/admin/${uuid}/login`,{ method: 'PUT', credentials: "include",  body: JSON.stringify(password) })
export const adminAudit = (body) => request(`/admin/audit`,{ method: 'POST', body: JSON.stringify(body) })
export const adminAuth = () => request('/admin/me', {credentials:"include"})