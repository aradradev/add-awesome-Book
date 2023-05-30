class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static showBooks() {
    const container = document.querySelector('.container');
    const addBooks = JSON.parse(localStorage.getItem('addBooks'));
    const mybooks = addBooks || [];

    container.innerHTML = '';

    if (mybooks.length === 0) {
      container.style.border = 'none';
    } else {
      container.style.border = '2px black solid';
    }

    const bookCards = mybooks.map((b) => `
      <ul class="book-ul">
        <li>
          <h3>"${b.title}"
          by
          ${b.author}</h3>
          <button class='btn' onclick=Book.removeBook(${b.id})>Remove</button>
        </li>
      </ul>
    `);
    container.innerHTML = bookCards.join('');
  }

  static addNew(e) {
    e.preventDefault();

    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const addBooks = JSON.parse(localStorage.getItem('addBooks'));

    const mybooks = addBooks || [];

    const id = mybooks.length === 0 ? 0 : mybooks[mybooks.length - 1].id + 1;

    const book = {
      id,
      title: title.value,
      author: author.value,
    };

    mybooks.push(book);
    localStorage.setItem('addBooks', JSON.stringify(mybooks));
    Book.showBooks();
    document.querySelector('form').reset();
  }

  static removeBook(id) {
    let addBooks = JSON.parse(localStorage.getItem('addBooks'));
    addBooks = addBooks.filter((e) => e.id !== id);

    localStorage.setItem('addBooks', JSON.stringify(addBooks));
    Book.showBooks();
  }
}

window.onload = () => {
  Book.showBooks();
  document.querySelector('form').addEventListener('submit', Book.addNew);
};
