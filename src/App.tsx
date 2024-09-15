import { Route, Routes } from "react-router-dom";
import Palletes from "./presentation/demo/Palletes";
import Home from "./presentation/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pallete" element={<Palletes />} />
    </Routes>
  );
}

export default App;
