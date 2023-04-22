import React from 'react';

function getReturnedBooks(props) {
  const { libraryData } = props;
  const returnedBooks = [];

  if (libraryData) { // add a check to make sure the array exists
    libraryData.forEach(transaction => {
      if (transaction.return) {
        transaction.bookname.forEach(book => {
          returnedBooks.push(book.name);
        });
      }
    });
  }

  return returnedBooks;
}

export default getReturnedBooks;
