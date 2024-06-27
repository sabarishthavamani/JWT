import axios from "../config/axios";

//adminSignup
export const adminSignup = async (data) => {
  try {
    let respData = await axios({
      url: "/SignUp",
      method: "post",
      data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      token: respData.data.token,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//AdminLogin
export const adminlogin = async (data) => {
  try {
    let respData = await axios({
      url: "/Login",
      method: "post",
      data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      token: respData.data.token,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//Display
export const adminDisplay = async () => {
  try {
    let respData = await axios({
      url: "/adminDisplay",
      method: "get",
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//adminLogout
export const adminLogout = async (data) => {
  try {
    let respData = await axios({
      url: "/Logout",
      method: "post",
      data,
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      token: respData.data.token,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//Signal-Id-Details
export const getsingleuser = async (id) => {
  try {
    let respData = await axios({
      url: `/getsingleuser/${id}`,
      method: "get",
    });
    return {
      status: respData.data.status,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};

//adminUpdate
export const adminUpdate = async (data) => {
  try {
    let respData = await axios({
      url: `/adminUpdate/${data.id}`, // Adjust endpoint and id handling as per your API
      method: "put", // Adjust method based on your API requirements (e.g., put, post)
      data: data, // Pass the data object containing username, Email, Password
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};


//adminUpdate
export const adminDelete = async (id) => {
  try {
    let respData = await axios({
      url: `/adminDelete/${id}`, 
      method: "delete", 
    });
    return {
      status: respData.data.status,
      message: respData.data.message,
      result: respData.data.result,
    };
  } catch (err) {
    return {
      status: err.response.data.status,
      message: err.response.data.message,
      errors: err.response.data.errors,
    };
  }
};