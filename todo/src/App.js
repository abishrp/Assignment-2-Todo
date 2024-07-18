import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Todo from "./Components/Todo";


const App = () => {
  return (
    <div className="App">
      <div className="nav">
        {
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="todo">Todo</Link>
            </li>
           
          </ul>
        }
      </div>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={<Todo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
//