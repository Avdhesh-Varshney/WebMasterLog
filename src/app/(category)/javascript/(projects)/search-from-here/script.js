document.addEventListener("DOMContentLoaded", function() {
    // Search URLs for each platform
    const searchUrls = {
      Google: "https://www.google.com/search?q=",
      Amazon: "https://www.amazon.com/s?k=",
      Youtube: "https://www.youtube.com/results?search_query=",
      Wikipedia: "https://en.wikipedia.org/wiki/"
    };
  
    // Add click event to each search icon
    document.querySelectorAll(".box").forEach(box => {
      const searchInput = box.querySelector("input[type='search']");
      const searchIcon = box.querySelector("img");
  
      searchIcon.addEventListener("click", () => {
        const platform = box.querySelector("h3").innerText;
        const query = searchInput.value.trim();
  
        if (query) {
          const searchUrl = searchUrls[platform] + encodeURIComponent(query);
          window.open(searchUrl, "_blank");
        } else {
          alert("Please enter a search term.");
        }
      });
    });
  });
  