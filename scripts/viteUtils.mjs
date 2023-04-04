export const genEnv = (env) => Object.keys(env).reduce((acc, key) => {
  const valueString = env[key]

  let realValue = valueString

  if (/^(0|[1-9][0-9]*)$/.test(valueString)) {
    realValue = +valueString
  }

  if (valueString === 'true') {
    realValue = true
  }

  if (valueString === 'false') {
    realValue = false
  }

  if (/^(\{*\}|[*])$/.test(valueString)) {
    realValue = JSON.parse(valueString)
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
