export const login = async (formData) => {
  const req = await fetch(`http://localhost:3000/users/login/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("dev", data.user.dev);
    return {
      status: req.status,
      message: data.message,
      user: data.user,
    };
  }
  return {
    status: req.status,
    message: data.message,
  };
};

export const addUser = async (formData) => {
  const req = await fetch(`http://localhost:3000/users/add-user/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.payload.username);
    localStorage.setItem("email", data.payload.email);
    localStorage.setItem("dev", data.payload.dev);
    return {
      status: req.status,
      message: data.message,
      user: data.payload,
    };
  }
  return {
    status: req.status,
    message: data.message,
  };
};

export const getFriends = async (formData) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/users/get-friends`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const getUserProfile = async (id) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/users/get-user-profile/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
