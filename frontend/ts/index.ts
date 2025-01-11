interface Book {
  _id: string; // Assuming the API returns a unique identifier for each book
  title: string;
  author: string;
  image: string;
  status: number; // 1: Read, 2: To Be Read, 3: Reading
}

// Function to fetch books from the API and display them
async function fetchBooks() {
  const bookContainer = document.getElementById(
    "book_append"
  ) as HTMLDivElement;

  try {
    const response = await fetch("http://localhost:7000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const books: Book[] = await response.json();

    // Clear the container before appending new content
    bookContainer.innerHTML = "";

    // Append each book dynamically
    books.forEach((book) => {
      const bookHTML = `
              <div class="col-md-4">
                <div class="card">
                  <a href="details.html">
                    <img
                      src="${book.image}"
                      class="card-img-top"
                      alt="${book.title}"
                    />
                  </a>
                  <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">By ${book.author}</p>
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton${book._id}"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Options
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton${book._id}">
                        <li><a class="dropdown-item" href="#" onclick="updateStatus('${book._id}', 1)">Read</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateStatus('${book._id}', 2)">To Be Read</a></li>
                        <li><a class="dropdown-item" href="#" onclick="updateStatus('${book._id}', 3)">Reading</a></li>
                      </ul>
                    </div>
                    <!-- Update Button -->
                    <button
                      class="btn btn-primary btn-lg primary-btn mt-4 ms-auto update-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#editBookModal"
                      data-id="${book._id}"
                      id="update_id"
                      style="width: auto"
                    >
                      Update
                    </button>
                    <!-- Delete Button -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="align-self-end delete-btn mt-2 ms-2"
                      viewBox="0 0 16 16"
                      data-id="${book._id}"
                      onclick="deleteBook('${book._id}')"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </div>
                </div>
              </div>
            `;

      // Append the book HTML to the container
      bookContainer.innerHTML += bookHTML;
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    alert("Could not load books. Please try again later.");
  }
}
// Function to save the changes made in the modal
async function saveChanges() {
  // Get the book ID from the 'data-id' attribute of the Save Changes button
  const bookId = document.querySelector("#update_id").getAttribute("data-id");

  // Collect the updated book data from the form
  const updatedBook = {
    title: document.getElementById("bookTitle").value,
    author: document.getElementById("bookAuthor").value,
    status: parseInt(document.getElementById("bookProgress").value, 10), // Assuming 'status' is represented by progress
    // image: document.getElementById("bookImage").value
  };

  try {
    const response = await fetch(`http://localhost:7000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      throw new Error("Failed to update book.");
    }

    const updatedData = await response.json();
    alert("Book updated successfully!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editBookModal")
    );
    modal.hide();

    // Optionally, refresh the list of books
    fetchBooks(); // Assuming you have a method to fetch and display books
  } catch (error) {
    console.error("Error updating book:", error);
    alert("There was an error updating the book. Please try again later.");
  }
}
// Function to add a new book to the database
async function addBook(event: Event) {
  event.preventDefault();

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const authorInput = document.getElementById("author") as HTMLInputElement;
  const imageInput = document.getElementById("image") as HTMLInputElement;
  const statusInput = document.getElementById("status") as HTMLSelectElement;

  const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    image: imageInput.value.trim(),
    status: parseInt(statusInput.value, 10),
  };

  try {
    const response = await fetch("http://localhost:7000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    const addedBook = await response.json();
    // Optionally, refresh the book list
    fetchBooks();

    // Clear the form inputs
    titleInput.value = "";
    authorInput.value = "";
    imageInput.value = "";
    statusInput.value = "2"; // Default to "To Be Read"
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Could not add the book. Please try again.");
  }
}

// Add event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  const addBookForm = document.getElementById("addBookForm") as HTMLFormElement;
  addBookForm.addEventListener("submit", addBook);
});

// Function to update the status of a book
async function updateStatus(bookId: string, status: number) {
  try {
    const response = await fetch(`http://localhost:7000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    const updatedBook = await response.json();
    alert(`Book status updated to: ${getStatusText(updatedBook.status)}`);

    // Optionally, refresh the book list to reflect the updated status
    fetchBooks();
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Could not update status. Please try again later.");
  }
}

// Function to map status number to text
function getStatusText(status: number): string {
  switch (status) {
    case 1:
      return "Read";
    case 2:
      return "To Be Read";
    case 3:
      return "Reading";
    default:
      return "Unknown";
  }
}

// Function to delete a book
async function deleteBook(bookId: string) {
  try {
    const response = await fetch(`http://localhost:7000/books/${bookId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    alert("Book deleted successfully!");
    fetchBooks(); // Refresh the book list
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Could not delete the book. Please try again later.");
  }
}

// Update event listeners for Update Button
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("update-btn")) {
    const bookId = target.getAttribute("data-id");
    // Open modal with book data (you can pre-fill modal fields here)
    console.log("Updating book with ID:", bookId);
    // Implement update logic here
  }
});

// Fetch books when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
