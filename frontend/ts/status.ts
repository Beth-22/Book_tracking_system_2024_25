async function fetchBooks() {
  try {
    // Fetch data from the API
    const response = await fetch("http://localhost:7000/books");

    if (!response.ok) {
      throw new Error("Failed to fetch books.");
    }

    const books = await response.json();

    // Categorize books based on their status
    const readBooks = books.filter((book) => book.status === 1).length; // Assuming status 1 is "Read"
    const toReadBooks = books.filter((book) => book.status === 2).length; // Assuming status 2 is "To be read"
    const readingBooks = books.filter((book) => book.status === 3).length; // Assuming status 3 is "Reading"

    // Update the HTML
    document.getElementById("readBooks").textContent = readBooks;
    document.getElementById("toReadBooks").textContent = toReadBooks;
    document.getElementById("readingBooks").textContent = readingBooks;

    // Optionally, update a chart (for example, a progress chart)
    updateProgressChart(readingBooks, toReadBooks, readBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    alert("There was an error fetching the books. Please try again later.");
  }
}

function updateProgressChart(reading, toRead, read) {
  // Chart.js code to update the progress chart
  const ctx = document.getElementById("progressChart").getContext("2d");

  const progressChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Reading", "To Be Read", "Read"],
      datasets: [
        {
          data: [reading, toRead, read],
          backgroundColor: ["#FFCE56", "#FF6347", "#36A2EB"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw} books`;
            },
          },
        },
      },
    },
  });
}

// Call the fetchBooks function when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);
