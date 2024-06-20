const bookContainer = document.querySelector(".book-container");
const addBookButton = document.getElementById("newBookButton");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.getElementById("newBookForm");
const cancelButton = document.getElementById("cancelButton");

const myLibrary = [];

function Book(title, author, pages, read) {
	return {
		title,
		author,
		pages,
		read,
	};
}

function addBookToLibrary(lib, book) {
	lib.push(book);
}

addBookToLibrary(myLibrary, Book("The Hobbit", "J.R.R. Tolkien", 295, "No"));
addBookToLibrary(
	myLibrary,
	Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, "No"),
);
addBookToLibrary(myLibrary, Book("Harry Potter", "J.K. Rowling", 309, "Yes"));

function displayBooks(library) {
	// Clear the book bookContainer
	bookContainer.innerHTML = "";
	library.forEach((book, index) => {
		const bookCard = document.createElement("div");
		bookCard.classList.add(
			"book-card",
			"border",
			"rounded",
			"p-4",
			"mb-4",
			"relative",
			"bg-white",
			"shadow",
		);
		bookCard.setAttribute("data-index", index);
		bookCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${book.title}</h2>
            <p class="text-lg mb-1">Author: ${book.author}</p>
            <p class="text-lg mb-1">Pages: ${book.pages}</p>
            <p class="text-lg mb-2">Read: ${book.read}</p>
            <button class="delete-button bg-red-500 text-white px-4 py-2 rounded mb-2" data-index="${index}">Delete</button>
            <button class="toggle-read-button bg-blue-500 text-white px-4 py-2 rounded" data-index="${index}">Toggle Read</button>
        `;
		bookContainer.appendChild(bookCard);
	});

	const deleteButtons = document.querySelectorAll(".delete-button");
	deleteButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const index = button.getAttribute("data-index");
			myLibrary.splice(index, 1);
			displayBooks(myLibrary);
		});
	});

	const toggleReadButtons = document.querySelectorAll(".toggle-read-button");
	toggleReadButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const index = button.getAttribute("data-index");
			myLibrary[index].read =
				myLibrary[index].read === "Yes" ? "No" : "Yes";
			displayBooks(myLibrary);
		});
	});
}

displayBooks(myLibrary);

addBookButton.addEventListener("click", () => {
	newBookDialog.showModal();
});

newBookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const read = document.querySelector('input[name="read"]:checked').value;
	addBookToLibrary(myLibrary, Book(title, author, pages, read));
	displayBooks(myLibrary);
	newBookDialog.close();
});

cancelButton.addEventListener("click", () => {
	newBookDialog.close();
});
