/** @jsx jsx */
import {jsx, Global} from "@emotion/core"
import Textfit from "react-textfit"
import {render} from "react-dom"
import Twemoji from "react-twemoji"
import Talk from "./templates/talk-template"

function App() {
  return <Talk />
}

render(<App />, document.getElementById("corgi"))
