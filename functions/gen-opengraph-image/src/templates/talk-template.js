/** @jsx jsx */
import React from "react"
import {jsx, Global} from "@emotion/core"
import Textfit from "react-textfit"
import {render} from "react-dom"
import Twemoji from "react-twemoji"
import queryString from "querystring"
import get from "lodash/get"

const Design = ({props}) => {
  // url params to develop & test locally
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get("slug")

  function imageBySlug(slug) {
    switch (slug) {
      case "react-eggheadtalks-setting-up-feature-flags-with-react":
        return "https://res.cloudinary.com/dg3gyk0gu/image/upload/v1594636894/egghead%20talks/react-eggheadtalks-setting-up-feature-flags-with-react.png"
      case "react-native-eggheadtalks-lessons-learned-from-building-react-native-apps":
        return "https://res.cloudinary.com/dg3gyk0gu/image/upload/v1594637550/egghead%20talks/react-native-eggheadtalks-lessons-learned-from-building-react-native-apps.png"
      default:
        return null
    }
  }

  const [data, updateData] = React.useState({
    loading: false,
    talk: null,
  })

  React.useEffect(() => {
    updateData({loading: true})
    const talks = `https://egghead.io/api/v1/lessons/${window.slug || slug}`

    fetch(talks)
      .then((res) => res.json())
      .then((talk) => {
        updateData({loading: false, talk: talk})
      })
  }, [updateData, slug])

  const talkTitle = get(data.talk, "title")

  return (
    <div
      css={{
        width: 1280,
        height: 720,
        background: "rgb(255, 255, 255)",
        position: "absolute",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            fontFamily: "system-ui",
          },
          ".emoji": {
            height: "1em",
            width: "1em",
            margin: "0 .05em 0 .1em",
            verticalAlign: "-0.1em",
          },
        }}
      />
      {imageBySlug(window.slug || slug) && (
        <img
          style={{width: "100%", position: "absolute"}}
          src={imageBySlug(window.slug || slug)}
          alt={talkTitle}
        />
      )}

      <h1
        css={{
          color: "gray",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Textfit
          max={256}
          min={24}
          style={{
            lineHeight: 1,
            position: "absolute",
          }}
        >
          <Twemoji options={{className: "emoji", folder: "svg", ext: ".svg"}}>
            {!imageBySlug(window.slug || slug) ? talkTitle : null}
          </Twemoji>
        </Textfit>
      </h1>
    </div>
  )
}

export default Design
