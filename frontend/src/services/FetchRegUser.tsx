import axios from "axios";

export const FetchRegUser = async (
  email: string,
  password: string | null,
  provider: string,
  label:string
) => {
  try {
    const response = await axios.post(
      `https://movie-mingle-server.vercel.app/createUser`,
      { email, password, provider, label }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
