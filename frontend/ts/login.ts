interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById(
    "loginForm"
  ) as HTMLFormElement | null;
  const signupForm = document.getElementById(
    "signupForm"
  ) as HTMLFormElement | null;

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const email = (document.getElementById("login_email") as HTMLInputElement)
        .value;
      const password = (
        document.getElementById("login_password") as HTMLInputElement
      ).value;

      const loginData: LoginData = { email, password };

      try {
        const response = await fetch("http://localhost:7000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const token: string = await response.text();
          console.log("Login Successful, Token:", token);

          // Store the token in localStorage
          localStorage.setItem("jwtToken", token);
          window.location.href = "index.html"; // Redirect to dashboard
        } else {
          const errorData = await response.text();
          alert(errorData || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  }

  // Handle signup form submission
  if (signupForm) {
    signupForm.addEventListener("submit", async (e: Event) => {
      e.preventDefault();

      const username = (
        document.getElementById("signup_username") as HTMLInputElement
      ).value;
      const email = (
        document.getElementById("signup_email") as HTMLInputElement
      ).value;
      const password = (
        document.getElementById("signup_password") as HTMLInputElement
      ).value;

      const signupData: SignupData = { username, email, password };

      try {
        const response = await fetch("http://localhost:7000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        if (response.ok) {
          const token: string = await response.text();
          console.log("Signup Successful, Token:", token);

          // Store the token in localStorage
          localStorage.setItem("jwtToken", token);
          alert("Signup successful! Redirecting to dashboard...");
          window.location.href = "index.html"; // Redirect to dashboard
        } else {
          const errorData = await response.text();
          alert(errorData || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  }
});
