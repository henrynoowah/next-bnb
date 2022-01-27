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