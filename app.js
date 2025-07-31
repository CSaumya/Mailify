console.log("This is my script");

const submitBtn = document.getElementById("submit-btn");
const resultCont = document.getElementById("resultCont");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  resultCont.innerHTML = `<img width="123" src="/assets/infinite-spinner.svg" alt="Loading...">`;

  let key = "ema_live_ZeOAkgcW7QBPlOs2dSgnKJ5zyWpgxNKzHfpBW6Lg";
  let email = document.getElementById("email-id").value.trim();

  if (!email || !email.includes("@")) {
    resultCont.innerHTML = `<div style="color: red;">Please enter a valid email address.</div>`;
    return;
  }

  let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

  try {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    let data = await res.json();
    console.log(data);

     if (data.state === "undeliverable" || data.reason === "invalid_mailbox") {
      resultCont.innerHTML = `<div style="color: red; font-weight: bold; font-size: 1.3rem;">
      Email does not exist or is undeliverable.</div>`;
    } 
    else {
      resultCont.innerHTML = `<div style="color: green; font-weight: bold; font-size: 1.3rem; text-decoration : underline;">
      Email is valid and deliverable.</div>`;
    }

  } catch (err) {
    console.error("Error:", err);
    resultCont.innerHTML = `<div style="color:red;">Something went wrong. ${err.message}</div>`;
  }
});
