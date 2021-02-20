const handleSubmit = addEventListener("submit", async (e) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    // statusコードが400, 500系でもエラー扱いされない。
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      const { token } = data;
      localStorage.setItem("token", token);
      window.alert("login successful");
      document.getElementById("loginForm").reset();
      window.location.href = "/user";
    }
  } catch (err) {
    console.log(err);
    window.alert("error");
  }
});
