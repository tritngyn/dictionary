import React, { useState, useEffect  } from "react";
import axios from "axios";
import WordDetail from "./WordDetails";
import History from "./History";
import Favorate from "./AddFav";
function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [definition, setDefinition] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [favWord, setFavWords] = useState([]);

    useEffect(() => {
      // Tải lịch sử tìm kiếm từ localStorage khi khởi động
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
      const savedFavHistory = localStorage.getItem('searchFavHistory');
      if (savedFavHistory) {
        setFavWords(JSON.parse(savedFavHistory));
      }
      
    }, []);

const handleInputChange = async (event) => {
  const value = event.target.value
  setSearchTerm(value);
  if (value.length > 1) {
  try {
    let response= await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
    // suggestion
    const suggestedWords = response.data.map(item => item.word);
    // Lọc và giới hạn số lượng gợi ý
    const uniqueSuggestions = [...new Set(suggestedWords)];
    const filteredSuggestions = uniqueSuggestions
            .filter(word => 
                word.toLowerCase().startsWith(value.toLowerCase())
            )
            .slice(0, 5); // Giới hạn 5 gợi ý

        setSuggestions(filteredSuggestions);
          
        }catch(error) {
      // Nếu không tìm thấy, xóa gợi ý
      setSuggestions([]);
    } 
}else {
          setSuggestions([]);
        }
 
}
    const handleSuggestionClick = (suggestion) => {
      setSearchTerm(suggestion);
      fetchWordDefinition(suggestion);
      setSuggestions('');
      
  };

    const fetchWordDefinition = async (term = searchTerm) =>{
        if (!term) return;
        try{
            let response= await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
            let data = response.data; 
            setDefinition(
               { 
                word: data[0].word,
                phonetic: data[0].phonetic || (data[0].phonetics[0]?.text || ''),
                phonetics: data[0].phonetics || [],
                meanings: data[0].meanings.map(meaning => ({
                  partOfSpeech: meaning.partOfSpeech,
                  definitions: meaning.definitions.map(def => ({
                    definition: def.definition,
                    example: def.example || ''
                  }))
                }))
                }
            )
              // Cập nhật lịch sử tìm kiếm
            const updatedHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 10);
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            
          
        } catch (error){
            setDefinition({ error: 'Không tìm thấy định nghĩa!' });
            setSuggestions([]);
        }
        
    };
    const handleSubmit = (word) => {
      const updatedFavHistory = [word, ...favWord.filter(item => item !== word)].slice(0, 10);
      setFavWords(updatedFavHistory);
      localStorage.setItem('searchFavHistory', JSON.stringify(updatedFavHistory));

    };
    const DeleteFav = (word) => {
      const newFav = favWord.filter(item => item !== word) ;
      setFavWords(newFav);
      localStorage.setItem(`searchFavHistory`, JSON.stringify(newFav));
    };
 
    
    return (
        <>
        <header>
          <div className="SearchBar">
              <input  
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Nhập từ cần tìm..."
                  value={searchTerm}
                  >
              </input>

              <button onClick={() => {
                fetchWordDefinition();
                setSearchTerm(''); } 
                }>
                  Tìm kiếm
              </button> 

              <div className="drop_down">
              {suggestions.length > 0 && (
                 <ul>
                  {suggestions.map((suggestion, index) => (
                    <li 
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </li>
                ))}
                </ul>
              )}
              </div>
              
          </div>
        </header>
        <main className="parent">
            <div className="definition">
              <WordDetail data={definition} handleSubmit={handleSubmit} />
            </div>

            <aside className="aside-right">
              <div className="history-section">
                <h3>HISTORY</h3>
                <History
                  items={searchHistory}
                  onItemClick={(term) => {
                    setSearchTerm(term);
                    fetchWordDefinition(term);
                  }}
                />
              </div>

              <div className="favorate-section">
                <h3>FAVORITE</h3>
                <Favorate
                  items={favWord}
                  DeleteFav = {DeleteFav}
                  onItemClick={(term) => {
                    fetchWordDefinition(term);
                  }}
                />
              </div>
            </aside>
          </main>

        
        </>
    )
}
export default SearchBar;