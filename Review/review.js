const logoutbtn = document.querySelector(".navbar .logout");

let loggedIn = localStorage.getItem("loggedIn");

if(loggedIn) {
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
    }, 6000);
}

document.getElementById("add-review-btn").addEventListener("click", () => {
    const reviewForm = document.getElementById("review-form");
    const offset = 100;
    window.scrollTo({
        top: reviewForm.offsetTop - offset,
        behavior: "smooth"
    });
});

let currentIndex = 0;

const showReview = (index) => {
    const reviews = document.querySelector(".comments-container");
    const totalReviews = document.querySelectorAll(".comment").length;
    
    if (index < 0) {
        currentIndex = totalReviews - 1;
    } else if (index >= totalReviews) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100; 
    reviews.style.transform = `translateX(${offset}%)`;
};

const prevReview = () => {
    showReview(currentIndex - 1);
};

const nextReview = () => {
    showReview(currentIndex + 1);
};

showReview(currentIndex);

document.querySelector(".submit").addEventListener("click", (event) => {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let review = document.getElementById("review").value.trim();
    let rating = document.querySelector("input[name='rating']:checked");

    if (name === "" || review === "" || rating === null) {
        alert("Please fill all fields before submitting.");
        return;
    }

    let newReview = {
        name: name,
        review: review,
        rating: rating.value
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.unshift(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();

    document.querySelector(".rform").style.display = "none";
    document.querySelector(".add").style.display = "none";

    setTimeout(() => {
        const offset = 120;
        window.scrollTo({
            top: document.querySelector(".rev").offsetTop - offset,
            behavior: "smooth"
        });
    }, 400);
});

const displayReviews = () => {
    let commentsContainer = document.querySelector(".comments-container");
    // commentsContainer.innerHTML = "";

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // if (reviews.length === 0) {
    //     reviews = [
    //         { name: "John Doe", review: "This is an amazing product!", rating: 5 },
    //         { name: "Alice Smith", review: "Good quality, but could be improved.", rating: 4 }
    //     ];
    //     localStorage.setItem("reviews", JSON.stringify(reviews));
    // }

    reviews.forEach(review => {
        let newReview = document.createElement("div");
        newReview.classList.add("comment");
        newReview.innerHTML = `
            <p class="cmt">${review.review}</p>
            <p class="star">${"🌟".repeat(review.rating)}</p>
            <p class="name">${review.name}</p>
        `;
        commentsContainer.prepend(newReview);
    });
}

document.addEventListener("DOMContentLoaded", displayReviews);

let defaultMsgTimeout;

const courses = {
    'java': 'The Tally course costs ₹500 and takes 3 months. Do you want to continue?',
    'c++': 'The Digital Marketing course costs ₹700 and takes 4 months.',
    'python': 'The Xero course costs ₹600 and takes 3 months.',
    'react-js': 'The Sage course costs ₹550 and takes 3 months.',
    'trading': 'The Qbook course costs ₹650 and takes 3 months.',
    'calculus': 'The Myob course costs ₹620 and takes 3 months.',
    'dsa': 'The Tally course costs ₹500 and takes 3 months. Do you want to continue?',
    'cyber-security': 'The Digital Marketing course costs ₹700 and takes 4 months.',
    'electronics': 'The Xero course costs ₹600 and takes 3 months.',
    'upsc': 'The Sage course costs ₹550 and takes 3 months.',
    'quantum-computing': 'The Qbook course costs ₹650 and takes 3 months.',
    'history': 'The Myob course costs ₹620 and takes 3 months.'
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

