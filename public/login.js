let apiUrl = "http://65.0.86.230:3000"
// let apiUrl = 'http://localhost:3000'
function registeruser(e) {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    password: e.target.password.value,
  };
  axios.post(`${apiUrl}/register`, user).then((res) => {
    if (res.data.errorMsg) {
      alert(res.data.errorMsg);
    } else {
      alert("Success..");
    }
  });
}

async function loginuser(e) {
  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const res = await axios.post(`${apiUrl}/login`, user);

  if (res.status === 200) {
    const token = res.data.token;
    localStorage.setItem("token", token);
    window.location.href = "appPage.html";
  }
 else if(res.status === 203){
    alert("Check Password");
 }
 else if( res.status === 204){
     alert("Uuser Not Found")
 }
 
}

////  Functions to switch from login to signup and backwards
function enablesignup() {
  document.getElementById("signupform").hidden = false;
  document.getElementById("loginform").hidden = true;
  document.getElementById("forgotPasswordForm").hidden = true;
}
function enablelogin() {
  document.getElementById("loginform").hidden = false;
  document.getElementById("signupform").hidden = true;
  document.getElementById("forgotPasswordForm").hidden = true;
}

function enablefp() {
  document.getElementById("loginform").hidden = true;
  document.getElementById("signupform").hidden = true;
  document.getElementById("forgotPasswordForm").hidden = false;
}

function forgotpassword(e) {
  e.preventDefault();
  axios
    .post(`${apiUrl}/forgotpassword`, {
      email: e.target.email.value,
    })
    .then((res) => {
      if (res.status === 201) {
        document.getElementById("mailSent").innerText = "Email Sent";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
