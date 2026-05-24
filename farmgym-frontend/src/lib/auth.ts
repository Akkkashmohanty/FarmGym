import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  sub: string;
  role: string;
  status: string;
  is_admin: boolean;
  exp: number;
};

export function getToken() {

  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

export function removeToken() {

  localStorage.removeItem("token");
}

export function decodeToken() {

  const token = getToken();

  if (!token) {
    return null;
  }

  try {

    return jwtDecode<TokenPayload>(token);

  } catch {

    return null;
  }
}