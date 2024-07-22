import axios from "axios";

export const updateApi = async ({ url, slice, dispatch, data, index }) => {
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log(response);
    if (response.status == 200) {
      dispatch(slice({ data: response.data.data, id: index }));
      alert("success");
    }
  } catch (error) {
    alert(error);
  }
};
