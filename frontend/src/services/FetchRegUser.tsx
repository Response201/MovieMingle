import axios from "axios";

export const FetchRegUser = async (
  email: string,
  password: string | null,
  provider: string
) => {
  try {
    const response = await axios.post(
      `https://movie-mingle-server.vercel.app/register`,
      { email, password, provider }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
