import api from "./apiConfig.js";

const LOCALSTORAGE_KEY = 'token'

export const getUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (username, password) => {
  try {
    const response = await api.post("/users/", { username, password });
    localStorage.setItem(LOCALSTORAGE_KEY, response.data);

    return response.data;
  }

  catch (error) {
    throw error;
  }
};

export const signin = async (username, password) => {
  try {
    const response = await api.post("/users/sign-in/", { username, password });
    localStorage.setItem(LOCALSTORAGE_KEY, response.data);
    console.log('Sign in returns:')
    console.log(response);
    localStorage.setItem("currentUser", username);

    return response.data;
  }

  catch (error) {
    throw error;
  }
};