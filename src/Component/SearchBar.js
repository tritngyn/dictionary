import React, { useState, useEffect  } from "react";
import axios from "axios";
import WordDetail from "./WordDetails";
import History from "./History";
import Favorate from "./AddFav";

import { TextField, Button, Box, Card, Typography } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
    const [definition, setDefinition] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [favWord, setFavWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
      setSuggestions([]);
    } 
}else {
          setSuggestions([]);
        }
 
}
    const handleSuggestionClick = (suggestion) => {
      setSearchTerm(suggestion);
      fetchWordDefinition(suggestion);
      setSuggestions([]); 
  };

    const fetchWordDefinition = async (term = searchTerm) =>{
        if (!term) return;
        setLoading(true);
        setError(null);
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
            setError('Không thể tìm từ này. Vui lòng thử lại.');
            setSuggestions([]);
        }finally {
          setLoading(false);
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
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        
              <TextField 
                  label="Enter a word"
                  fullWidth
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === 'Enter' && fetchWordDefinition(searchTerm)}
                  type="text"
                  placeholder="Nhập từ cần tìm..."
                  value={searchTerm}
                  />
              <Button variant="contained" onClick={() => {
                fetchWordDefinition();
                setSearchTerm(''); } 
                }>
                  
                  Tìm kiếm
              </Button>   
          </Box> 
              <List>
              {suggestions.length > 0 && 
                 
                  suggestions.map((suggestion, index) => (
                    <ListItem key={index} disablePadding> 
                      <ListItemButton onClick={() =>  handleSuggestionClick(suggestion)}>
                        <ListItemText primary={suggestion} />
                      </ListItemButton>
                  </ListItem>
                ))
              
              }
              </List>
               
         
        
        <Box sx={{ display: 'flex', mt: 4 }}>
           <Box sx={{ flex: 1, mr: 2 }}>
            <Card sx={{ p: 2 }}>
             
                {loading && <Typography className="loading">Đang tìm kiếm...</Typography>}
                {error && <Typography className="error">{error}</Typography>}
                {!loading && !error && definition &&  <WordDetail data={definition} handleSubmit={handleSubmit} />}
                {!loading && !error && !definition && <Typography className="empty-state">Tìm kiếm một từ để bắt đầu</Typography>}
            </Card>
          </Box>

            <Box sx={{ width: 300 }}>
              <Card sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6">History</Typography>
                <History
                  items={searchHistory}
                  onItemClick={(term) => {
                    setSearchTerm(term);
                    fetchWordDefinition(term);
                  }}
                />
              </Card>

              <Card sx={{ p: 2 }}>
                <Typography variant="h6">FAVORITE</Typography>
                <Favorate
                  items={favWord}
                  DeleteFav = {DeleteFav}
                  onItemClick={(term) => {
                    fetchWordDefinition(term);
                  }}
                />
              </Card>
            </Box>
          </Box>

        
        </>
    )
}
export default SearchBar;