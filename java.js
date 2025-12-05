let notes = JSON.parse(localStorage.getItem("notes")) || []
let noteList = document.getElementById("notes-list")
let addNoteList = document.getElementById("add-note-list")
let deleteNoteList = document.querySelector(".container")

function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNewNote(text = "") {

    let createElementDiv = document.createElement("div")
    let createElementTextarea = document.createElement("textarea")
    createElementDiv.className = "container"
    createElementTextarea.placeholder = "Enter Text..."
    createElementDiv.appendChild(createElementTextarea)
    noteList.insertAdjacentElement("afterbegin", createElementDiv)
    createElementTextarea.value = text

    // Save note whenever text changes
    createElementTextarea.addEventListener("input", () => {
        let index = Array.from(noteList.querySelectorAll("textarea")).indexOf(createElementTextarea);
        notes[index] = createElementTextarea.value;
        saveToLocalStorage();
    }); 
}

addNoteList.addEventListener("click", () => {
    notes.unshift("");  // empty new note
    saveToLocalStorage();
    createNewNote("");
});

window.addEventListener("DOMContentLoaded", () => {
    notes.forEach(note => createNewNote(note));
});

noteList.addEventListener("dblclick", (e) => {
    if (e.target.tagName === "TEXTAREA") {
        let index = Array.from(noteList.querySelectorAll("textarea")).indexOf(e.target);
        notes.splice(index, 1);  // remove from array
        saveToLocalStorage();
        e.target.parentElement.remove();  // remove the entire container div
    }
});
