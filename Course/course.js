
// Clear LocalStorage;
document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset everything? This cannot be undone!")) {
        localStorage.clear();
        localStorage.setItem("Aura", "5000");
        localStorage.setItem("purchased", JSON.stringify({}));

        document.querySelectorAll(".btns .buy").forEach(btn => {
            btn.innerText = "Enroll";
            btn.disabled = false;
        });

        document.querySelectorAll(".openbtn").forEach(openBtn => {
            openBtn.style.display = "none";
        });


        courseButtons();
        updateAura();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutbtn = document.querySelector(".navbar .logout");

    if (logoutbtn) {
        let loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn) {
            logoutbtn.innerText = "Logout";
            logoutbtn.addEventListener("click", () => {
                localStorage.removeItem("loggedIn");
                window.location.href = "../Login/login.html";
            });
        } else {
            logoutbtn.innerText = "Login";
            logoutbtn.addEventListener("click", () => {
                window.location.href = "../Login/login.html";
            });
            setTimeout(() => {
                alert("You Are Not Logged In, Please Login..!!");
            }, 5000);
        }
    }

    if (!localStorage.getItem("Aura")) {
        localStorage.setItem("Aura", "5000");
    }

    if (!localStorage.getItem("purchased")) {
        localStorage.setItem("purchased", JSON.stringify({}));
    }

    const updateAura = () => {
        document.querySelector(".Aura").textContent = "Aura: " + localStorage.getItem("Aura");
    };

    updateAura();

    const courseClick = (name, price, topics, btn, openBtn) => {
        let Aura = parseInt(localStorage.getItem("Aura"));
        let purchased = JSON.parse(localStorage.getItem("purchased"));

        if (!purchased[name] && (price === 0 || Aura >= price)) {
            if (price > 0) localStorage.setItem("Aura", Aura - price);
            purchased[name] = new Array(topics.length).fill(false);
            localStorage.setItem("purchased", JSON.stringify(purchased));

            btn.innerText = "Enrolled";
            btn.disabled = true;

            openBtn.style.display = "inline-block";
            updateAura();
        }
        else if(!purchased[name] && Aura < price){
            alert("You have to increase your aura to join this course");
        }
    };

    const showCoursePopup = (name, topics) => {

        document.querySelectorAll(".box").forEach(course => {
            course.style.display = "none";
        });

        let progress = JSON.parse(localStorage.getItem("purchased"))[name];
        let overlay = document.createElement("div");

        overlay.id = "coursePopup";

        overlay.innerHTML = `
            <div class='popup-content'>

                <h2>${name} Progress</h2>
                <p id="completeMsg"></p>

                <div class="checkboxes">
                    ${topics.map((t, i) => `
                        <label>
                            <input type='checkbox'
                                class="big-check" 
                                data-index="${i}" 
                                data-name="${name}" 
                                data-total="${topics.length}" 
                                ${progress[i] ? "checked" : ""}> ${t}
                        </label>
                        <br>
                    `).join('')}
                </div>

                <div class="progress-container">
                    <div class="progress-bar-container">
                        <div id="progress-${name}" class="progress-bar"></div>
                        <p id="percentage-${name}">0%</p>
                    </div>
                </div>

                <button id="closeBtn">Close</button>
            </div>
        `;

        const container = document.querySelector(".container");

        container.appendChild(overlay);

        updateProgressBar(name, topics.length);

        document.querySelectorAll("#coursePopup input[type='checkbox']").forEach(checkbox => {
            checkbox.addEventListener("click", (event) => {
                let index = event.target.getAttribute("data-index");
                let courseName = event.target.getAttribute("data-name");
                let totalTopics = event.target.getAttribute("data-total");
                updateProgress(index, courseName, totalTopics);
            });
        });

        document.querySelector("#closeBtn").addEventListener("click", closePopup);
    };

    const closePopup = () => {
        document.querySelectorAll(".box").forEach(course => {
            course.style.removeProperty("display");
        });

        document.querySelector("#coursePopup").remove();
    };

    const updateProgress = (idx, name, totalTopics) => {
        let purchased = JSON.parse(localStorage.getItem("purchased"));
        purchased[name][idx] = !purchased[name][idx];
        localStorage.setItem("purchased", JSON.stringify(purchased));
        updateProgressBar(name, totalTopics);
    };

    const updateProgressBar = (name, totalTopics) => {
        let progress = JSON.parse(localStorage.getItem("purchased"))[name];
        let completedTopics = progress.filter(Boolean).length;
        let percentage = Math.round((completedTopics / totalTopics) * 100);
        let percentageBar = document.getElementById(`percentage-${name}`);
        let progressBar = document.getElementById(`progress-${name}`);
        if (progressBar && percentageBar) {
            let pr = percentage !== 0 ? percentage - (percentage / 11) : 0;
            progressBar.style.width = pr + "%";
            percentageBar.textContent = percentage + "%";
            if(percentage == 100) {
                document.querySelector("#completeMsg").innerText = `🎉 Congratulations! You have completed this course successfully! 🥳`;
            } else {
                document.querySelector("#completeMsg").innerText = "";
            }
        }
    };

    const searchBar = document.querySelector("#searchBar");

    if(searchBar) {
        searchBar.addEventListener("keyup", () => {
            let query = searchBar.value.toLowerCase();
            let container = document.querySelector(".container");

            document.querySelectorAll(".box").forEach(course => {
                let courseName = course.getAttribute("data-name").toLowerCase();
                
                if(query === "" || query == null) {
                    course.classList.remove("notSearched-course");
                    course.classList.remove("searched-course");
                } else if(courseName.includes(query)) {
                    course.classList.remove("notSearched-course");
                    course.classList.add("searched-course");
                } else {
                    course.classList.remove("searched-course");
                    course.classList.add("notSearched-course");
                }
            });
        });
    }

    const sortCourses = (order) => {
        let container = document.querySelector(".container");
        let courses = [...container.children];

        courses.sort((a, b) => {
            if (order === "A-Z") {
                return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"));
            } else if (order === "Z-A") {
                return b.getAttribute("data-name").localeCompare(a.getAttribute("data-name"));
            } else if (order === "low-high") {
                return parseFloat(a.getAttribute("data-price")) - parseFloat(b.getAttribute("data-price"));
            } else if (order === "high-low") {
                return parseFloat(b.getAttribute("data-price")) - parseFloat(a.getAttribute("data-price"));
            }
        });

        container.innerHTML = "";
        courses.forEach(course => container.appendChild(course));
    };

    document.querySelector("#sortOptions").addEventListener("change", (event) => {
        sortCourses(event.target.value);
    });

    const courseButtons = () => {

        document.querySelectorAll(".box").forEach(course => {
            let price = parseInt(course.getAttribute("data-price"));
            let name = course.getAttribute("data-name");
            let topics = JSON.parse(course.getAttribute("data-topics"));
            let purchased = JSON.parse(localStorage.getItem("purchased"));

            // if (!purchased[name]) {
            //     purchased[name] = new Array(topics.length).fill(false);
            //     localStorage.setItem("purchased", JSON.stringify(purchased));
            // }
            
            const btn = course.querySelector(".btns .buy");
            const openBtn = document.createElement("button");
            openBtn.className = "openbtn";
            
            openBtn.innerText = "Open Course";
            openBtn.style.display = purchased[name] ? "inline-block" : "none";
            openBtn.classList.add("open-course");
            openBtn.onclick = () => {
                showCoursePopup(name, topics);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            
            btn.innerText = purchased[name] ? "Enrolled" : (price === 0 ? "Enroll" : "Buy with Aura");
            btn.disabled = purchased[name];

            btn.addEventListener( "click", () => {
                courseClick(name, price, topics, btn, openBtn);
            });
            course.querySelector(".btns").appendChild(openBtn);
        });
    };

    courseButtons();
});

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

    chatBody.innerHTML += `<p style="color: green;">
                            ${input}
                            </p> <br/>`;

    document.getElementById('chatInput').value = '';

    chatBody.scrollTop = chatBody.scrollHeight;
    
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
                                    🤖 You can contact us at +91 9434783930. Thank you! 😊
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

