document.addEventListener("DOMContentLoaded", function () {
  let notes = JSON.parse(localStorage.getItem("quickNotes")) ?? [];

  const dialog = document.getElementById("note-dialog");
  const newNoteTitle = document.getElementById("new-note-title");
  const newNoteContent = document.getElementById("new-note-content");
  const notesGrid = document.getElementsByClassName(
    "notes-container-at-load"
  )[0];
  const addNoteBtn1 = document.getElementById("add-note-btn");
  const addNoteBtn2 = document.getElementById("add-note-icon");
  const closeNoteBtn1 = document.getElementById("close-icon-btn");
  const closeNoteBtn2 = document.getElementById("close-text-btn");
  const recycleBtn = document.getElementById("recycle-bin-btn");
  const noteForm = document.getElementById("note-form");

  notesGrid.className =
    notes.length !== 0 ? "notes-container" : "notes-container-at-load";

  function openNoteDialog() {
    dialog.showModal();
    newNoteTitle.focus();
  }

  function saveNote() {
    event.preventDefault();
    let newNoteTitleValue = newNoteTitle.value.trim();
    let newNoteContentValue = newNoteContent.value.trim();
    if (newNoteTitleValue && newNoteContentValue) {
      notes.unshift({ Title: newNoteTitleValue, Note: newNoteContentValue });
      // (newNoteTitle.value = ""), (newNoteContent.value = "");
      saveNoteToStorage();
    } else {
      alert("Please fill input fields");
    }
  }

  function saveNoteToStorage() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
  }

  function closeNoteDialog() {
    dialog.close();
  }

  function renderNotes() {
    if (notes.length !== 0) {
      notesGrid.className = "notes-container";
      notesGrid.innerHTML = "";

      for (let note of notes) {
        const noteCell = document.createElement("div");
        noteCell.className = "note-cell";
        const noteTitle = document.createElement("p");
        const noteContent = document.createElement("p");
        noteCell.appendChild(noteTitle);
        noteCell.appendChild(noteContent);
        noteTitle.textContent = note.Title;
        noteContent.textContent = note.Note;
        notesGrid.appendChild(noteCell);
      }
    } else {
      notesGrid.innerHTML = `<p id="empty-placeholder">Nothing saved yet...</p>`;
    }
  }

  function deleteAllNotes() {
    localStorage.removeItem("quickNotes");
    notes = [];
    notesGrid.className = "notes-container-at-load";
    notesGrid.innerHTML = `<p id="empty-placeholder">Nothing saved yet...</p>`;
  }

  addNoteBtn1.addEventListener("click", openNoteDialog);
  addNoteBtn2.addEventListener("click", openNoteDialog);
  closeNoteBtn1.addEventListener("click", closeNoteDialog);
  closeNoteBtn2.addEventListener("click", closeNoteDialog);
  recycleBtn.addEventListener("click", deleteAllNotes);
  newNoteTitle.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      newNoteContent.focus();
    }
  });
  noteForm.addEventListener("submit", function () {
    saveNote();
    renderNotes();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === this) {
      closeNoteDialog();
    }
  });

  renderNotes();
});
