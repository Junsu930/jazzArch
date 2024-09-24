import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function getAllBoard() {
  return await apiClient.get('/api/public/getAllBoard');
}

export async function getOneBoard(boardId) {
  return await apiClient.get(`/api/public/getOneBoard/${boardId}`);
}

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

export async function setImages(formData, header) {
  return await apiClient.post('/api/public/image/upload', formData, header);
}

export async function getComment(boardNo) {
  return await apiClient.get(`/api/public/getComment/${boardNo}`);
}

export async function writeBoard(
  title,
  content,
  authorId,
  authorEmail,
  author,
) {
  return await apiClient.post('/api/public/writeBoard', {
    title,
    content,
    authorId,
    authorEmail,
    author,
  });
}
