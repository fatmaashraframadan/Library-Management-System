# Library Managemnet System

## Functional Requirements  

### 1. Books  
- Add a book with details like title, author, ISBN, available quantity, and shelf location.  
- Update a book’s details.
- Delete a book.
- List all books.
- Search for a book by title, author, or ISBN.  

### 2. Borrowers  
- Register a borrower with details like name, email, and registered date (Keep the user details as simple as possible).  
- Update borrower’s details. 
- Delete a borrower.  
- List all borrowers.

### 3. Borrowing Process  
- Check out a book: A borrower can borrow a book, and the system should keep track of which books are checked out and by whom.  
- Return a book: A borrower can return a book they checked out.  
- View borrowed books: A borrower can check the books they currently have.  
- Track overdue books: The system should keep track of due dates and list books that are overdue.



## Technologies Used
JavaScript, Node.js, Express, Postgress, Joi, Sequelize

## Setting up the environment
1. Clone the repo.
2. npm install (install dependencies)
3. Install postgress
4. update connection string in .env file with username & password.
5. run node index.js

## APIs
