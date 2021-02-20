const logout = async () => {
  try {
    const response = await fetch("http://localhost:3000/users/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
    });
    const data = await response.json();
    // statusコードが400, 500系でもエラー扱いされない。
    console.log(data);
    localStorage.setItem("token", "");
    window.location.href = "/login";
  } catch (err) {
    console.log(err);
    window.alert("error");
  }
};

const handleSubmit = addEventListener("submit", async (e) => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/users/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // statusコードが400, 500系でもエラー扱いされない。
    if (response.status === 200) {
      window.alert("edit completed");
      document.getElementById("editForm").reset();
    }
  } catch (err) {
    console.log(err);
    window.alert("error");
  }
});
