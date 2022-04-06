type AnyArguments = any[] | undefined
type MethodHandler = (methodName: string, args: AnyArguments) => Promise<any>

const messageHandlers = new Map<string, MethodHandler>()
let defaultMessageHandler: MethodHandler | undefined

export function sendMessage(methodName: string, args: AnyArguments): Promise<any> {
  if (messageHandlers.has(methodName)) {
    const handler = messageHandlers.get(methodName)
    if (handler)
      return handler(methodName, args)
  }

  if (defaultMessageHandler)
    return defaultMessageHandler(methodName, args)

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ method: methodName, arguments: args }, (response) => {
      const error = chrome.runtime.lastError
      if (error)
        reject(error)
      else if (response?.error)
        reject(response.error)
      else
        resolve(response)
    })
  })
}
