// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    const banner = document.getElementById('cookie-banner-container');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    // --- Function to Load Your Tracking Scripts ---
    function loadGoogleTags() {
        // IMPORTANT: Paste your Google Tag Manager or gtag.js script code here.
        // The code that Google provides you goes inside this function.

        // Example for Google Tag Manager (replace GTM-XXXXXX with your ID)
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-GTM-PJSXD6TP');
        
        console.log("Cookie consent given. Google Tags loaded.");
    }

    // --- Helper Functions for Cookies ---
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Use samesite=Lax for modern browser compliance
        document.cookie = name + "=" + (value || "")  + expires + "; path=/; samesite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // --- Main Logic ---
    const consentCookie = getCookie('cookie_consent');

    if (consentCookie === 'given') {
        // If consent is already given, load the tags immediately
        loadGoogleTags();
    } else if (consentCookie === 'denied') {
        // If consent was denied, do nothing.
        console.log("Cookie consent previously denied.");
    } else {
        // If no consent cookie is found, show the banner
        banner.style.display = 'block';
    }

    // --- Event Listeners for Buttons ---
    acceptBtn.addEventListener('click', () => {
        setCookie('cookie_consent', 'given', 180); // Set cookie for 180 days
        banner.style.display = 'none';
        loadGoogleTags();
    });

    declineBtn.addEventListener('click', () => {
        setCookie('cookie_consent', 'denied', 180); // Remember the choice
        banner.style.display = 'none';
        console.log("Cookie consent denied.");
    });
});