export const updateUserStatus = async (status, user) => {
  try {
    const res = await fetch(`http://localhost:8000/users/${user.uid}`, {
      headers: {
        "content-type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    });
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
};

