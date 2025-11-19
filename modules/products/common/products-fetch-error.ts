export class ProductsFetchError extends Error {
  constructor(message: string, public statusCode?: number, public cause?: unknown) {
    super(message)
    this.name = 'ProductsFetchError'
  }
}