import { useState, useEffect } from "react";
import axios from "axios";
import Paginacion from "./components/Paginacion";
import { FcCheckmark,FcCancel } from "react-icons/fc";
import "./App.css";

function App() {
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/todos`;
    axios.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);


  const indexLastPost = currentPage * postPerPage
  const indexFirstPost = indexLastPost - postPerPage
  const currentPost = data.slice(indexFirstPost, indexLastPost)

  const addUser = (user) =>{
    setData([user,...data])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser(user)
  }

  const paginate =(pageNumber) => setCurrentPage(pageNumber)
  const handleChange = (e) => {
    setUser({
      ...user,
      id: parseInt(Math.random()*1000),
      userId: parseInt(Math.random()*1000),
      [e.target.name]:e.target.value,
      completed: false
    })
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="">
      <form action="" onSubmit={handleSubmit}>
        <div className="input-group w-50 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New user"
            name="title"
            aria-describedby="button-addon2"
            onChange={handleChange}
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Crear
          </button>
        </div>
       
      </form>
      <button
            className="btn btn-outline-secondary"
            type="submit"
            id=""
            onClick={() => window.location.reload(false)}
          >
           refrescar
          </button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Description</th>
            <th scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((user) => (
            <tr key={user.id} >
              <th scope="row">{user.id}</th>
              <td>{user.userId}</td>
              <td>{user.title}</td>
              <td>{user.completed ? <FcCheckmark/> : <FcCancel/>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginacion postsPerPage={postPerPage} totalPosts={data.length} paginate={paginate}/>
    </div>
  );
}

export default App;
