var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Function to fetch books from the API and display them
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var bookContainer, response, books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookContainer = document.getElementById("book_append");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:7000/books")];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch books");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    books = _a.sent();
                    // Clear the container before appending new content
                    bookContainer.innerHTML = "";
                    // Append each book dynamically
                    books.forEach(function (book) {
                        var bookHTML = "\n          <div class=\"col-md-4\">\n            <div class=\"card\">\n              <a href=\"details.html\">\n                <img\n                  src=\"".concat(book.image, "\"\n                  class=\"card-img-top\"\n                  alt=\"").concat(book.title, "\"\n                />\n              </a>\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">").concat(book.title, "</h5>\n                <p class=\"card-text\">By ").concat(book.author, "</p>\n                <div class=\"dropdown\">\n                  <button\n                    class=\"btn btn-secondary btn-sm dropdown-toggle\"\n                    type=\"button\"\n                    id=\"dropdownMenuButton").concat(book.id, "\"\n                    data-bs-toggle=\"dropdown\"\n                    aria-expanded=\"false\"\n                  >\n                    Options\n                  </button>\n                  <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton").concat(book.id, "\">\n                    <li><a class=\"dropdown-item\" href=\"#\" onclick=\"updateStatus('").concat(book.id, "', 1)\">Read</a></li>\n                    <li><a class=\"dropdown-item\" href=\"#\" onclick=\"updateStatus('").concat(book.id, "', 2)\">To Be Read</a></li>\n                    <li><a class=\"dropdown-item\" href=\"#\" onclick=\"updateStatus('").concat(book.id, "', 3)\">Reading</a></li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </div>\n        ");
                        // Append the book HTML to the container
                        bookContainer.innerHTML += bookHTML;
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching books:", error_1);
                    alert("Could not load books. Please try again later.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Function to add a new book to the database
function addBook(event) {
    return __awaiter(this, void 0, void 0, function () {
        var titleInput, authorInput, imageInput, statusInput, newBook, response, addedBook, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    titleInput = document.getElementById("title");
                    authorInput = document.getElementById("author");
                    imageInput = document.getElementById("image");
                    statusInput = document.getElementById("status");
                    newBook = {
                        title: titleInput.value.trim(),
                        author: authorInput.value.trim(),
                        image: imageInput.value.trim(),
                        status: parseInt(statusInput.value, 10),
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:7000/books", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newBook),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to add book");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    addedBook = _a.sent();
                    alert("Book \"".concat(addedBook.title, "\" added successfully!"));
                    // Optionally, refresh the book list
                    fetchBooks();
                    // Clear the form inputs
                    titleInput.value = "";
                    authorInput.value = "";
                    imageInput.value = "";
                    statusInput.value = "2"; // Default to "To Be Read"
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error adding book:", error_2);
                    alert("Could not add the book. Please try again.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Add event listener to the form
document.addEventListener("DOMContentLoaded", function () {
    var addBookForm = document.getElementById("addBookForm");
    addBookForm.addEventListener("submit", addBook);
});
// Function to update the status of a book
function updateStatus(bookId, status) {
    return __awaiter(this, void 0, void 0, function () {
        var response, updatedBook, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:7000/books/".concat(bookId), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ status: status }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to update status");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    updatedBook = _a.sent();
                    alert("Book status updated to: ".concat(getStatusText(updatedBook.status)));
                    // Optionally, refresh the book list to reflect the updated status
                    fetchBooks();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error updating status:", error_3);
                    alert("Could not update status. Please try again later.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to map status number to text
function getStatusText(status) {
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
// Fetch books when the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks();
});
