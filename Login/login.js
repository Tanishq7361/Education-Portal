const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const viewPass = document.querySelectorAll(".inp i");
const confirmPassInput = document.querySelector("#confirmpass");
const submit = document.querySelector(".submit button");
const signupBtn = document.querySelector(".signup a");

const validateForm = (event) => {
    const isSignUp = submit.innerText === "Sign Up";

    if (!nameInput.value.trim()) {
        alert("Please, Enter Your Name!!");
        nameInput.focus();
        event.preventDefault();
        return false;
    } else if (!emailInput.value.trim()) {
        alert("Please, Enter Your Email!!");
        emailInput.focus();
        event.preventDefault();
        return false;
    } else if (!passwordInput.value.trim()) {
        alert("Please, Enter Password!!");
        passwordInput.focus();
        event.preventDefault();
        return false;
    } else if (passwordInput.value.includes(" ")) {
        alert("Password CANNOT Contain Spaces!");
        passwordInput.focus();
        event.preventDefault();
        return false;
    } else if (isSignUp) {
        if (!confirmPassInput.value.trim()) {
            alert("Please, Enter Confirm Password!!");
            confirmPassInput.focus();
            event.preventDefault();
            return false;
        } else if (confirmPassInput.value !== passwordInput.value) {
            alert("Password and Confirm Password Do NOT Match!!");
            confirmPassInput.focus();
            event.preventDefault();
            return false;
        }
    }
    return true;
};

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.classList.add("focus");
    });
    input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focus");
    });
});

viewPass.forEach(pass => {
    pass.addEventListener("click", () => {
        const input = pass.previousElementSibling;

        if (input.type === "password") {
            input.type = "text";
            pass.classList.remove("fa-eye");
            pass.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            pass.classList.remove("fa-eye-slash");
            pass.classList.add("fa-eye");
        }
    });
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const isSignUp = submit.innerText === "Sign Up";

    if (validateForm(event)) {
        let user = nameInput.value.trim();
        let mail = emailInput.value.trim();
        let pass = passwordInput.value.trim();

        if (isSignUp) {
            
            localStorage.setItem("user", user);
            localStorage.setItem("mail", mail);
            localStorage.setItem("pass", pass);
            alert("Sign Up Successful!! Now Log In..");

            switchToLogin();
        } else {
            
            if (
                user === localStorage.getItem("user") &&
                mail === localStorage.getItem("mail") &&
                pass === localStorage.getItem("pass")
            ) {
                localStorage.setItem("loggedIn", true);
                window.location.href = "../index.html";
            } else {
                alert("You Are Not Signed Up.. So Sign Up First OR Check Credentials Again..");
            }
        }
    }
});

const switchToLogin = () => {
    submit.innerText = "Login";
    document.querySelector(".heading h1").innerText = "Login";
    document.querySelector(".signup p").innerText = "Don't have an account?";
    document.querySelector(".signup a").innerText = "Sign Up";
    document.querySelector(".container").style.height = "72vh";
    document.querySelector(".container").style.width = "25vw";
    document.querySelector(".confirmpass").classList.add("hide");
};

signupBtn.addEventListener("click", () => {
    if (submit.innerText === "Login") {
        submit.innerText = "Sign Up";
        document.querySelector(".heading h1").innerText = "Sign Up";
        document.querySelector(".signup p").innerText = "Already have an account?";
        document.querySelector(".signup a").innerText = "Login";
        document.querySelector(".container").style.height = "85vh";
        document.querySelector(".container").style.width = "27vw";
        document.querySelector(".confirmpass").classList.remove("hide");
    } else {
        switchToLogin();
    }
});
