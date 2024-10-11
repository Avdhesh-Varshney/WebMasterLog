document.getElementById("run-code").addEventListener("click", function() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = document.getElementById("css-code").value;
    const jsCode = document.getElementById("js-code").value;

    const output = `
        <style>${cssCode}</style>
        ${htmlCode}
        <script>
            try {
                ${jsCode}
                parent.document.getElementById("error-log").style.display = 'none';
            } catch (error) {
                parent.document.getElementById("error-log").style.display = 'block';
                parent.document.getElementById("error-log").textContent = 'Error: ' + error.message;
            }
        <\/script>
    `;

    const iframe = document.getElementById("output-frame").contentWindow.document;
    iframe.open();
    iframe.write(output);
    iframe.close();
});
