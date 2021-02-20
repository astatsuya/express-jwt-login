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
  } catch (err) {
    console.log(err);
    window.alert("error");
  }
});
