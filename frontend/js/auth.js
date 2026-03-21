async function login(){

    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    let body = {};
    let url = "";

    if(role === "student"){
        const email = document.getElementById("email").value;

        url = "http://localhost:3000/auth/student/login";
        body = { email, password };

    } else {
        const doctor_id = document.getElementById("email").value;

        url = "http://localhost:3000/auth/doctor/login";
        body = { doctor_id, password };
    }

    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
    });

    const data = await res.json();

    document.getElementById("msg").innerText = data.message;

    if(res.status === 200){
        if(role === "student"){
            window.location = "book.appointment.html";
        } else {
            window.location = "doctor-dashboard.html";
        }
    }
}