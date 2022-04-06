import type { DynamicFetcherArgs } from '@softomate/core-module'
import { DynamicFetcher } from '@softomate/core-module'

interface Response {
  time: string
  message: string
  duration: number
}

export interface DelayData {
  time: Date
  message: string
  duration: number
}

abstract class NetworkDelayFetcher extends DynamicFetcher<DelayData, Response> {
  protected constructor(args: DynamicFetcherArgs) {
    super(args)
  }

  parse(data: Response): DelayData {
    console.log(`Parse data for ${this.name}`, data)
    return {
      time: new Date(data.time),
      message: data.message,
      duration: data.duration,
    }
  }

  cachePrepare(data: DelayData): any {
    return {
      time: data.time.toISOString(),
      message: data.message,
      duration: data.duration,
    }
  }

  cacheParse(cache: any): DelayData {
    return {
      time: new Date(cache.time),
      message: cache.message,
      duration: cache.duration,
    }
  }

  fetch(url?: string, options?: Partial<RequestInit>): Promise<Response> {
    console.log(`Fetching ${url} for ${this.name}`)
    return super.fetch(url, options)
  }
}

export class Fetcher10Seconds extends NetworkDelayFetcher {
  constructor() {
    super({
      name: 'FetcherDelay10Seconds',
      url: 'http://localhost:8080/with-delay?d=10s',
    })
  }
}

export class Fetcher30Seconds extends NetworkDelayFetcher {
  constructor() {
    super({
      name: 'FetcherDelay30Seconds',
      url: 'http://localhost:8080/with-delay?d=30s',
    })
  }
}

export class Fetcher60Seconds extends NetworkDelayFetcher {
  constructor() {
    super({
      name: 'FetcherDelay60Seconds',
      url: 'http://localhost:8080/with-delay?d=60s',
    })
  }
}

export class Fetcher120Seconds extends NetworkDelayFetcher {
  constructor() {
    super({
      name: 'FetcherDelay120Seconds',
      url: 'http://localhost:8080/with-delay?d=120s',
    })
  }
}
