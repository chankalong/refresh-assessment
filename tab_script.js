document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabsContainer = document.querySelector('.tabs-container');
    
    // Variables for scroll behavior
    const initialOffset = 400;  // How far down the page before hiding behavior starts
    let lastScrollPosition = 0; // Tracks the previous scroll position
    
    // Handle tab clicking
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get currently active content
            const currentActive = document.querySelector('.tab-content.active');
            
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Get the target content element
            const tabId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(tabId);
            
            // If there's already an active content, animate fade out then fade in
            if (currentActive) {
                // Add fade-out class to animate out
                currentActive.classList.add('fade-out');
                
                // After fade out completes, hide old content and show new one
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.classList.remove('fade-out');
                    targetContent.classList.add('active');
                }, 300); // Match the fadeOut animation duration
            } else {
                // Immediately show content if none active
                targetContent.classList.add('active');
            }
        });
        
        // Add keyboard navigation
        tab.addEventListener('keydown', function(e) {
            // Left/Right arrow keys
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                
                const tabList = Array.from(tabs);
                const currentIndex = tabList.indexOf(this);
                let newIndex;
                
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : tabList.length - 1;
                } else {
                    newIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : 0;
                }
                
                tabList[newIndex].focus();
                tabList[newIndex].click();
            }
        });
    });
    
    // Very simple scroll handler - minimal code for maximum reliability
    window.addEventListener('scroll', function() {
        // Get current scroll position using both methods for maximum browser support
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        const isScrollingDown = currentScrollTop > lastScrollPosition;
        
        // Apply or remove the hidden class based on scroll direction
        if (isScrollingDown && currentScrollTop > initialOffset) {
            tabsContainer.classList.add('hidden');
        } else if (!isScrollingDown) {
            tabsContainer.classList.remove('hidden');
        }
        
        // Update the last position for next comparison
        lastScrollPosition = currentScrollTop;
    }, { passive: true });
    
    // Force initial check - sometimes needed after page refresh
    setTimeout(function() {
        if (window.pageYOffset > initialOffset) {
            tabsContainer.classList.add('hidden');
        }
    }, 100);
}); 
