import React, { useState } from "react";
import UndoRedo from "./UndoRedo";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa";
import TextContainer from "./TextContainer";

const TextEditor = () => {
  const [text, setText] = useState(""); // State to store editor text
  const [history, setHistory] = useState([]); // State to manage undo/redo history
  const [currentIndex, setCurrentIndex] = useState(-1); // Index to track undo/redo
  const [fontSize, setFontSize] = useState(16); // Default font size
  const [fontStyle, setFontStyle] = useState("normal"); // Default font style
  const [fontWeight, setFontWeight] = useState("normal"); // Default font weight
  const [textDecoration, setTextDecoration] = useState("none"); // Default text decoration
  const [selectedFont, setSelectedFont] = useState("Arial"); //Default Font

  // Array of font options
  const fontOptions = [
    { name: "Arial", value: "Arial" },
    { name: "Courier New", value: "Courier New" },
    { name: "Georgia", value: "Georgia" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Verdana", value: "Verdana" },
  ];

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (currentIndex === -1 || newText !== history[currentIndex]) {
      const newHistory = [
        ...history.slice(0, currentIndex + 1), // Copy up to current index
        newText, // Add new text to history
      ];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1); // Update current index to the new last
    }
  };

  // Undo function
  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setText(history[currentIndex - 1]);
    }
  };

  // Redo function
  const handleRedo = () => {
    if (currentIndex < history.length-1) {
      setCurrentIndex(currentIndex + 1);
      setText(history[currentIndex + 1]);
    }
  };

  // Function to increase font size
  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase size by 2
  };

  // Function to decrease font size
  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 10)); // Decrease size by 2 but not below 10
  };

  return (
    <div className="editor-container border border-gray-500 m-10 absolute overflow-hidden max-h-screen">
      {/* Toolbar */}
      <div className="toolbar">
        <UndoRedo handleUndo={handleUndo} handleRedo={handleRedo} />

        <TextContainer
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          textDecoration={textDecoration}
          selectedFont={selectedFont}
          text={text}
        />

        {/* Text area for user input */}
        <div className="p-10 flex items-center justify-evenly">
          
          {/* Font selection dropdown */}
          <div className="font-selection">
            <label htmlFor="fontSelect">Font:</label>
            <select
              id="fontSelect"
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="ml-2 border p-1"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font size controls */}
          <div className="font-size-controls">
            <button onClick={decreaseFontSize} className="p-2 border">
              -
            </button>
            <span className="font-size-display mx-2">{fontSize}</span>
            <button onClick={increaseFontSize} className="p-2 border">
              +
            </button>
          </div>

          {/* Font style controls */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setFontWeight(fontWeight === "bold" ? "normal" : "bold")
              }
              className="bg-slate-100 p-2"
            >
              <FaBold />
            </button>
            <button
              onClick={() =>
                setFontStyle(fontStyle === "italic" ? "normal" : "italic")
              }
              className="bg-slate-100 p-2"
            >
              <FaItalic />
            </button>
            <button
              onClick={() =>
                setTextDecoration(
                  textDecoration === "underline" ? "none" : "underline"
                )
              }
              className="bg-slate-100 p-2"
            >
              <FaUnderline />
            </button>
          </div>

          {/* Textarea for text input */}
          <div className="">
            <textarea
              style={{
                textDecoration: textDecoration,
                fontWeight: fontWeight,
                fontStyle: fontStyle,
                fontSize: "16px",
                fontFamily: selectedFont,
              }}
              value={text}
              placeholder="Enter your text here...."
              onChange={handleTextChange}
              rows={5}
              cols={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
