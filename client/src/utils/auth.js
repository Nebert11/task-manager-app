// Utility functions for authentication and role management

export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== "string" || token.split('.').length !== 3) {
      throw new Error("Invalid token format");
    }
    let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  return decodeToken(token);
};

export const getUserRole = () => {
  const user = getUserFromToken();
  return user?.role || null;
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const isDeveloper = () => {
  return getUserRole() === 'developer';
};

export const getUsername = () => {
  const user = getUserFromToken();
  return user?.username || null;
};