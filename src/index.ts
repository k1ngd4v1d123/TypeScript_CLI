enum BookGenre {
    Fiction,
    NonFiction,
    Mystery,
    Science,
    Fantasy,
    Biography,
}

interface Book {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
    genre: BookGenre;
}

interface User {
    id: number;
    name: string;
    borrowedBooks: Book[];
}

class LibraryManager {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    listBooks(): Book[] {
        return this.books;
    }

    searchBook(query: string): Book[] {
        return this.books.filter(
            (b) =>
                b.title.toLowerCase().includes(query.toLowerCase()) ||
                b.author.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
        return items.filter(predicate);
    }

    findBookById(bookId: number): Book | undefined {
        return this.books.find((b) => b.id === bookId);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    borrowBook(userId: number, bookId: number): string {
        const user = this.users.find((u) => u.id === userId);
        const book = this.findBookById(bookId);

        if (!user) return "User not found";
        if (!book) return "Book not found";
        if (!book.isAvailable) return `"${book.title}" is not available`;

        book.isAvailable = false;
        user.borrowedBooks.push(book);
        return `${user.name} borrowed "${book.title}"`;
    }

    returnBook(userId: number, bookId: number): string {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return "User not found";

    const index = user.borrowedBooks.findIndex((b) => b.id === bookId);
    if (index === -1) return "Book not borrowed by this user";

    const [book] = user.borrowedBooks.splice(index, 1);
    if (!book) return "Unexpected error"; // safety guard

    book.isAvailable = true;
    return `${user.name} returned "${book.title}"`;
}

}

const library = new LibraryManager();

library.addBook({ id: 1, title: "The Alchemist", author: "Paulo Coelho", publishedYear: 1988, isAvailable: true, genre: BookGenre.Fiction });
library.addBook({ id: 2, title: "Sapiens", author: "Yuval Noah Harari", publishedYear: 2011, isAvailable: true, genre: BookGenre.Science });
library.addBook({ id: 3, title: "1984", author: "George Orwell", publishedYear: 1949, isAvailable: true, genre: BookGenre.Fiction });

library.addUser({ id: 1, name: "Alice", borrowedBooks: [] });
library.addUser({ id: 2, name: "Bob", borrowedBooks: [] });

console.log("All books:", library.listBooks());

console.log("Search 'Sapiens':", library.searchBook("Sapiens"));

console.log(library.borrowBook(1, 2)); // Alice borrows Sapiens
console.log(library.borrowBook(2, 2)); // Bob tries to borrow Sapiens (unavailable)
console.log(library.returnBook(1, 2)); // Alice returns Sapiens
console.log(library.borrowBook(2, 2)); // Bob borrows Sapiens

// Use generic filter
const sciBooks = library.filterItems(library.listBooks(), (b) => b.genre === BookGenre.Science);
console.log("Science books:", sciBooks);
