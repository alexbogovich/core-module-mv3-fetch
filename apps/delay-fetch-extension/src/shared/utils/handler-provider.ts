import { sendMessage } from './messaging'

const handlers = new Map<string, any>()

type IHandlerProvider = (parentPath?: string) => ProxyHandler<any>

const handlerProvider: IHandlerProvider = (parentPath = '') => ({
  get(target, prop) {
    const path = parentPath ? `${parentPath}.${String(prop)}` : String(prop)
    if (handlers.has(path))
      return handlers.get(path)

    const handler = new Proxy(() => {}, handlerProvider(String(path)))
    handlers.set(path, handler)
    return handler
  },
  apply(target, that, args) {
    return sendMessage(parentPath, args)
  },
})

export default handlerProvider
