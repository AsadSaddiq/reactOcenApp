import axios from "axios";

export const postApi = async ({ url, slice, dispatch, data }) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {},
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log(response);
    if (response.status == 201) {
      dispatch(slice(response.data.data));
      alert("user add successfully");
    }
  } catch (error) {
    alert(error);
  }
};
export const postEpiApi = async ({
  fileUrl,
  epiUrl,
  slice,
  dispatch,
  data,
  file,
}) => {
  let fileConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: fileUrl,
    headers: { "Content-Type": "multipart/form-data" },
    file: file,
  };
  console.log(file);
  try {
    const response = await axios.request(fileConfig);
    console.log("/////////////////////", response);
  } catch (error) {
    alert(error);
  }
  let epiConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: fileUrl,
    headers: {},
    data: data,
  };
  try {
    const response = await axios.request(epiUrl);
    if (response.status == 201) {
      dispatch(slice(response.data.data));
      alert("user add successfully");
    }
  } catch (error) {
    alert(error);
  }
};
