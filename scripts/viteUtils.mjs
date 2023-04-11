export const genEnv = (env) => Object.keys(env).reduce((acc, key) => {
  const valueString = env[key]

  let realValue = valueString

  try {
    realValue = JSON.parse(valueString)
  } catch (err) {
    console.log('')
  }

  acc[key] = realValue

  return acc
}, {})

export const genProxy = (proxy) => Object.keys(proxy).reduce((acc, item) => {
  const target = proxy[item]
  acc[item] = {
    target,
    changeOrigin: true,
    ws: true,
    rewrite: path => path.replace(new RegExp(`^${item}`), ''),
    secure: /^https:\/\//.test(target)
  }
  return acc
}, {})
