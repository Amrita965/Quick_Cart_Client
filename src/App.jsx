import { RouterProvider } from "react-router-dom"
import router from "./Routes/Router"
import "toastify-js/src/toastify.css"

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
