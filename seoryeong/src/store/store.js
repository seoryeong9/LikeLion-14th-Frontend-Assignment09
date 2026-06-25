import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  movies: [],
  query: "",

  setQuery: (query) => set({ query }),

  searchMovies: async () => {
    const { query } = get();

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`
      );
      set({ movies: response.data.results });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;