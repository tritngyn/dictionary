import React, { useState } from "react";
import axios from "axios";
import WordDetail from "./WordDetails";
function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('');
        //[value, function] = useState('giá trị cho sẵn')
    const [definition, setDefinition] = useState(null);
    const fetchWordDefinition = async () =>{
        if (!searchTerm) return;
        try{
            let response= await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
            let data = response.data; 
            setDefinition(
               { word: data[0].word,
                phonetic: data[0].phonetic || (data[0].phonetics[0]?.text || ''),
                meanings: data[0].meanings.map(meaning => ({
                  partOfSpeech: meaning.partOfSpeech,
                  definitions: meaning.definitions.map(def => ({
                    definition: def.definition,
                    example: def.example || ''
                  }))
                }))
                }
            )
        } catch (error){
            setDefinition({ error: 'Không tìm thấy định nghĩa!' });
        }
    }
    // const handleSearch = async() => {
    //     if (!searchTerm) return;
    //     try {
    //         let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
    //     setDefinition(response.data[0].meanings[0].definitions[0].definition);
    //     }   catch(error){
    //         setDefinition('Không tìm thấy định nghĩa!');
    //     }
    // }
    return (
        <>
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <input  
                onChange={(event) => setSearchTerm(event.target.value)}
                type="text"
                placeholder="Nhập từ cần tìm..."
                value={searchTerm}
                style={{ padding: '10px', width: '300px', marginRight: '10px' }}>
            </input>
            <button onClick={() => fetchWordDefinition()}
                style={{ padding: '10px 20px', cursor: 'pointer'}}>
                Tìm kiếm
            </button> 
         </div>
         <WordDetail data = {definition} />
        </>
    )
}
export default SearchBar;