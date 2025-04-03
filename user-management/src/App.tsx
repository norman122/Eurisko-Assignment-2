import { TailwindCss } from "./components/pages/TailwindCss";
import { NavBar } from "./components/molecules/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="container w-2xs pt-4 pb-0 pl-4 pr-4">
          <input type="text" placeholder="Search users..." className="border p-2 w-full mb-4" style={{borderColor: '#dddddd' }} />
      </div>
      <TailwindCss />
    </>
  )
}

export default App
