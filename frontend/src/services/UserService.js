import { toast } from "react-toastify";
import api from "../api";

export const registerUser = async function (registerData) {
  try {
    let registerUserRes = await api.post("/users/register", registerData, {
      withCredentials: true,
    });
    return registerUserRes;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error("You are already registered. Please Login");
    } else if (error.response && error.response.status === 500) {
      toast.error("Something went wrong");
    }
  }
};

export const verifyEmail = async function (verifyData) {
  try {
    let verifyEmailRes = await api.post("/users/verify-code", verifyData, {
      withCredentials: true,
    });
    return verifyEmailRes;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("Email not found. Please check your email address.");
    } else if (error.response && error.response.status === 400) {
      toast.error("Invalid Verification Code. Please check your input.");
    } else if (error.response && error.response.status === 500) {
      toast.error("Something went wrong. Please try again later.");
    }
  }
};

export const loginUser = async function (loginData) {
  try {
    let loginUserRes = await api.post("/users/login", loginData, {
      withCredentials: true,
    });
    return loginUserRes;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 401) {
      toast.error("Invalid Password");
    } else if (error.response && error.response.status === 500) {
      toast.error("Something went wrong. Please try again later.");
    }
  }
};

export const logoutUser = async function () {
  try {
    let logoutUserRes = await api.get("/users/logout", {
      withCredentials: true,
    });
    return logoutUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Occurred. Try again later");
    }
  }
};

export const fetchLoggedinUser = async function () {
  try {
    let fetchLoggedinUserRes = await api.get("/users/profile", {
      withCredentials: true,
    });
    return fetchLoggedinUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching data");
    }
  }
};

export const updateUser = async function (formdata) {
  try {
    let updateUserRes = await api.put("/users/update/profile", formdata, {
      withCredentials: true,
    });
    return updateUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Updating User");
    }
  }
};

export const forgotPassword = async function (email) {
  try {
    let forgotPasswordRes = await api.post(
      "/users/forgot-password",
      { email },
      { withCredentials: true }
    );
    return forgotPasswordRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Something went wrong");
    }
  }
};

export const resetPassword = async function (token, password) {
  try {
    let resetPasswordRes = await api.post(
      `/users/reset-password/${token}`,
      { password },
      { withCredentials: true }
    );
    return resetPasswordRes;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("Reset Token not found");
    } else if (error.response && error.response.status === 500) {
      toast.error("Error Resetting Password");
    }
  }
};

export const getAllUsers = async function () {
  try {
    let getAllUsersRes = await api.get("/users/all-users", {
      withCredentials: true,
    });
    return getAllUsersRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log(error.response.data)
    }
  }
};

export const followUser = async function (id) {
  try {
    let followUserRes = await api.post(
      `/users/follow/${id}`,
      {},
      { withCredentials: true }
    );
    return followUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error following user");
    }
  }
};

export const unfollowUser = async function (id) {
  try {
    let unfollowUserRes = await api.post(
      `/users/unfollow/${id}`,
      {},
      { withCredentials: true }
    );
    return unfollowUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error Unfollowing user");
    }
  }
};

export const getAllFollowers = async function (userId) {
  try {
    let getAllFollowersRes = await api.get(`/users/followers/${userId}`, {
      withCredentials: true,
    });
    return getAllFollowersRes;
  } catch (error) {
    console.log(error.message);
  }
};

export const getOneUser = async function (id) {
  try {
    let getOneUserRes = await api.get(`/users/${id}`, {
      withCredentials: true,
    });
    return getOneUserRes;
  } catch (error) {
    console.log(error.message);
  }
};
