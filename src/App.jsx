import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingPost, setEditingPost] = useState("");

  const handleNewPost = (e) => {
    setNewPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") return;
    setPosts([...posts, newPost]);
    setNewPost("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingPost(posts[index]);
  };

  const handleEditChange = (e) => {
    setEditingPost(e.target.value);
  };

  const handleEditSubmit = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = editingPost;
    setPosts(updatedPosts);
    setEditingIndex(null);
    setEditingPost("");
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
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

        <ul className="list-group">
          {posts.map((post, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingPost}
                    onChange={handleEditChange}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => handleEditSubmit(index)}>Salva</button>
                </>
              ) : (
                <>
                  {post}
                  <div>
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <img 
                        src="src/assets/img/icons/pencil-solid.svg" 
                        alt="Edit" 
                        width={20} 
                        height={20} 
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
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
