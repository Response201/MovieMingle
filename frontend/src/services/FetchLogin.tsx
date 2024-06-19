import axios from "axios";

export const FetchLogin = async (email: string, password: string | null) => {
  try {
    const response = await axios.post(
      `https://movie-mingle-server.vercel.app/login`,
      { email, password }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
