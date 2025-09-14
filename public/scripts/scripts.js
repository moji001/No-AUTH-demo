document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = e.target;
    const UserData = {
      name: data.username.value,
      email: data.email.value,
      password: data.password.value,
    };

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserData),
      });

      const result = await res.json();
      document.getElementById("log").innerText = result.message;
    } catch (e) {
      document.getElementById("log").innerText = e.message;
    }
  });

/*document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      document.getElementById("log").innerText = result.message;
    } catch (err) {
      document.getElementById("log").innerText = "Error: " + err.message;
    }
  });*/
