import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Call } from "./Pages/Call";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/call" Component={Call}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
