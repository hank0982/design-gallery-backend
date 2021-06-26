export class PaginationResult<T> {
  results: T[];
  skip: number;
  limit: number;
  constructor(results: T[], skip: number, limit: number) {
    this.results = results;
    this.skip = skip;
    this.limit = limit;
  }

  toPayload() {
    return {
      count: this.results.length,
      nextSkip: this.results.length + this.skip,
      results: this.results,
    };
  }
}
