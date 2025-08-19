interface book {
  id: number;
  title: string;
  author: string;
  publishedYear: string;
  isAvailable: boolean;
}


let books: book[] = [];


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



addBook("The Alchemist", "Paulo Coelho", "1949");

listBooks();

searchBooks("p");

