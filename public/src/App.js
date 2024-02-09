import { BrowserRouter , Route ,Routes} from "react-router-dom"
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./components/Setavatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/setavatar" element={<SetAvatar/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
