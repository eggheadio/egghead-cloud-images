const qs = require("querystring")

exports.handler = async function (event, ctx) {
  const {queryStringParameters} = event
  try {
    const imageUrl = `https://res.cloudinary.com/${
      process.env.CLOUD_NAME
    }/image/fetch/${encodeURIComponent(
      `https://objective-cori-862056.netlify.app/.netlify/functions/gen-image?${qs.stringify(
        queryStringParameters
      )}`
    )}`
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: "",
    }
  } catch (e) {
    console.log(e)
  }
}
