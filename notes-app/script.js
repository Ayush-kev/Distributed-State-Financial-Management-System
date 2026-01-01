const addButton = document.getElementById("add");

// Load notes from localStorage
const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

// Update localStorage with current notes
const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  const notesArray = [];
  notesText.forEach((note) => notesArray.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notesArray));
};

// Create a new note
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  `;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // Initialize content
  textArea.value = text;
  main.innerHTML = marked(text);

  // Delete note
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  // Toggle edit mode
  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    textArea.focus();
  });

  // Update note content live
  textArea.addEventListener("input", (e) => {
    const value = e.target.value;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.appendChild(note);
};

// Add new note button
addButton.addEventListener("click", () => addNewNote(""));

// Load saved notes
if (savedNotes.length) {
  savedNotes.forEach((note) => addNewNote(note));
}
