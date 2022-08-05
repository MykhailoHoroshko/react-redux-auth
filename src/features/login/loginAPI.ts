import httpClient from "../../app/services/httpClient";

export interface UserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export interface AuthData {
  token: string;
  refreshToken: string;
}

export async function login(
  email: string,
  password: string
): Promise<AuthData & { user: UserInfo }> {
  return httpClient.post({ url: "/api/login", body: { email, password } });
}

export async function logout() {
  return httpClient.post({ url: "/api/logout" });
}
