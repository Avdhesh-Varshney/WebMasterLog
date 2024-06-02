document.addEventListener('DOMContentLoaded', function() {
    const markdownInput = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');

   
    function renderMarkdown(markdown) {
const lines = markdown.split('\n'); 
let html = ''; 
lines.forEach(line => {
  const match = line.match(/^#+\s*(.*)$/);
  if (match) {
    const level = match[0].split('#').length - 1;
    const text = match[1].trim(); 
    
    html += `<h${level}>${text}</h${level}>`;
  }
});

return html;
}


    

function updatePreview()
{
  preview.innerHTML = renderMarkdown(markdownInput.value);
}
    markdownInput.addEventListener('input', updatePreview);
  });