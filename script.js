let mylibrary = []

function Book(title,author,num_pages,read) {
    this.id = crypto.randomUUID(),
    this.title = title,
    this.author = author,
    this.num_pages = num_pages,
    this.read = read
}

function addBookToLibrary(title,author,num_pages,read,mylibrary){
    const book = new Book(title,author,num_pages,read)
    mylibrary.push(book)
}

function display_books(mylibrary){
    const libraryCont = document.getElementById("library")
    libraryCont.innerHTML = ''

    for (let i = 0 ; i < mylibrary.length ; i++){
        const newBook = document.createElement("div")
        newBook.classList.add("book-card")

        const heading = document.createElement("H3")
        const author = document.createElement("p")
        const numpages = document.createElement("p")
        const readstat = document.createElement("p")
        const changestat = document.createElement("button")
        const remove = document.createElement("button")

        newBook.dataset.id = mylibrary[i].id

        heading.textContent = `Title : ${mylibrary[i].title}`
        author.textContent = `author : ${mylibrary[i].author}`
        numpages.textContent = `number of pages : ${mylibrary[i].num_pages}`
        readstat.textContent = `finished the book : ${mylibrary[i].read}`
        changestat.textContent = "Read/Not Read"
        remove.textContent = "Remove book"

        changestat.addEventListener("click", () => {
            const id = newBook.dataset.id;
            const book = mylibrary.find(b => b.id === id);
            book.read = !book.read;
            display_books(mylibrary);
        });

        remove.addEventListener("click", () => {
            const id = newBook.dataset.id;
            mylibrary = mylibrary.filter(b => b.id !== id);
            display_books(mylibrary);
        });


        newBook.appendChild(heading)
        newBook.appendChild(author)
        newBook.appendChild(numpages)
        newBook.appendChild(readstat)
        newBook.appendChild(changestat)
        newBook.appendChild(remove)

        libraryCont.appendChild(newBook)
    }
}

const New_btn = document.createElement("button")

New_btn.dataset.id = "newbtn"
New_btn.textContent = "New Book"

const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

New_btn.addEventListener("click", ()=>{
    dialog.showModal()
})

document.querySelector(".close").addEventListener("click",()=>{
    dialog.close()
})

form.addEventListener("submit",(e) => {
    e.preventDefault();

    const title = document.getElementById("title").value
    const Author = document.getElementById("author").value
    const npages = Number(document.getElementById("number_pages").value)
    const readChoice = document.getElementById("read").checked

    if (!title || !Author || npages <= 0) return

    addBookToLibrary(title,Author,npages,readChoice,mylibrary)
    display_books(mylibrary)

    form.reset()
    dialog.close()
})


document.querySelector("header").appendChild(New_btn)




