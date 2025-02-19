const logoutbtn = document.querySelector(".navbar .logout");

let loggedIn = localStorage.getItem("loggedIn");

if(loggedIn) {
    logoutbtn.innerText = "Logout";
    logoutbtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "Login/login.html";
    });
} else {
    logoutbtn.innerText = "Login";
    logoutbtn.addEventListener("click", () => {
        window.location.href = "Login/login.html";
    });
    setTimeout(() => {
        alert("You Are Not Logged In, Please Login..!!");
    }, 6000);
}

document.querySelector(".thumbnail").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelectorAll(".courses .boxes .box").forEach((box) => {
    box.addEventListener("click", () => {
        window.location.href = "Course/course.html";
    });
});

let getCol1 = document.querySelector("#circle1");
let getCol2 = document.querySelector("#circle2");
let getCol3 = document.querySelector("#circle3");
let i=0;
 
let interval = setInterval(() => {
    getCol1.style.background="conic-gradient(crimson 0deg,crimson "+i+"deg,white "+i+"deg,white)";
    getCol2.style.background="conic-gradient(yellow 0deg,yellow "+i+"deg,white "+i+"deg,white)";
    getCol3.style.background="conic-gradient(green 0deg,green "+i+"deg,white "+i+"deg,white)";
    i++;
    if(i > 360) {
        clearInterval(interval);
    }
}, 25);

let currNum1 = 0;
let currNum2 = 0;
let currNum3 = 0;
let intervalId1, intervalId2, intervalId3;
const inerNum = document.querySelectorAll(".iner");

const updateNumber1 = () => {
    document.querySelector("#iner1").innerText = currNum1 + "+";

    currNum1 += 5;

    if (currNum1 > 2500) {
        clearInterval(intervalId1);
    }
};

const updateNumber2 = () => {
    document.querySelector("#iner2").innerText = currNum2 + "+";

    currNum2 += 1;

    if (currNum2 > 500) {
        clearInterval(intervalId2);
    }
};

const updateNumber3 = () => {
    document.querySelector("#iner3").innerText = currNum3 + "+";

    currNum3 += 20;

    if (currNum3 > 10000) {
        clearInterval(intervalId3);
    }
};

window.onload = () => {
    updateNumber1();
    updateNumber2();
    updateNumber3();

    intervalId1 = setInterval(updateNumber1, 18);
    intervalId2 = setInterval(updateNumber2, 18);
    intervalId3 = setInterval(updateNumber3, 18);
};

let defaultMsgTimeout;

const courses = {
    'java': 'The Java course costs ₹969 and takes 3 months. Do you want to continue?',
    'c++': 'The C++ course costs ₹999++ and takes 4 months. Jindagi badal jayegi Do you want to continue ?',
    'python': 'The Python course costs ₹777 and takes 3 months.',
    'react-js': 'The React-Js course costs ₹199 and takes 3 months.',
    'trading': 'The Trading course costs ₹420 and takes 3 months.',
    'calculus': 'The Calculus course is absolutely free and takes 3 months.',
    'dsa': 'The DSA course costs ₹700 and takes 3 months. Do you want to continue?',
    'cyber-security': 'The Cyber-security course is absolutely free and takes 4 months.',
    'electronics': 'The Electronics course costs ₹299 and takes 3 months.',
    'upsc': 'The UPSC course costs ₹1999 and takes 3 months.',
    'quantum-computing': 'The Quantum-computing course costs ₹1000 and takes 3 months.',
    'history': 'The History course is absolutely free and takes 3 months.'
};

const openChat = () => {
    document.getElementById('chatIcon').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';

    setTimeout(sendDefaultMessage, 500);
};

const closeChat = () => {
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('chatIcon').style.display = 'flex';

    document.getElementById('chatBody').innerHTML = "";

    clearTimeout(defaultMsgTimeout);
};

const sendDefaultMessage = () => {
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<p>🤖 Hello!
                            <br/>
                            I can Help you with Course Information.
                            <br/>
                            Which Course Are You interested in..?
                            <br/>
                            Here are the Available Courses:
                            <br/>
                            - Java
                            - C++
                            - Python
                            - React-JS
                            - Trading
                            - Calculus
                            - DSA
                            - Cyber-Security
                            - Electronics
                            - UPSC
                            - Quantum Computing
                            - History
                            </p>
                            <br/>`;

    chatBody.scrollTop = chatBody.scrollHeight;

};

const sendMessage = () => {
    let input = document.getElementById('chatInput').value.trim();
    if (input === '') return;
    
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `<p style="color: white;">
                            ${input}
                            </p> <br/>`;

    document.getElementById('chatInput').value = '';

    chatBody.scrollTop = chatBody.scrollHeight;
    // kaka
    setTimeout(() => {
        let botReply = courses[input.toLowerCase()] || `Sorry!
                            <br/>
                            I couldn't Find That Course.
                            <br/>
                            Please Choose from the Available Courses:
                            <br/>
                            - Java
                            - C++
                            - Python
                            - React-JS
                            - Trading
                            - Calculus
                            - DSA
                            - Cyber-Security
                            - Electronics
                            - UPSC
                            - Quantum Computing
                            - History
                            `;
        chatBody.innerHTML += `<p>🤖 ${botReply}</p> <br/>`;
        chatBody.scrollTop = chatBody.scrollHeight;
        
        if (courses[input.toLowerCase()]) {
            addYesNoButtons();
        }

    }, 1000);
};

const addYesNoButtons = () => {
    let chatBody = document.getElementById('chatBody');

    chatBody.innerHTML += `
        <div class="buttons">
            <button class="btn yes" onclick="respond('Yes')">Yes</button>
            <button class="btn no" onclick="respond('No')">No</button>
        </div>
    `;

    chatBody.scrollTop = chatBody.scrollHeight;
};

const respond = (answer) => {
    let chatBody = document.getElementById('chatBody');
    chatBody.innerHTML += `<p style="color: blue;">${answer}</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        if (answer === 'Yes') {
            chatBody.innerHTML += `<br/>
                                    <p>
                                    🤖 You can contact us at +91 9898441664. Thank you! 😊
                                    </p>
                                    <br/>`;
        } else {
            chatBody.innerHTML += `<br/>
                                    <p>
                                    🤖 Okay, let us know if you need more information! 👍
                                    </p>
                                    <br/>`;
        }

        chatBody.scrollTop = chatBody.scrollHeight;

    }, 1000);

    defaultMsgTimeout = setTimeout(sendDefaultMessage, 5000);
};

document.querySelector("#chatIcon").addEventListener("click", openChat);

document.querySelector("#close-bot").addEventListener("click", closeChat);

document.querySelector("#send-bot").addEventListener("click", sendMessage);

document.querySelector("#chatInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
