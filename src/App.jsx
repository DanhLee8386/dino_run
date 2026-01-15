import Game from "./components/mainGame";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Dino Runner</h1>
      <Game />
      <p>Press SPACE to jump</p>
    </div>
  );
}

export default App
