"use strict";

// DOM objects
const dash = document.querySelector(".book-dash");

const closeFormBtn = document.querySelector(".cancel-modal");
const bookForm = document.querySelector("form");
const formActive = "active"
const formNonActive = "non-active"

const addBookBtn = document.querySelector(".add-book");

const container = document.querySelector(".container");
const containerActive = "modal-active";
const containerNonActive = "modal-non-active";

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");

    let readVal;
    if (read.checked) readVal = true;
    else readVal = false;

    if (titleExists(title.value)) {
        alert("A book by this title is already in your library."); 
        return;
    }

    let bookObj = new Book(title.value, author.value, pages.value, readVal);
    addBookToLibrary(bookObj);

    // Refresh fields
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    // Close form
    bookForm.classList.remove(formActive);
    bookForm.classList.add(formNonActive);

    container.classList.remove(containerActive);
    container.classList.add(containerNonActive);

})

closeFormBtn.addEventListener("click", () => {
    // Refresh fields
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
    
    // Close form
    bookForm.classList.remove(formActive);
    bookForm.classList.add(formNonActive);

    container.classList.remove(containerActive);
    container.classList.add(containerNonActive);
});

addBookBtn.addEventListener("click", () => {
    // Open form
    bookForm.classList.add(formActive);
    bookForm.classList.remove(formNonActive);

    container.classList.add(containerActive);
    container.classList.remove(containerNonActive);

})

// Stores all books in the library
const library = [];

// Example book
addBookToLibrary(new Book("The Lightning Thief", "Rick Riordan", "396", true));

// Constructor for Book objects
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read) this.read = false;
    else this.read = true; 
}


function addBookToLibrary(book) {
    library.push(book);
    addBookToPage(book);
}

function addBookToPage(book){
    let bookEle = document.createElement("div");
    let xBtn = document.createElement("button");
    let title = document.createElement("h2");
    let author = document.createElement("h3");
    let pageNum = document.createElement("h3");
    let readBtn = document.createElement("button");

    xBtn.classList.add("x-btn")
    xBtn.classList.add("remove")
    bookEle.classList.add("book");
    title.classList.add("title");
    author.classList.add("author");
    pageNum.classList.add("pages");
    readBtn.classList.add("read");

    title.textContent = book.title;
    author.textContent = book.author;
    pageNum.textContent = book.pages;
    xBtn.textContent = "X";
    if (book.read) readBtn.textContent = "Read";
    else {
        readBtn.textContent = "Not Read"
        readBtn.style.backgroundColor = "red";
    };

    bookEle.appendChild(xBtn);
    bookEle.appendChild(title);
    bookEle.appendChild(author);
    bookEle.appendChild(pageNum);
    bookEle.appendChild(readBtn);

    xBtn.addEventListener("click", () => {
        removeBookFromLib(book.title);
        bookEle.remove();
        bookEle = null;
    })

    readBtn.addEventListener("click", () => {
        if (book.read){
            readBtn.style.backgroundColor = "red";
            readBtn.textContent = "Not Read";
        }
        else {
            readBtn.style.backgroundColor = "rgb(1, 95, 1)";
            readBtn.textContent = "Read";
        }
        book.toggleRead();
    })

    dash.appendChild(bookEle);  
}

function shiftBooksForward(startInd){
    for (let i = startInd + 1; i < library.length; i++)
    {
        library[i - 1] = library[i];
    }
    // Pop extra element
    library.pop()
}

function removeBookFromLib(title){
    for (let i = 0; i < library.length; i++)
    {
        if (library[i].title == title)
        {
            shiftBooksForward(i);
        }
    }
}

function titleExists(title){
    for (let i = 0; i < library.length; i++)
    {
        if (library[i].title == title)
        {
            return true;
        }
    }
    return false;
}