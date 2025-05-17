import React, { useEffect, useState } from 'react'
import './StarshipList.css'
import StarshipCard from '../StarshipCard/StarshipCard'

const StarshipList = () => {

    const [starships, setStarships] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [limit, setLimit] = useState(5);


    useEffect(() => {
        fetchStarships();
    }, []);

 
    const fetchStarships = (searchValue = search) => {
        let url = `https://swapi.py4e.com/api/starships/?page=${page}`;
        if (searchValue) {
            url = `https://swapi.py4e.com/api/starships/?search=${searchValue}`;
        }
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.next === null) setHasMore(false);
            const limitedData = data.results.slice(0, limit); 
            setStarships(prev => [...prev, ...limitedData]);
        });
    };

 
    const handleSearch = () => {
        setStarships([]);
        setPage(1);
        setHasMore(true);
        fetch(`https://swapi.py4e.com/api/starships/?search=${search}`)
        .then(res => res.json())
        .then(data => {
            const limitedData = data.results.slice(0, limit);
            setStarships(limitedData);
            if (data.next === null) setHasMore(false);
        });
    };

   
    const loadMore = () => {
        setPage(prev => prev + 1);
    };

   
    useEffect(() => {
        if (page > 1) fetchStarships();
    }, [page]);

  return (
    <div className='main-container'>
      
      <h1>Star Wars App</h1>
      <input
        className='search-bar'
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search for name or model"
      />
      <button className='search-btn' onClick={handleSearch}>Search</button>
      
      <div>
        {starships.map((ship, index) => (
          <StarshipCard key={index} ship={ship} />
        ))}
      </div>

      {hasMore && <button className='more-btn' onClick={loadMore}>More Starships</button>}
    </div>
  )
}

export default StarshipList
