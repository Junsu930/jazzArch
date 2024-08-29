import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function getAllClub() {
  return await apiClient.get('/api/public/getClub');
}

export async function getAllRegion() {
  return await apiClient.get('/api/public/getRegion');
}

export async function doLogin(loginData) {
  return await apiClient.post('/api/public/login', loginData);
}

export async function doSignUp(signUpData) {
  return await apiClient.post('/api/public/doSignUp', signUpData);
}

export async function getLoginData(token) {
  const response = await apiClient.get('/api/public/getLoginData', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getEmailDupCheck(email) {
  return await apiClient.get('/api/public/check-email?email=' + email);
}
export async function getNicknameDupCheck(nickname) {
  return await apiClient.get('/api/public/check-nickname?nickname=' + nickname);
}
