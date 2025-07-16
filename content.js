// Listen for incoming messages from other windows (e.g., iframe, parent)
window.addEventListener("message", function(event) {
  // Check if the message type is "EYE_STRIKE"
  if (event.data.type === "EYE_STRIKE") {
    // If overlay already exists, don't add another one
    if (document.getElementById("eye-blocker")) return;

    // Create a fullscreen overlay to block screen content
    const overlay = document.createElement("div");
    overlay.id = "eye-blocker";
    overlay.style = `
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);  // Dark transparent background
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;  // Ensure it stays on top of all content
    `;

    // Disable scrolling on the page
    document.body.style.overflow = "hidden";

    // Create a centered modal for the message and timer
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

    // Message prompting user to rest their eyes
    const msg = document.createElement("div");
    msg.innerText = "👀 Look away for 20 seconds!";
    modal.appendChild(msg);

    // Countdown timer element
    const countdownText = document.createElement("div");
    countdownText.id = "eye-timer";
    countdownText.style = "margin-top: 20px; font-size: 2.5rem;";
    countdownText.innerText = "20";  // Initial countdown value
    modal.appendChild(countdownText);

    // Add modal to the overlay and attach it to the body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Function to block all user interactions (keyboard, mouse, touch)
    function blockInteraction(e) {
      e.stopImmediatePropagation();  // Prevent other listeners from firing
      e.preventDefault();            // Prevent default browser behavior
    }

    // Attach event listeners to block interactions
    window.addEventListener("keydown", blockInteraction, true);
    window.addEventListener("keyup", blockInteraction, true);
    window.addEventListener("keypress", blockInteraction, true);
    window.addEventListener("click", blockInteraction, true);
    window.addEventListener("mousedown", blockInteraction, true);
    window.addEventListener("wheel", blockInteraction, true);
    window.addEventListener("touchstart", blockInteraction, true);

    // Initialize and start the countdown timer
    let countdown = 20;
    const interval = setInterval(() => {
      countdown--;
      countdownText.innerText = countdown;

      // When countdown reaches 0, remove overlay and re-enable input
      if (countdown <= 0) {
        clearInterval(interval);             // Stop timer
        overlay.remove();                    // Remove the overlay
        document.body.style.overflow = "";   // Re-enable scrolling

        // Remove interaction blockers
        window.removeEventListener("keydown", blockInteraction, true);
        window.removeEventListener("keyup", blockInteraction, true);
        window.removeEventListener("keypress", blockInteraction, true);
        window.removeEventListener("click", blockInteraction, true);
        window.removeEventListener("mousedown", blockInteraction, true);
        window.removeEventListener("wheel", blockInteraction, true);
        window.removeEventListener("touchstart", blockInteraction, true);
      }
    }, 1000);  // Update countdown every second
  }
});
