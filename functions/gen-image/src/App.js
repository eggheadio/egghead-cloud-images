import React from "react"
import Talk from "./templates/talk-template"

export default function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Talk />
      </div>
    </div>
  )
}
