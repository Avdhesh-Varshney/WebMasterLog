document.addEventListener('DOMContentLoaded', function() {
  const itemsTextarea = document.getElementById('items');
  const updateWheelButton = document.getElementById('update-wheel');
  const spinButton = document.getElementById('spin');
  const wheel = document.getElementById('wheel');
  const resultParagraph = document.getElementById('result');
  let options = [];

  function updateWheel() {
      // Clear existing wheel
      wheel.innerHTML = '';
      
      // Get items and create slices
      options = itemsTextarea.value.split(',').map(item => item.trim()).filter(item => item);
      if (options.length === 0) {
          resultParagraph.textContent = 'Please enter some items.';
          return;
      }

      const numOptions = options.length;
      const angle = 360 / numOptions;

      for (let i = 0; i < numOptions; i++) {
          const slice = document.createElement('div');
          slice.className = 'slice';
          slice.textContent = options[i];
          slice.style.transform = `rotate(${i * angle}deg)`;
          slice.style.backgroundColor = `hsl(${i * 360 / numOptions}, 70%, 70%)`;
          wheel.appendChild(slice);
      }
  }

  function spinWheel() {
      if (options.length === 0) return;

      const spinDuration = 4; // seconds
      const randomDegree = Math.floor(Math.random() * 360);
      const totalRotation = 3600 + randomDegree; // 3600 degrees to ensure multiple rotations

      wheel.style.transition = `transform ${spinDuration}s cubic-bezier(0.17, 0.67, 0.83, 0.67)`;
      wheel.style.transform = `rotate(${totalRotation}deg)`;

      // Calculate the selected option
      setTimeout(() => {
          const degree = totalRotation % 360;
          const sliceIndex = Math.floor((360 - degree) / (360 / options.length)) % options.length;
          resultParagraph.textContent = `Selected: ${options[sliceIndex]}`;
      }, spinDuration * 1000);
  }

  updateWheelButton.addEventListener('click', updateWheel);
  spinButton.addEventListener('click', spinWheel);
});
