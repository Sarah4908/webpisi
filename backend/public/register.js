const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message;
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Registration successful! Redirecting to login...";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

  } catch (err) {
    msg.textContent = "Something went wrong";
    msg.style.color = "red";
  }
});
