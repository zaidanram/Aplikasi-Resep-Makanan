import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../types/type";
import axios from "axios";
import RecipeCardResult from "../component/RecipeCardResult";
import { Link } from "react-router-dom";

export default function SearchDetails () {

        const location = useLocation();
        const [searchQuery, setSearchQuery] = useState('');
        const [searchResult, setSearchResult] = useState<Recipe[]>([]);
        const[ loading, setLoading] = useState(false);
        const [ error, setError] = useState<string | null>(null);
        

        useEffect(() => {
          const query = new URLSearchParams(location.search).get('query');
          if(query) {
            setSearchQuery(query);
            performSearch(query);
          }
        }, [location.search]);

        const performSearch = async (query: string) => {


          if(!query) {
            setSearchResult([]);
            return;
          }

          setLoading(true);
          setError(null);

          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recipes/search?query=${query}`);
            setSearchResult(response.data.data);
          } catch  {
            setError('Error searching for recipes'); 
          } finally{
            setLoading(false);
          }
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              const query = event.target.value;
              setSearchQuery (query);
              performSearch (query);
        };


    return (
        <>
  <nav className="flex items-center justify-between px-5 mt-[30px]">
    <Link to={'/'}>
        <div className="flex shrink-0">
          <img src="assets/images/logos/logo.svg" alt="logo" />
        </div>
    </Link>
  </nav>
  <div className="px-5 mt-[30px]">
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <div
      
      className="flex items-center rounded-full p-[5px_14px] pr-[5px] gap-[10px] bg-white shadow-[0_12px_30px_0_#D6D6D652] transition-all duration-300 focus-within:ring-1 focus-within:ring-[#FF4C1C]"
    >
      <img
        src="assets/images/icons/note-favorite.svg"
        className="w-6 h-6"
        alt="icon"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        name="search"
        id="search"
        className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-black"
        placeholder="Find our best food recipes"
      />
      <button type="submit" className=" flex shrink-0 w-[42px] h-[42px]">
        <img src="assets/images/icons/search.svg" alt="icon" />
      </button>
    </div>
  </div>
  <section id="SearchResult" className="px-5 mt-[30px]">
    <div className="flex items-center justify-between">
      <h2 className="font-bold">Search Results</h2>
    </div>
    <div className="flex flex-col gap-[18px] mt-[18px]">

      {searchResult.length > 0 ? (
        searchResult.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.slug}`}>
        <RecipeCardResult recipe={recipe}></RecipeCardResult>
       </Link> 
      ))) : (<p>Resep tidak ada....</p>)
         }
    </div>
  </section>
</>

        
        


    );
}