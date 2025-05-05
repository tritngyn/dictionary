import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Chỉ thực hiện gợi ý khi độ dài từ > 1
        if (value.length > 1) {
            try {
                // Gọi API để lấy gợi ý
                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);
                
                // Trích xuất các từ từ kết quả API
                const suggestedWords = response.data.map(item => item.word);
                
                // Lọc và giới hạn số lượng gợi ý
                const filteredSuggestions = suggestedWords
                    .filter(word => 
                        word.toLowerCase().startsWith(value.toLowerCase())
                    )
                    .slice(0, 5); // Giới hạn 5 gợi ý

                setSuggestions(filteredSuggestions);
            } catch (error) {
                // Nếu không tìm thấy, xóa gợi ý
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async (term) => {
        if (!term) return;
        
        try {
            let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
            setDefinition(response.data[0].meanings[0].definitions[0].definition);
            setSuggestions([]); // Xóa gợi ý khi tìm kiếm
        } catch(error) {
            setDefinition('Không tìm thấy định nghĩa!');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        handleSearch(suggestion);
    };

    return (
        <div style={{ position: 'relative', width: '300px', margin: '0 auto' }}>
            <div style={{ display: 'flex' }}>
                <input  
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Nhập từ cần tìm..."
                    value={searchTerm}
                    style={{ 
                        padding: '10px', 
                        width: '300px', 
                        marginRight: '10px',
                        position: 'relative',
                        zIndex: 10
                    }}
                />
                <button 
                    onClick={() => handleSearch(searchTerm)}
                    style={{ 
                        padding: '10px 20px', 
                        cursor: 'pointer',
                        zIndex: 10,
                        position: 'relative'
                    }}
                >
                    Tìm kiếm
                </button>
            </div>

            {/* Danh sách gợi ý */}
            {suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '300px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderTop: 'none',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    zIndex: 5,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            {definition && 
            <div>
                <div style={{ marginTop: '20px' }}>
                    <h3>Kết quả:</h3>
                    <p>{definition}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default SearchBar;