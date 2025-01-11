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
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var response, books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:7000/books")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch books.");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    books = _a.sent();
                    // Clear the lists before appending new content
                    document.getElementById("to-read-list").innerHTML = "";
                    document.getElementById("reading-list").innerHTML = "";
                    document.getElementById("read-list").innerHTML = "";
                    // Loop through the books and categorize them based on their status
                    books.forEach(function (book) {
                        var bookHTML = "\n          <div class=\"col-md-4 mb-4\">\n            <div class=\"card\">\n              <a href=\"details.html\">\n                <img src=\"".concat(book.image, "\" class=\"card-img-top\" alt=\"").concat(book.title, "\" />\n              </a>\n              <div class=\"card-body\">\n                <h5 class=\"card-title\">").concat(book.title, "</h5>\n                <p class=\"card-text\">By ").concat(book.author, "</p>\n              </div>\n            </div>\n          </div>\n        ");
                        // Categorize books by status and append to the respective section
                        if (book.status === 2) {
                            // "To Be Read"
                            document.getElementById("to-read-list").innerHTML += bookHTML;
                        }
                        else if (book.status === 1) {
                            // "Read"
                            document.getElementById("read-list").innerHTML += bookHTML;
                        }
                        else if (book.status === 3) {
                            // "Reading"
                            document.getElementById("reading-list").innerHTML += bookHTML;
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching books:", error_1);
                    alert("There was an error fetching the books. Please try again later.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Call the fetchBooks function when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);
