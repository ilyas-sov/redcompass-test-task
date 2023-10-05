const baseUrl = process.env.REACT_APP_BASE_URL;

export async function fetchAllUsers() {
  const response = await fetch(`${baseUrl}/users`);
  const usersData = await response.json();

  return usersData;
}

export async function fetchUserTransactions(id: string) {
  const response = await fetch(`${baseUrl}/users/${id}`);
  const userData = await response.json();

  return userData;
}
