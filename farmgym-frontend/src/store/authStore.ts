"use client";

class AuthStore {

  getToken() {

    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  }

  logout() {

    localStorage.removeItem(
      "token"
    );

    window.location.href = "/login";
  }
}

const authStore = new AuthStore();

export default authStore;