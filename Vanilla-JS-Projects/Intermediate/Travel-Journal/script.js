document.addEventListener("DOMContentLoaded", () => {
    const journalForm = document.getElementById("journalForm");
    const galleryContainer = document.getElementById("galleryContainer");
    const tripDetails = document.getElementById("tripDetails");
    const journalSection = document.getElementById("journalSection");
    const gallerySection = document.getElementById("gallerySection");
    const dashboardSection = document.getElementById("dashboardSection");
    const journalBtn = document.getElementById("journalBtn");
    const galleryBtn = document.getElementById("galleryBtn");
    const dashboardBtn = document.getElementById("dashboardBtn");
    const dashboardTable = document.getElementById("dashboardTable").querySelector("tbody");

    journalBtn.addEventListener("click", () => {
        journalSection.classList.remove("hidden");
        gallerySection.classList.add("hidden");
        dashboardSection.classList.add("hidden");
    });

    galleryBtn.addEventListener("click", () => {
        journalSection.classList.add("hidden");
        gallerySection.classList.remove("hidden");
        dashboardSection.classList.add("hidden");
        renderGallery();
    });

    dashboardBtn.addEventListener("click", () => {
        journalSection.classList.add("hidden");
        gallerySection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        renderDashboard();
    });

    let journals = JSON.parse(localStorage.getItem("journals")) || [];

    journalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const photos = Array.from(document.getElementById("photos").files).map(file => URL.createObjectURL(file));
        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;

        const journal = { title, description, photos, fromDate, toDate };
        journals.push(journal);
        localStorage.setItem("journals", JSON.stringify(journals));
        alert("Journal entry added!");

        journalForm.reset();
    });

    function renderGallery() {
        galleryContainer.innerHTML = "";
        journals.forEach((journal, index) => {
            const card = document.createElement("div");
            card.className = "card gallery-card";

            const title = document.createElement("h3");
            title.textContent = journal.title;

            const description = document.createElement("p");
            description.textContent = journal.description;

            const photosDiv = document.createElement("div");
            photosDiv.className = "card-photos";
            if (journal.photos.length > 0) {
                const img = document.createElement("img");
                img.alt = "Photo";
                photosDiv.appendChild(img);
            }      

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "View Details";
            detailsButton.addEventListener("click", () => showTripDetails(index));

            const deleteIcon = document.createElement("span");
            deleteIcon.className = "delete-icon";
            deleteIcon.textContent = "×";
            deleteIcon.addEventListener("click", () => deleteJournal(index));

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(photosDiv);
            card.appendChild(detailsButton);
            card.appendChild(deleteIcon);

            galleryContainer.appendChild(card);
        });
    }

    function showTripDetails(index) {
        const journal = journals[index];
        tripDetails.innerHTML = "";

        const title = document.createElement("h3");
        title.textContent = journal.title;

        const description = document.createElement("p");
        description.textContent = journal.description;

        const photosDiv = document.createElement("div");
        journal.photos.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo;
            img.alt = "Photo";
            photosDiv.appendChild(img);
        });

        const fromDate = document.createElement("p");
        fromDate.textContent = `From: ${journal.fromDate}`;

        const toDate = document.createElement("p");
        toDate.textContent = `To: ${journal.toDate}`;

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.className = "close-button";
        closeButton.addEventListener("click", closeTripDetails);

        tripDetails.appendChild(title);
        tripDetails.appendChild(description);
        tripDetails.appendChild(photosDiv);
        tripDetails.appendChild(fromDate);
        tripDetails.appendChild(toDate);
        tripDetails.appendChild(closeButton);

        tripDetails.style.display = "flex";
    }

    function closeTripDetails() {
        tripDetails.style.display = "none";
    }

    function deleteJournal(index) {
        if (confirm("Are you sure you want to delete this journal entry?")) {
            journals.splice(index, 1);
            localStorage.setItem("journals", JSON.stringify(journals));
            renderGallery();
        }
    }

    function renderDashboard() {
        dashboardTable.innerHTML = "";
        journals.forEach(journal => {
            const row = document.createElement("tr");

            const titleCell = document.createElement("td");
            titleCell.textContent = journal.title;

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = journal.description;

            const fromDateCell = document.createElement("td");
            fromDateCell.textContent = journal.fromDate;

            const toDateCell = document.createElement("td");
            toDateCell.textContent = journal.toDate;

            const photosCountCell = document.createElement("td");
            photosCountCell.textContent = journal.photos.length;

            row.appendChild(titleCell);
            row.appendChild(descriptionCell);
            row.appendChild(fromDateCell);
            row.appendChild(toDateCell);
            row.appendChild(photosCountCell);

            dashboardTable.appendChild(row);
        });
    }
    const sortableHeaders = document.querySelectorAll("#dashboardTable th.sortable");
    sortableHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const isAscending = header.classList.contains("sorted-asc");
            sortableHeaders.forEach(h => h.classList.remove("sorted-asc", "sorted-desc"));
            header.classList.add(isAscending ? "sorted-desc" : "sorted-asc");
            const columnIndex = Array.from(header.parentNode.children).indexOf(header);
            const rows = Array.from(dashboardTable.querySelectorAll("tr"));
            rows.sort((a, b) => {
                const aText = a.children[columnIndex].textContent;
                const bText = b.children[columnIndex].textContent;
                return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });
            dashboardTable.innerHTML = "";
            rows.forEach(row => dashboardTable.appendChild(row));
        });
    });
});
