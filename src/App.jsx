import { useState } from "react";

function App() {
  // Stato per gestire la lista dei post
  const [posts, setPosts] = useState([]);
  // Stato per gestire il valore del nuovo post
  const [newPost, setNewPost] = useState("");
  // Stato per gestire l'indice del post in fase di modifica
  const [editingIndex, setEditingIndex] = useState(null);
  // Stato per gestire il valore del post in fase di modifica
  const [editingPost, setEditingPost] = useState("");

  // Funzione per aggiornare lo stato quando l'utente scrive un nuovo post
  const handleNewPost = (e) => {
    setNewPost(e.target.value);
  };

  // Funzione per aggiungere un nuovo post alla lista
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene il ricaricamento della pagina
    if (newPost.trim() === "") return; // Controlla che il campo non sia vuoto
    setPosts([...posts, { id: crypto.randomUUID(), title: newPost }]); // Aggiunge il nuovo post alla lista
    setNewPost(""); // Resetta il campo di input
  };

  // Funzione per avviare la modifica di un post
  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingIndex(id); // Imposta l'ID del post in fase di modifica
    setEditingPost(postToEdit.title); // Imposta il valore corrente del post nell'input di modifica
  };

  // Funzione per aggiornare il valore del post modificato
  const handleEditChange = (e) => {
    setEditingPost(e.target.value);
  };

  // Funzione per salvare la modifica del post
  const handleEditSubmit = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editingIndex ? { ...post, title: editingPost } : post
    );
    setPosts(updatedPosts); // Aggiorna la lista con il post modificato
    setEditingIndex(null); // Esce dalla modalità modifica
    setEditingPost(""); // Resetta il campo di input della modifica
  };

  // Funzione per eliminare un post dalla lista
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-3">Aggiungi posts</h2>
        <form onSubmit={handleSubmit} className="mb-3 d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={newPost}
            onChange={handleNewPost}
            placeholder="Inserisci un titolo..."
          />
          <button type="submit" className="btn btn-primary">Aggiungi</button>
        </form>

        {/* Mostra un messaggio se non ci sono post */}
        {posts.length === 0 && <p className="text-muted">Nessun post disponibile. Aggiungine uno!</p>}

        <ul className="list-group">
          {/* Ciclo sui post per visualizzarli */}
          {posts.map((element) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={element.id}>   {/* la key serve per dare l' id a ogni elemento creato */}
              {editingIndex === element.id ? (
                <>
                  {/* Input per modificare il post */}
                  <input
                    type="text"
                    value={editingPost}
                    onChange={handleEditChange}
                  />

                  {/* Bottone per modificare il post */}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleEditSubmit(element.id)}
                  >
                    Salva
                  </button>

                </>
              ) : (
                <>
                  {element.title}
                  <div>
                    {/* Bottone per modificare il post */}
                    <button
                      onClick={() => handleEdit(element.id)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <img
                        src="src/assets/img/icons/pencil-solid.svg"
                        alt="Edit"
                        width={20}
                        height={20}
                      />
                    </button>
                    {/* Bottone per eliminare il post */}
                    <button
                      onClick={() => handleDelete(element.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <img
                        src="src/assets/img/icons/trash-can-solid.svg"
                        alt="trash"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;