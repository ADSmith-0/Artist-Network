import React, {useState} from 'react';

function Slider(props){
    const [value, setValue] = useState(100);
    const [percentage, setPercentage] = useState(0);

    function handleChange(event){
        let { value, min, max } = event.target;
        setValue(value);
        setPercentage(((value - min)/(max - min) * 100));
    }

    return (
        <div id="sliderContainer">
            <label htmlFor="artistsNumber">Select how many artists to display:</label>
            <span>{value}</span>
            <br/>
            <input 
                type="range" 
                id="artistsNumber" 
                min="100" 
                max="1000" 
                step="100" 
                value={value} 
                onChange={handleChange} 
                style={{ background: `linear-gradient(90deg, #0BB5ff ${percentage}%, #eee ${percentage}%)`}}
            />
            <button 
                className="button"
                onClick={() => props.handler(value)}
            >
                Draw!
            </button>
        </div>
    )
}

export default Slider;
