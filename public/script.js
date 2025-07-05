// public/script.js
document.getElementById("generate-btn").addEventListener("click", async () => {
  const url = document.getElementById("url-input").value;

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) throw new Error("Failed to generate QR");

    const blob = await response.blob(); // QR image blob
    const imageURL = URL.createObjectURL(blob);

    document.getElementById("qr-result").innerHTML = `
      <img src="${imageURL}" alt="QR Code" />
      <br />
      <a href="${imageURL}" download="qr.png">Download QR Code</a>
    `;
  } catch (err) {
    alert("Something went wrong!");
    console.error(err);
  }
});


// Theme toggle logic
const toggle = document.getElementById("theme-toggle");

// Save user's theme preference
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
  localStorage.setItem("theme", toggle.checked ? "dark" : "light");
});


window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }
});
