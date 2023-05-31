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

    const bookCards = mybooks.map((b) => `
      <ul class="book-ul">
        <li class="book-li">
          <h3>"${b.title}"
          by
          ${b.author}</h3>
          <button class='btn' onclick=Book.removeBook(${b.id})>Remove</button>
        </li>
      </ul>
    `);

    if (mybooks.length === 0) {
      container.style.background = 'none';
      container.innerHTML = `<p>There is no books yet</p>
      <p>
      go to Add new tab and add a book !
      <a class="nav-link" id="addNew"
          onclick='Book.showIt("add-section");  Book.toggleActive("addNew");' >Add new</a>
      </p>
      
      `;
    } else {
      container.style.background = '#f8f1f1';
      container.innerHTML = bookCards.join('');
    }
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

  static showIt(id) {
    const sectionList = ['list-section', 'add-section', 'about-section'];

    sectionList.forEach((e) => {
      if (e === id) {
        document.querySelector(`#${e}`).setAttribute('data-visible', 'true');
      } else {
        document.querySelector(`#${e}`).setAttribute('data-visible', 'false');
      }
    });
  }

  static toggleActive(id) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.classList.remove('active');
    });
    const clickedLink = document.getElementById(id);
    clickedLink.classList.add('active');
  }

  static showNaviagtionBar() {
    const navigation = document.querySelector('#navigation-container');

    navigation.innerHTML = `<nav>
    <h5>Awesome Books</h5>
      <ul>
          <li class="nav-link active" id="list" 
          onclick='Book.showIt("list-section");  Book.toggleActive("list");' >List</li>
  
          <li class="nav-link" id="addNew"
          onclick='Book.showIt("add-section");  Book.toggleActive("addNew");' >Add new</li>
  
          <li class="nav-link" id="contact"
          onclick='Book.showIt("about-section"); Book.toggleActive("contact");' >Contact</li>
      </ul>
    </nav>
  
    `;
  }

  static showTime() {
    const dateTime = document.querySelector('.time');
    const timeDate = () => {
      setInterval(() => {
        const date = new Date().toUTCString();
        dateTime.innerHTML = date.toString().substring(0, date.indexOf(' GMT'));
      }, 0);
    };

    timeDate();
  }
}

window.onload = () => {
  Book.showBooks();
  document.querySelector('form').addEventListener('submit', Book.addNew);

  Book.showNaviagtionBar();
  Book.showTime();
};
