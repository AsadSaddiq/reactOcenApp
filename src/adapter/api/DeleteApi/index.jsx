import axios from "axios";

export const deleteApi = async ({ url, slice, dispatch, index }) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
  };
  try {
    const response = await axios.request(config);
    console.log(response);
    if (response.status == 200) {
      dispatch(slice(index));
      alert("Deleted successfully");
    }
  } catch (error) {
    alert(error);
  }
};
