const baseURL = 'http://localhost:3000/api/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return response
}

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
  const response = await fetch(`${baseURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({firstName, lastName, email, password}),
  });

  return response
}