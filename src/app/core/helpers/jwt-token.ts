export function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (!payload?.exp) {
    console.warn("Token doesn't have an expiration date");
    return false;
  }

  const expireTime = payload.exp * 1000;
  if (expireTime > Date.now()) {
    console.log("token not expired");
    return false;
  }

  console.warn('Token is expired');
  return true;
}

// Extracts jwt token payload
export function parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64));

  return JSON.parse(jsonPayload);
}
