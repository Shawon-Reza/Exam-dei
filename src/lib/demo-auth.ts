"use client";

import { useEffect, useState } from "react";

const demoAuthKey = "chakriova-demo-authenticated";
const authChangeEvent = "chakriova-auth-change";

export function isDemoAuthenticated() {
  return window.sessionStorage.getItem(demoAuthKey) === "true";
}

export function setDemoAuthenticated(isAuthenticated: boolean) {
  if (isAuthenticated) {
    window.sessionStorage.setItem(demoAuthKey, "true");
  } else {
    window.sessionStorage.removeItem(demoAuthKey);
  }

  window.dispatchEvent(new Event(authChangeEvent));
}

export function useDemoAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setIsAuthenticated(isDemoAuthenticated());
    };

    syncAuthState();
    window.addEventListener(authChangeEvent, syncAuthState);

    return () => {
      window.removeEventListener(authChangeEvent, syncAuthState);
    };
  }, []);

  return isAuthenticated;
}
