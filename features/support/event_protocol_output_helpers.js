import path from 'path'

export function normalizeEventProtocolOutput(str, cwd) {
  const normalizedBaseDir = cwd.replace(/\\/g, '/')
  return (
    str
      .replace(/"duration":\d*/g, '"duration":0')
      .replace(/<cwd>/g, normalizedBaseDir)
      .replace(
        /"uri":"([^"]*)"/g,
        (match, uri) => `"uri":"${path.normalize(uri)}"`
      )
      // Converting windows stack trace
      //    C:\\project\\path\\features\\support/code.js
      //      to
      //    features/support/code.js
      .replace(/"exception":"([^"]*)"/g, (match, exception) => {
        const updatedException = exception
          .replace(/\\\\/g, '\\')
          .replace(cwd, '')
          .replace(/\\/g, '/')
          .replace('/features', 'features')
        return `"exception":"${updatedException}"`
      })
  )
}
