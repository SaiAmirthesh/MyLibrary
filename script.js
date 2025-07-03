class Book {
  constructor(title, author, pages, isRead) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}


let myLibrary = [];

const booksContainer = document.getElementById('books-container');
const addBookBtn = document.getElementById('add-book-btn');
const bookModal = document.getElementById('book-modal');
const bookForm = document.getElementById('book-form');
const closeModal = document.querySelector('.close-modal');
const themeToggle = document.getElementById('theme-toggle');

myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, false));
myLibrary.push(new Book("Dune", "Frank Herbert", 412, true));


function renderBooks() {
  booksContainer.innerHTML = '';
  
  if (myLibrary.length === 0) {
    booksContainer.innerHTML = '<p class="empty-message">Your library is empty. Add some books!</p>';
    return;
  }

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;
    
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>By ${book.author}</p>
      <p>${book.pages} pages</p>
      <div class="book-actions">
        <button class="read-status ${book.isRead ? 'read-true' : 'read-false'}">
          ${book.isRead ? 'Read' : 'Not Read'}
        </button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    booksContainer.appendChild(bookCard);
  });

  document.querySelectorAll('.read-status').forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteBook);
  });
}

function toggleReadStatus(e) {
  const bookId = e.target.closest('.book-card').dataset.id;
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleRead();
  renderBooks();
}

function deleteBook(e) {
  const bookId = e.target.closest('.book-card').dataset.id;
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  renderBooks();
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('is-read').checked;
  
  myLibrary.push(new Book(title, author, pages, isRead));
  renderBooks();
  bookModal.classList.add('hidden');
  bookForm.reset();
});

addBookBtn.addEventListener('click', () => {
  bookModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  bookModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
  if (e.target === bookModal) {
    bookModal.classList.add('hidden');
  }
});

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
} else {
  document.documentElement.classList.remove('dark');
  themeToggle.textContent = '🌙 Dark Mode';
}

renderBooks();