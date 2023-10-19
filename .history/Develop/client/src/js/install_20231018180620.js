const butInstall = document.getElementById('buttonInstall');

// Declare deferredPrompt variable
let deferredPrompt;

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the UI notify the user they can add to home screen
    butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Hide our user interface that shows our A2HS button
    butInstall.style.display = 'none';
    // Show the prompt
    if (deferredPrompt) {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);

    // Check if the user chose to install the PWA
    if (event.type === 'appinstalled') {
        console.log('User installed the PWA');

        // Log analytics event (pseudo-code for illustration)
        // analytics.logEvent('PWA_Installed');

        // Display a message to the user
        const notificationElement = document.createElement('div');
        notificationElement.style.position = 'fixed';
        notificationElement.style.bottom = '10px';
        notificationElement.style.left = '50%';
        notificationElement.style.transform = 'translateX(-50%)';
        notificationElement.style.backgroundColor = '#4CAF50';
        notificationElement.style.color = 'white';
        notificationElement.style.padding = '10px';
        notificationElement.style.borderRadius = '5px';
        notificationElement.style.zIndex = '1000';
        notificationElement.innerText = 'Thank you for installing our app!';
        document.body.appendChild(notificationElement);

        // Remove the message after 5 seconds
        setTimeout(() => {
            notificationElement.remove();
        }, 5000);
    } else {
        console.log('User did not install the PWA');
    }
});
