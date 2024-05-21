import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      App
      <div className="aspect-square">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
