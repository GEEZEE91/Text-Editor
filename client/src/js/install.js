const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (beforeInstallPromptEvent) => {
    // Store the triggered events

    beforeInstallPromptEvent.preventDefault();


    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {

        const promptEvent = window.deferredPrompt;
        console.log(window.deferredPrompt);

        if (!promptEvent) {
         return;
        }

        // Show prompt
        promptEvent.prompt();

        // Reset the deferred prompt variable, it can only be used once.
        window.deferredPrompt = null;

        butInstall.classList.toggle('hidden', true);
      });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener(`appinstalled`, () => {
    console.log('Thank you for installing our app!');

    // Clear prompt
  window.deferredPrompt = null;
});
