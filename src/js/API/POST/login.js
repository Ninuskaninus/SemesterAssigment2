const base_url = "https://api.noroff.dev/api/v1/auction";
const login_url = "/auth/login";
const url = base_url + login_url;

export function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginModal = document.getElementById("errorLoginModal");

  const loginObject = {
    email: email,
    password: password,
  };

  async function postLogin(url, data) {
    try {
      const postData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, postData);
      const json = await response.json();

      if (response.ok) {
        loginModal.style.display = "none";
      } else {
        throw new Error(json.error);
      }

      const accesToken = json.accessToken;
      localStorage.setItem("token", accesToken);
      localStorage.setItem("username", json.name);

      return json;
    } catch (error) {
      console.log(error.name + " " + error.message);
    }
  }

  postLogin(url, loginObject);
}
