import type { DelayData } from '~/background/fetcher/NetworkDelayFetcher'
import {
  Fetcher10Seconds,
  Fetcher120Seconds,
  Fetcher30Seconds,
  Fetcher60Seconds,
} from '~/background/fetcher/NetworkDelayFetcher'
import type { PromisifyMe } from '~/shared/psdk'

export interface FetcherState { d120s: DelayData; d60s: DelayData; d30s: DelayData; d10s: DelayData }

export class FetcherService implements PromisifyMe {
  private fetcher10Seconds: Fetcher10Seconds
  private fetcher30Seconds: Fetcher30Seconds
  private fetcher60Seconds: Fetcher60Seconds
  private fetcher120Seconds: Fetcher120Seconds

  constructor() {
    this.fetcher10Seconds = new Fetcher10Seconds()
    this.fetcher30Seconds = new Fetcher30Seconds()
    this.fetcher60Seconds = new Fetcher60Seconds()
    this.fetcher120Seconds = new Fetcher120Seconds()
  }

  init = () => {
    this.fetcher10Seconds.update()
    this.fetcher30Seconds.update()
    this.fetcher60Seconds.update()
    this.fetcher120Seconds.update()
  }

  getState = (): FetcherState => ({
    d10s: this.fetcher10Seconds.data,
    d30s: this.fetcher30Seconds.data,
    d60s: this.fetcher60Seconds.data,
    d120s: this.fetcher120Seconds.data,
  })

  PROMISIFY_EXPORT_ID = 'FetcherService'
}
