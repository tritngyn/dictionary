import React from "react";
import { Button } from "@mui/material";
function WordDetail({data, handleSubmit}) {

      if (!data || !data.word || !data.meanings || data.meanings.length === 0) {
        return <div>Không tìm thấy từ này.</div>;
    }
    console.log("check data", data);
    return (
        <div className="word-details">
        <div className="word-header">
          <h2>{data.word}  
          <Button  variant="contained" onClick={ () => handleSubmit(data.word)}> + </Button> </h2> 
          {data.phonetic && <span className="phonetic">{data.phonetic}</span>}
        </div>
    
        {/* audio---------------------------- */}
      {data.phonetics?.find(phonetic => phonetic.audio)?.audio && (
        <audio
    
          src={data.phonetics.find(phonetic => phonetic.audio).audio}
          controls
        >
          Your browser does not support the audio element.
        </audio>
      )}
      {/* audio---------------------------- */}


  
        {data.meanings && data.meanings.map((meaning, index) => (
          <div key={index} className="meaning">
            <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
            
            <div className="definitions">
              {meaning.definitions.map((def, idx) => (
                <div key={idx} className="definition">
                  <p>{def.definition}</p>
                  {def.example && (
                    <p className="example">"{def.example}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
}
export default WordDetail;