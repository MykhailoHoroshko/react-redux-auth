export interface BaseOptions {
  url: string;
  headers?: any;
  body?: any;
  params?: any;
}

export interface GetOptions extends BaseOptions {}
export interface PostOptions extends BaseOptions {}
export interface PutOptions extends BaseOptions {}
export interface DeleteOptions extends BaseOptions {}

class FetchApiClient {
  token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getHeaders(baseHeaders?: Record<string, string>): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...baseHeaders,
    });
    if (this.token) {
      headers.append("Authorization", `Bearer ${this.token}`);
    }
    return headers;
  }

  async get<T>(options: GetOptions): Promise<T> {
    const response = await fetch(options.url, {
      method: "get",
      headers: this.getHeaders(options.headers),
    });

    if (response.ok) {
      return await response.json();
    }

    throw response;
  }

  async post<T>(options: PostOptions): Promise<T> {
    const response = await fetch(options.url, {
      method: "post",
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(options.body),
    });

    if (response.ok) {
      return await response.json();
    }

    throw response;
  }

  async put<T>(options: PutOptions): Promise<T> {
    const response = await fetch(options.url, {
      method: "put",
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(options.body),
    });

    if (response.ok) {
      return await response.json();
    }

    throw response;
  }

  async delete<T>(options: PostOptions): Promise<T> {
    const response = await fetch(options.url, {
      method: "delete",
      headers: this.getHeaders(options.headers),
      body: JSON.stringify(options.body),
    });

    if (response.ok) {
      return await response.json();
    }

    throw response;
  }
}

export default new FetchApiClient();
