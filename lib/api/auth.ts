import axios from ".";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) => {
  return axios.post("/api/auth/signup", body);
};

export const loginAPI = (body: {email: string, password: string}) => {
  return axios.post("/api/auth/login", body)
}

export const meAPI = () => axios.get<UserType>("/api/auth/me");

export const logoutAPI = () => axios.delete("/api/auth/logout");