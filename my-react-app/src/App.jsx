import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai'; // Search icon

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setLoading(false);
      setData(response.data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data); // Show all data when query is empty
    } else {
      const filtered = data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive match
      );
      setFilteredData(filtered); // Update the filtered data
    }
  }, [searchQuery, data]);

  return (
    <>
      <div className="relative max-w-md mx-auto mt-8">
        <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
          <AiOutlineSearch className="text-gray-400 ml-3" /> {/* Search icon */}
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update query on input change
            className="w-full p-3 pl-2 outline-none text-gray-700"
          />
        </div>

        {/* Suggestion List */}
        {filteredData.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-md z-10 max-h-40 overflow-y-auto">
            {filteredData.map(product => (
              <li
                key={product.name}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10 px-4">
        {data.map(items => (
          <div
            key={items.name}
            className="max-h-full rounded-xl hover:bg-gray-100 hover:shadow-md flex flex-col justify-center items-center"
          >
            <img className="h-[12rem] w-[13rem]" src={items.url} alt="" />
            <h4>{items.name}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
