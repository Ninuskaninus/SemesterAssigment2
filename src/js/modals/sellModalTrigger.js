import { errorLogin } from "../modals/errorLogin.js";
const accessToken = localStorage.getItem("token");

export function sellModalTrigger(){
    if(!accessToken){
        errorLogin();
        return;
    } else {
        const maincontainer = document.getElementById("sellModal");
        maincontainer.style.display = "flex";
    }

}