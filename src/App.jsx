

import { useState } from "react"


function App() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleNewPost = (e) => {
    setNewPost(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts(() => [...posts, newPost])
    setNewPost('')
  }


  return (

    <>
      <div className="container">
        <h2>Aggiungi posts</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newPost}
            onChange={handleNewPost}
            placeholder="Inserisci un titolo..."
          />
          <button type="submit">Aggiungi</button>
        </form>

        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              {post}
            </li>
          ))}
        </ul>

      </div>
    </>
  )
}

export default App
