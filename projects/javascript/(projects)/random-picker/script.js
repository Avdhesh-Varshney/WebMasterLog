document.getElementById('selectButton').addEventListener('click', function() {
  const itemList = document.getElementById('itemList').value;
  const items = itemList.split(',').map(item => item.trim()).filter(item => item !== '');
  if (items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      document.getElementById('result').textContent = `Selected Item: ${randomItem}`;
  } else {
      document.getElementById('result').textContent = 'Please enter at least one item.';
  }
});
