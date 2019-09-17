async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''

  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token'})
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  if (bearerToken !== process.env.API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized request' })
  } else {
    next()
  }
}
module.exports = {
  requireAuth
}
