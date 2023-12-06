import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Slider from './Slider';
import SidebarItem from './SidebarItem';
import HelpPage from './HelpPage';
import LandingPage from './LandingPage';
import Menu from './Menu';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
  {
    name: 'Color Inversion',
    property: 'invert',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Transparency',
    property: 'opacity',
    value: 100,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  function handleSliderChange({ target }) {
    const newOptions = options.map((option, index) => {
      return index === selectedOptionIndex ? { ...option, value: target.value } : option;
    });

    setOptions(newOptions);

    setHistory((prevHistory) => [...prevHistory.slice(0, historyIndex + 1), newOptions]);
    setHistoryIndex(historyIndex + 1);
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(' ') };
  }

  function handleUndo() {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setOptions(history[historyIndex - 1]);
    }
  }

  function handleRedo() {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setOptions(history[historyIndex + 1]);
    }
  }
  
  function handleReset() {
    setOptions(DEFAULT_OPTIONS);
    setHistory([]);
    setHistoryIndex(-1);
  }

  return (
    <Router>
      <div>
        <Menu /> {/* Use the Menu component here */}
        <Routes>
          <Route
            path="/app"
            element={
              <div className="container">
                <div className="main-image" style={getImageStyle()} />
                <div className="sidebar">
                  {options.map((option, index) => (
                    <SidebarItem
                      key={index}
                      name={option.name}
                      active={index === selectedOptionIndex}
                      handleClick={() => setSelectedOptionIndex(index)}
                    />
                  ))}
                  <div className="buttons">
                    <button
                      className="sidebar-button"
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                    >
                      Undo
                    </button>
                    <button
                      className="sidebar-button"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                    >
                      Redo
                    </button>
                    <button
                      className="sidebar-button"
                      onClick={handleReset}
                      disabled={historyIndex === -1}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <Slider
                  min={options[selectedOptionIndex].range.min}
                  max={options[selectedOptionIndex].range.max}
                  value={options[selectedOptionIndex].value}
                  handleChange={handleSliderChange}
                />
              </div>
            }
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/" exact element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;