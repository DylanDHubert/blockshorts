// YOUTUBE SHORTS AND POST BLOCKER - CONTENT SCRIPT
// DETECTS YOUTUBE SHORTS AND SINGLE POST URLS AND REDIRECTS TO PREVIOUS PAGE

(function() {
    'use strict';
    
    // FUNCTION TO CHECK IF CURRENT URL IS A YOUTUBE SHORT OR A SINGLE POST
    function isBlockedYouTubePage() {
        const currentUrl = window.location.href;
        const isShort = currentUrl.includes('youtube/shorts/') || currentUrl.includes('youtube.com/shorts');
        const isPost = currentUrl.includes('youtube.com/post/');
        return isShort || isPost;
    }
    
    // FUNCTION TO REDIRECT TO PREVIOUS PAGE
    function redirectToPreviousPage() {
        console.log('YOUTUBE SHORT OR POST DETECTED - REDIRECTING TO PREVIOUS PAGE');
        
        // TRY TO GO BACK IN BROWSER HISTORY
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // IF NO HISTORY, REDIRECT TO YOUTUBE HOME
            window.location.href = 'https://www.youtube.com';
        }
    }
    
    // FUNCTION TO HANDLE URL CHANGES (FOR SPA NAVIGATION)
    function handleUrlChange() {
        if (isBlockedYouTubePage()) {
            redirectToPreviousPage();
        }
    }
    
    // INITIAL CHECK WHEN SCRIPT LOADS
    if (isBlockedYouTubePage()) {
        redirectToPreviousPage();
    }
    
    // LISTEN FOR URL CHANGES (YOUTUBE IS A SINGLE PAGE APPLICATION)
    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            handleUrlChange();
        }
    });
    
    // START OBSERVING DOM CHANGES (WAIT FOR DOCUMENT BODY TO BE AVAILABLE)
    function startObserver() {
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            // IF BODY NOT READY, WAIT FOR IT
            setTimeout(startObserver, 100);
        }
    }
    
    startObserver();
    
    // ALSO LISTEN FOR POPSTATE EVENTS (BACK/FORWARD BUTTON)
    window.addEventListener('popstate', handleUrlChange);
    
    // LISTEN FOR PUSHSTATE/REPLACESTATE (PROGRAMMATIC NAVIGATION)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
        originalPushState.apply(history, arguments);
        setTimeout(handleUrlChange, 0);
    };
    
    history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
        setTimeout(handleUrlChange, 0);
    };
    
})();
