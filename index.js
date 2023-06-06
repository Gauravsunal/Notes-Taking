console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteText = addTxt.value;
  let noteLines = noteText.split("\n");
  let note = {
    title: noteLines[0].trim(), // First line as title
    text: noteText,
    important: false
  };
  notesObj.push(note);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (note, index) {
    let importanceBtnLabel = note.important ? "Unmark as Important" : "Mark as Important";

    // Split the text into lines
    let noteLines = note.text.split("\n");
    // Remove the first line (title) from the lines array
    let descriptionLines = noteLines.slice(1);
    // Join the remaining lines to form the description text
    let descriptionText = descriptionLines.join("\n");

    html += `
      <div class="noteCard my-2 mx-2 card ${note.important ? 'important' : ''}" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text"> ${descriptionText}</p>
          <button id="${index}" onclick="toggleImportance(this.id)" class="btn btn-primary">${importanceBtnLabel}</button>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
      </div>`;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}


// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function to toggle importance of a note
// Function to toggle importance of a note
function toggleImportance(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  const note = notesObj[index];
  note.important = !note.important;

  // Move the note to the top
  if (note.important) {
    notesObj.splice(index, 1); // Remove the note from its current position
    notesObj.unshift(note); // Add the note to the beginning of the array
  } else {
    notesObj.splice(index, 1); // Remove the note from its current position
    notesObj.push(note); // Add the note to the end of the array
  }

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
