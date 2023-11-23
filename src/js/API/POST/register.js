const base_url = "https://api.noroff.dev/api/v1/auction";
const register_url = "/auth/register";
const url = base_url + register_url;
const login_url = "/auth/login";
const loginUrl = base_url + login_url;


export function register() {
    const email = document.getElementById("registerEmail").value;
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const avatar = document.getElementById("registerAvatar").value;
    const registerModal = document.getElementById("registerModal");

    // Check if any of the fields are empty
    if (!email || !username || !password || !avatar) {
        console.error("Please fill in all fields");
        return;
    }

    const registerObject = {
        email: email,
        name: username,
        password: password,
        avatar: avatar,
    };

    async function postRegister(url, data) {
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

            console.log(json);

            if (response.ok) {
                registerModal.style.display = "none";

                const loginObject = {
                    email: email,
                    password: password,
                };

                async function postLogin(loginUrl, data) {
                    try {
                      const postData = {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      };
                      const response = await fetch(loginUrl, postData);
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
                
                  postLogin(loginUrl, loginObject);


                
            } else {
                throw new Error(json.error);
            }

            const accessToken = json.accessToken;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("username", json.name);

            return json;
        } catch (error) {
            console.error(error.name + " " + error.message);
        }
    }

    postRegister(url, registerObject);
}


