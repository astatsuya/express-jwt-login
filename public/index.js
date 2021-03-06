const handleSubmit = addEventListener("submit", async (e) => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/users", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    // statusコードが400, 500系でもエラー扱いされない。
    console.log(data);
    if (response.status === 201) {
      const { token } = data;
      localStorage.setItem("token", token);
      window.alert("register successful");
      document.getElementById("signInForm").reset();
      window.location.href = "/user";
    }
  } catch (err) {
    console.log(err);
    window.alert("error");
  }
});
