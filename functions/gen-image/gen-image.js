const playwright = require("playwright-aws-lambda")
const fs = require("fs")
const script = fs.readFileSync("./src/talk.js", "utf-8")
import GenerateCourseImage from "./gen-course"

exports.handler = async function (event, ctx) {
  const browser = await playwright.launchChromium()
  const context = await browser._defaultContext
  const page = await context.newPage()

  const {queryStringParameters} = event

  if (queryStringParameters.type === "course") {
    GenerateCourseImage(browser, page)
  } else {
    page.setViewportSize({
      // video poster
      width: 1280,
      height: 720,
      // og image
      // width: 1200,
      // height: 630,
    })
    await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
  
    <body>
      <div id="corgi"><div>NO CORGIS HERE</div></div>
    </body>
  </html>
  `)
    const tags = queryStringParameters.tags
      ? decodeURIComponent(queryStringParameters.tags).split(",")
      : []
    await page.addScriptTag({
      content: `
  window.title = "${queryStringParameters.title || "No Title"}";
  window.tags = ${JSON.stringify(tags)};
  window.author = "${queryStringParameters.author || ""}";
  window.image = "https://joelhooks.com/images/logo.png";
  window.slug = "${queryStringParameters.slug || "No Slug"}";
  `,
    })
    await page.addScriptTag({content: script})
    const boundingRect = await page.evaluate(() => {
      const corgi = document.getElementById("corgi")
      const {x, y, width, height} = corgi.children[0].getBoundingClientRect()

      return {x, y, width, height}
    })

    try {
      await page.waitForResponse(/twemoji.maxcdn.com/, {timeout: 1200})
    } catch (e) {
      console.log(e)
    }

    const screenshotBuffer = await page.screenshot({clip: boundingRect})
    await browser.close()
    return {
      isBase64Encoded: true,
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": screenshotBuffer.length.toString(),
      },
      body: screenshotBuffer.toString("base64"),
    }
  }
}
