interface book {
  id: number;
  title: string;
  author: string;
  publishedYear: string;
  isAvailable: boolean;
}

interface user {
  id: number;
  name: string;
  borrowedBooks: book[];
}

let books: book[] = [];
let users: user[] = [];

function addBook(title: string, author: string, publishedYear: string): void {
  const newBook: book = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
    isAvailable: true
  };
  books.push(newBook);
  console.log(`✅ Book "${title}" added to library!`);
}

function listBooks(): void {
  if (books.length === 0) {
    console.log("📚 No books in the library yet.");
    return;
  }

  books.forEach((book) => {
    console.log(`${book.id}. ${book.title} by ${book.author} (${book.publishedYear}) - ${book.isAvailable ? "Available" : "Not Available"}`);
  });
}

function searchBooks(query: string): void {
  const results = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length === 0) {
    console.log(`❌ No books found for "${query}".`);
  } else {
    console.log(`🔎 Search results for "${query}":`);
    results.forEach((book) =>
      console.log(`${book.id}. ${book.title} by ${book.author} - ${book.isAvailable? 'Available': 'Not Available'}`)
    );
  }
}

function borrowBook(userId: number, bookTitle: string): void {
  const user = users.find(u => u.id === userId);
  const book = books.find(b => b.title === bookTitle);

  if (!user) {
    console.log("❌ User not found.");
    return;
  }

  if (!book) {
    console.log("❌ Book not found.");
    return;
  }

  if (!book.isAvailable) {
    console.log(`❌ "${book.title}" is not available.`);
    return;
  }

  book.isAvailable = false;
  user.borrowedBooks.push(book);
  console.log(`✅ ${user.name} borrowed "${book.title}".`);
}

function returnBook(userId: number, bookTitle: string): void {
  const user = users.find(u => u.id === userId);
  const book = books.find(b => b.title === bookTitle);

  if (!user || !book) {
    console.log("❌ User or book not found.");
    return;
  }

  const borrowedIndex = user.borrowedBooks.findIndex(b => b.title === bookTitle);
  if (borrowedIndex === -1) {
    console.log(`❌ ${user.name} didn’t borrow "${book.title}".`);
    return;
  }

  user.borrowedBooks.splice(borrowedIndex, 1);
  book.isAvailable = true;
  console.log(`✅ ${user.name} returned "${book.title}".`);
}

addBook("The Alchemist", "Paulo Coelho", "1949");

listBooks();

searchBooks("p");

users.push({ id: 1, name: "David", borrowedBooks: [] });

borrowBook(1, "The Alchemist");

returnBook(1, "The Alchemist")