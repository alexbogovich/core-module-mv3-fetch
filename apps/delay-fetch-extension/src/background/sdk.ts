import { FetcherService } from '~/background/fetcher/FetcherService'

export interface SDK {
  fetchers: FetcherService
}

async function provideSDK(): Promise<SDK> {
  const fetchers = new FetcherService()
  fetchers.init()

  return {
    fetchers,
  }
}

const sdk: Promise<SDK> = provideSDK()

export async function useSDK() {
  return await sdk
}
