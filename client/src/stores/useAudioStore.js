import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'




const useAudioStore = create(
  persist(
    (set) => ({
      
      howlInstance: null, 
      volume: 0.5,
      setVolume: (value) => set({ volume: value }),
      setHowlInstance: (howl) => set({ howlInstance: howl }),

      currentSnippetId: null,
      currentSongId: null,
      currentArtistId: null,
      tempSnippetId: null,
      tempArtistId: null,
      setCurrentSnippetId: (id) => set({ currentSnippetId: id }),
      setCurrentSongId: (id) => set({currentSongId: id }),
      setCurrentArtistId: (id) => set({currentArtistId: id }),
      setTempSnippetId: (id) => set({ tempSnippetId: id }),
      setTempArtistId: (id) => set({ tempArtistId: id }),


      isPlaying: false,
      isPaused: true,
      firstPlay: false,
      playRequest: null,
      setIsPlaying: (value) => set({ isPlaying: value }),
      setIsPaused: (value) => set({ isPaused: value }),
      setFirstPlay: (value) => set({ firstPlay: value }),
      setPlayRequest: (req) => set({ playRequest: req }),
      clearPlayRequest: () => set({ playRequest: null }),
      
      loggedinAdmin: "",
      loggedinAdminUuid: "",
      setLoggedinAdmin: (value) => set({ loggedinAdmin: value }),
      setLoggedinAdminUuid: (value) => set({ loggedinAdminUuid: value }),

}),
{
    name: 'volume-storage',
    partialize: (state) => ({  
      volume: state.volume,
      firstPlay: state.firstPlay,
      currentSnippetId: state.currentSnippetId,
      currentSongId: state.currentSongId,
      currentArtistId: state.currentArtistId,
      loggedinAdmin: state.loggedinAdmin,
      loggedinAdminUuid: state.loggedinAdminUuid,
    }),
    storage: createJSONStorage(() => sessionStorage)
}

))

export default useAudioStore;