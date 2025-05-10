window.addEventListener("message", function(event) {
    if (event.data.type === "EYE_STRIKE") {
      if (document.getElementById("eye-blocker")) return;
  
      // Create blocker overlay
      const overlay = document.createElement("div");
      overlay.id = "eye-blocker";
      overlay.style = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
      `;
  
      // Disable scroll
      document.body.style.overflow = "hidden";
  
      // Modal content
      const modal = document.createElement("div");
      modal.style = `
        background: #111;
        color: #fff;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0,0,0,0.6);
        font-size: 1.5rem;
        width: 300px;
      `;
  
      const msg = document.createElement("div");
      msg.innerText = "👀 Look away for 20 seconds!";
      modal.appendChild(msg);
  
      const countdownText = document.createElement("div");
      countdownText.id = "eye-timer";
      countdownText.style = "margin-top: 20px; font-size: 2.5rem;";
      countdownText.innerText = "20";
      modal.appendChild(countdownText);
  
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
  
      // Block all inputs on the page
      function blockInteraction(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
  
      window.addEventListener("keydown", blockInteraction, true);
      window.addEventListener("keyup", blockInteraction, true);
      window.addEventListener("keypress", blockInteraction, true);
      window.addEventListener("click", blockInteraction, true);
      window.addEventListener("mousedown", blockInteraction, true);
      window.addEventListener("wheel", blockInteraction, true);
      window.addEventListener("touchstart", blockInteraction, true);
  
      // Countdown timer
      let countdown = 20;
      const interval = setInterval(() => {
        countdown--;
        countdownText.innerText = countdown;
        if (countdown <= 0) {
          clearInterval(interval);
          overlay.remove();
          document.body.style.overflow = ""; // Restore scrolling
  
          // Unblock inputs
          window.removeEventListener("keydown", blockInteraction, true);
          window.removeEventListener("keyup", blockInteraction, true);
          window.removeEventListener("keypress", blockInteraction, true);
          window.removeEventListener("click", blockInteraction, true);
          window.removeEventListener("mousedown", blockInteraction, true);
          window.removeEventListener("wheel", blockInteraction, true);
          window.removeEventListener("touchstart", blockInteraction, true);
        }
      }, 1000);
    }
  });
  