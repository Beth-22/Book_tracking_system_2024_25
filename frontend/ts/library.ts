async function fetchBooks() {
  try {
    // Fetch data from the API
    const response = await fetch("http://localhost:7000/books");

    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    const books = await response.json();

    // Clear the lists before appending new content
    document.getElementById("to-read-list").innerHTML = "";
    document.getElementById("reading-list").innerHTML = "";
    document.getElementById("read-list").innerHTML = "";

    // Loop through the books and categorize them based on their status
    books.forEach((book) => {
      const bookHTML = `
          <div class="col-md-4 mb-4">
            <div class="card">
              <a href="details.html">
                <img src="${book.image}" class="card-img-top" alt="${book.title}" />
              </a>
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">By ${book.author}</p>
              </div>
            </div>
          </div>
        `;

      // Categorize books by status and append to the respective section
      if (book.status === 2) {
        // "To Be Read"
        document.getElementById("to-read-list").innerHTML += bookHTML;
      } else if (book.status === 1) {
        // "Read"
        document.getElementById("read-list").innerHTML += bookHTML;
      } else if (book.status === 3) {
        // "Reading"
        document.getElementById("reading-list").innerHTML += bookHTML;
      }
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    alert("There was an error fetching the books. Please try again later.");
  }
}

// Call the fetchBooks function when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);
