import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", query],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      ).then((res) => res.json()),
    enabled: query !== "",
  });

  const handleSearch = () => {
    setQuery(input);
  };

  if (isLoading) return <p>로딩중...</p>;

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-1">🎬 영화 검색</h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          보고 싶은 영화를 검색해보세요
        </p>

        <div className="flex gap-2 max-w-md mx-auto mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="영화 제목을 입력하세요"
            className="flex-1 bg-[#1a1d27] border border-[#2a2e3a] rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            검색
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#1a1d27] rounded-xl overflow-hidden outline outline-2 outline-transparent hover:outline-blue-500 hover:-translate-y-1 transition-all"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full block"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-[#232735] flex items-center justify-center text-gray-600 text-sm">
                  포스터 없음
                </div>
              )}
              <div className="p-3">
                <h3 className="text-sm font-semibold mb-1.5 truncate">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="text-yellow-400">
                    ★ {movie.vote_average?.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}