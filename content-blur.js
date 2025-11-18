/**
 * Content Blur Protection Script
 * Blurs content in a specific element with distance-based gradient blur
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    function initBlurProtection() {
        // Check if user has active subscription
        // Only apply blur if subscription is expired or doesn't exist
        // Blur applies when: expire_subscription === true OR subscription data doesn't exist
        const shouldApplyBlur = (
            typeof drupalSettings === 'undefined' ||
            !drupalSettings ||
            !drupalSettings.user ||
            !drupalSettings.user.subscription ||
            drupalSettings.user.subscription.expire_subscription === true
        );
        
        // If user has active subscription, don't apply blur
        if (!shouldApplyBlur) {
            console.log('User has active subscription. Blur protection not applied.');
            return;
        }
        
        // Find the specific target element: //*[@id="block-bokss-content"]/div/section[2]/div/div[2]
        // This translates to: #block-bokss-content > div > section:nth-of-type(2) > div > div:nth-child(2)
        const blockContent = document.getElementById('block-bokss-content');
        
        if (!blockContent) {
            console.warn('block-bokss-content not found. Blur protection not applied.');
            return;
        }

        // Navigate to the target element
        const nodeContainer = blockContent.querySelector('div.node-container');
        if (!nodeContainer) {
            console.warn('node-container not found. Blur protection not applied.');
            return;
        }

        const sections = nodeContainer.querySelectorAll('section');
        if (sections.length < 2) {
            console.warn('Second section not found. Blur protection not applied.');
            return;
        }

        const targetSection = sections[1]; // Second section (index 1)
        const sectionDivs = targetSection.querySelectorAll('div');
        
        if (sectionDivs.length < 2) {
            console.warn('Target div not found in section. Blur protection not applied.');
            return;
        }

        // Find the second div child of the section's first div
        const firstDiv = sectionDivs[0];
        const firstDivChildren = Array.from(firstDiv.children).filter(function(child) {
            return child.tagName && child.tagName.toLowerCase() === 'div';
        });

        let targetElement = null;
        if (firstDivChildren.length >= 2) {
            targetElement = firstDivChildren[1]; // Second div child
        } else {
            // Fallback: try to find the grid div
            targetElement = targetSection.querySelector('div.grid');
        }

        if (!targetElement) {
            console.warn('Target element (div[2]) not found. Blur protection not applied.');
            return;
        }

        console.log('Target element found:', targetElement);

        // Get the target element's position
        const targetRect = targetElement.getBoundingClientRect();
        const targetTop = targetRect.top + window.scrollY;
        
        // ============================================
        // GRADIENT BLUR ADJUSTMENT PARAMETERS
        // ============================================
        // 1. Unblurred Distance: How many pixels to keep completely clear (no blur)
        //    Adjust this to show more/less content before blur starts
        //    Typical values: 100-250px (100px = ~1-2 lines, 250px = ~3-4 lines)
        const unblurredDistance = 150; // pixels
        
        // 2. Gradient Length: How many pixels the gradient takes to reach full blur
        //    After this distance, all content will have maximum blur
        //    Typical values: 30-100px (shorter = faster transition to full blur)
        const gradientLength = 50; // pixels
        
        // 3. Starting Blur: The minimum blur amount when gradient starts
        //    This is the blur applied to elements right after unblurredDistance
        //    Typical values: 1-5px (lower = more subtle start)
        const minBlur = 2; // pixels
        
        // 4. Maximum Blur: The maximum blur amount at the end of the gradient
        //    This is the strongest blur applied after gradientLength
        //    Typical values: 10-20px (higher = more protection)
        const maxBlur = 15; // pixels
        
        // 5. Gradient Range: Calculated automatically
        const blurRange = maxBlur - minBlur; // Calculated automatically
        
        // 6. Button Top Offset: Distance from the top of blur area to position the subscription button
        //    Adjust this to move the button higher (lower value) or lower (higher value)
        //    Typical values: 20-50px
        const buttonTopOffset = 200; // pixels
        
        // ============================================
        
        // Get all elements within the target element
        const allElements = targetElement.querySelectorAll('*');
        let blurredCount = 0;
        
        // Apply blur based on distance
        allElements.forEach(function(element) {
            const tagName = element.tagName ? element.tagName.toLowerCase() : '';
            if (['script', 'style', 'meta', 'link', 'noscript'].includes(tagName)) {
                return;
            }
            
            // Skip the subscription button and its container
            if (element.id === 'subscription-btn-blur-area' || 
                element.id === 'subscription-btn-container' ||
                element.classList.contains('no-blur') ||
                element.closest('#subscription-btn-container')) {
                return;
            }
            
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.scrollY;
            
            // Calculate distance from target element's top
            const distance = elementTop - targetTop;
            
            // Keep elements within unblurredDistance unblurred
            if (distance <= unblurredDistance) {
                console.log('Keeping element unblurred (distance:', distance.toFixed(0) + 'px):', element.className || element.tagName);
                return;
            }
            
            // Calculate blur amount based on distance
            const blurDistance = distance - unblurredDistance;
            let blurAmount;
            
            if (blurDistance >= gradientLength) {
                // Beyond gradient length: apply full blur
                blurAmount = maxBlur;
            } else {
                // Within gradient: calculate gradient blur
                // Formula: blurAmount = minBlur + (blurRange * progress)
                // where progress = blurDistance / gradientLength
                const progress = blurDistance / gradientLength;
                blurAmount = minBlur + (blurRange * progress);
            }
            
            console.log('Blurring element (distance:', distance.toFixed(0) + 'px, blur:', blurAmount.toFixed(1) + 'px):', element.className || element.tagName);
            applyBlurToElement(element, blurAmount);
            blurredCount++;
        });

        console.log('Content blur protection applied successfully to', blurredCount, 'elements in target div (first', unblurredDistance, 'px unblurred, gradient over', gradientLength, 'px, then full blur).');
        
        // Add subscription button in the blur area
        addSubscriptionButton(targetElement, targetTop, unblurredDistance, buttonTopOffset);
    }
    
    // Function to add "立即訂閱" button in the blur area
    function addSubscriptionButton(targetElement, targetTop, unblurredDistance, buttonTopOffset) {
        // Check if button already exists
        if (targetElement.querySelector('#subscription-btn-blur-area')) {
            return;
        }
        
        // Ensure target element has position relative for absolute positioning
        const targetElementStyle = window.getComputedStyle(targetElement);
        if (targetElementStyle.position === 'static') {
            targetElement.style.setProperty('position', 'relative', 'important');
        }
        
        // Create button container with absolute positioning to overlay the blur area
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'text-center';
        buttonContainer.id = 'subscription-btn-container';
        
        // Position at the top of the blur area (right after unblurred distance)
        // Use the configurable offset to create distance from the top of the blur area
        const buttonTopPosition = unblurredDistance + buttonTopOffset;
        
        // Use absolute positioning to overlay the content
        buttonContainer.style.cssText = 
            'position: absolute !important; ' +
            'top: ' + buttonTopPosition + 'px !important; ' +
            'left: 50% !important; ' +
            'transform: translateX(-50%) !important; ' +
            'width: 100% !important; ' +
            'padding: 20px 0 !important; ' +
            'pointer-events: none !important;';
        
        // Create the subscription button with same design as "立即報名"
        const subscriptionButton = document.createElement('a');
        subscriptionButton.href = 'https://refresh.bokss.org.hk/new-subscription';
        subscriptionButton.id = 'subscription-btn-blur-area';
        subscriptionButton.className = 'inline-block btnRound btnRound-green';
        subscriptionButton.textContent = '立即訂閱';
        subscriptionButton.style.cssText = 
            'filter: none !important; ' +
            '-webkit-filter: none !important; ' +
            'pointer-events: auto !important; ' +
            'user-select: auto !important; ' +
            '-webkit-user-select: auto !important; ' +
            'position: relative !important; ' +
            'text-decoration: none !important; ' +
            'display: inline-block !important; ' +
            'color: #000000 !important;';
        
        // Prevent blur from affecting the button
        subscriptionButton.classList.add('no-blur');
        
        buttonContainer.appendChild(subscriptionButton);
        
        // Append the button container to the target element
        targetElement.appendChild(buttonContainer);
        
        console.log('Subscription button added to blur area (overlay at top)');
    }

    // Helper function to apply blur to an element and all its descendants
    // blurAmount: blur in pixels (default: 10px)
    function applyBlurToElement(element, blurAmount) {
        if (!element || !element.tagName) {
            return;
        }
        
        // Default blur amount if not specified
        if (typeof blurAmount === 'undefined' || blurAmount === null) {
            blurAmount = 10;
        }
        
        const tagName = element.tagName.toLowerCase();
        
        // Skip script, style, and meta tags
        if (['script', 'style', 'meta', 'link', 'noscript', 'head', 'html', 'body'].includes(tagName)) {
            return;
        }
        
        // Skip the subscription button and its container
        if (element.id === 'subscription-btn-blur-area' || 
            element.id === 'subscription-btn-container' ||
            element.classList.contains('no-blur') ||
            element.closest('#subscription-btn-container')) {
            return;
        }
        
        // Apply blur filter with !important using setProperty
        try {
            const blurValue = 'blur(' + blurAmount + 'px)';
            element.style.setProperty('filter', blurValue, 'important');
            element.style.setProperty('-webkit-filter', blurValue, 'important');
            element.style.setProperty('pointer-events', 'none', 'important');
            element.style.setProperty('user-select', 'none', 'important');
            element.style.setProperty('-webkit-user-select', 'none', 'important');
            element.classList.add('content-blurred');
            
            // Also blur all descendants with the same blur amount
            const descendants = element.querySelectorAll('*');
            descendants.forEach(function(desc) {
                const descTagName = desc.tagName ? desc.tagName.toLowerCase() : '';
                if (!['script', 'style', 'meta', 'link', 'noscript'].includes(descTagName)) {
                    // Skip the subscription button and its container
                    if (desc.id === 'subscription-btn-blur-area' || 
                        desc.id === 'subscription-btn-container' ||
                        desc.classList.contains('no-blur') ||
                        desc.closest('#subscription-btn-container')) {
                        return;
                    }
                    desc.style.setProperty('filter', blurValue, 'important');
                    desc.style.setProperty('-webkit-filter', blurValue, 'important');
                    desc.style.setProperty('pointer-events', 'none', 'important');
                    desc.style.setProperty('user-select', 'none', 'important');
                    desc.style.setProperty('-webkit-user-select', 'none', 'important');
                    desc.classList.add('content-blurred');
                }
            });
        } catch (e) {
            console.warn('Error applying blur to element:', e);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlurProtection);
    } else {
        // DOM is already loaded
        initBlurProtection();
    }

    // Also try after delays to catch dynamically loaded content
    setTimeout(initBlurProtection, 100);
    setTimeout(initBlurProtection, 500);
    setTimeout(initBlurProtection, 1000);
})();

