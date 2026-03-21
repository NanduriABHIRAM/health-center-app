async function login(){

    const role = document.getElementById("role").value;
    const input = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if(!input || !password){
        msg.innerText = "Please fill all fields";
        return;
    }

    let url = "";
    let body = {};

    if(role === "student"){
        url = "http://localhost:3000/auth/student/login";
        body = { email: input, password };
    } else {
        url = "http://localhost:3000/auth/doctor/login";
        body = { doctor_id: input, password };
    }

    try {

        msg.innerText = "Logging in...";

        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        });

        const data = await res.json();

        msg.innerText = data.message;

        if(res.status === 200){
            msg.style.color = "green";

            
            setTimeout(() => {
                if(role === "student"){
                    window.location = "book.appointment.html";
                } else {
                    window.location = "doctor-dashboard.html";
                }
            }, 800);
        } else {
            msg.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        msg.innerText = "Server error. Make sure backend is running.";
        msg.style.color = "red";
    }
}