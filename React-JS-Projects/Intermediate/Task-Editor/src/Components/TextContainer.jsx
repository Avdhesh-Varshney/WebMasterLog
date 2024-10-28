import React, { useState, useRef } from 'react';

const TextContainer = ({ text, fontSize, fontWeight, fontStyle, textDecoration, selectedFont }) => {
  const [position, setPosition] = useState({ top: 100, left: 100 }); // Initial position
  const boundaryRef = useRef(null); // Reference to the boundary container
  const textRef = useRef(null); // Reference to the text element

  // Handle the drag event
  const handleDrag = (e) => {
    const newX = e.clientX;
    const newY = e.clientY;

    // Get boundary dimensions
    const boundary = boundaryRef.current.getBoundingClientRect();

    // Get text element dimensions
    const textElement = textRef.current.getBoundingClientRect();
    const elementWidth = textElement.width; // Use the actual width of the text element
    const elementHeight = textElement.height; // Use the actual height of the text element

    // Ensure the element stays within the boundary
    const clampedX = Math.max(boundary.left, Math.min(newX, boundary.right - elementWidth));
    const clampedY = Math.max(boundary.top, Math.min(newY, boundary.bottom - elementHeight));

    setPosition({ top: clampedY - boundary.top, left: clampedX - boundary.left });
  };

  return (
    <div
      ref={boundaryRef}
      className="boundary-container"
      style={{ width: '85rem', height: '30rem', border: '1px solid black', position: 'relative' }} // Define boundary dimensions
    >
      <div
        ref={textRef} // Attach ref to the text element
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          fontSize: `${fontSize}px`,
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          textDecoration: textDecoration,
          fontFamily: selectedFont,
          cursor: 'grab',
        }}
        draggable
        onDragEnd={handleDrag} // Use onDrag to update the position while dragging
      >
        {text}
      </div>
    </div>
  );
};

export default TextContainer;
