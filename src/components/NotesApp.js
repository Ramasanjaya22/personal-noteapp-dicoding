import React from "react";
import { getInitialData } from "../utils";
import NavigationBar from "./NavigationBar";
import ActiveNotes from "./ActiveNotes";
import AddNotes from "./AddNotes";
import ArchiveNotes from "./ArchiveNotes";
import Footer from "./Footer";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      searchNotes: getInitialData(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onChangeArchiveHandler = this.onChangeArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    const searchNotes = this.state.searchNotes.filter((note) => note.id !== id);
    this.setState({
      notes: notes,
      searchNotes: searchNotes,
    });
  }

  onChangeArchiveHandler(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.map((note) =>
          note.id === id ? { ...note, archived: !note.archived } : note
        ),
        searchNotes: prevState.searchNotes.map((note) =>
          note.id === id ? { ...note, archived: !note.archived } : note
        ),
      };
    });
  }

  onSearchHandler(e) {
    this.setState((prevState) => {
      return {
        searchNotes: prevState.notes.filter((note) =>
          note.title.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      };
    });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
          },
        ],
        searchNotes: [
          ...prevState.searchNotes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });
  }

  addToLocalStorage({ title, body }) {
    this.onAddNoteHandler({ title, body });
  }

  render() {
    return (
      <>
        <NavigationBar onSearch={this.onSearchHandler} />
        {localStorage.setItem("NOTES_APP", JSON.stringify(this.state.notes))}
        <div className="note-app__body">
          <AddNotes addNote={this.addToLocalStorage} />
          <ActiveNotes
            notes={this.state.searchNotes}
            onDelete={this.onDeleteHandler}
            onChangeArchive={this.onChangeArchiveHandler}
          />
          <ArchiveNotes
            notes={this.state.searchNotes}
            onDelete={this.onDeleteHandler}
            onChangeArchive={this.onChangeArchiveHandler}
          />
        </div>
        <Footer />
      </>
    );
  }
}

export default NotesApp;
