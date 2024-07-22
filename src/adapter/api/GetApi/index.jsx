import axios from "axios";

export const getApi = async ({ url, slice, dispatch }) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    if (response.status == 200) {
      dispatch(slice(response.data.data));
    }
  } catch (error) {
    alert(error);
  }
};
