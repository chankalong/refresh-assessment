/**
 * Content Lock Script
 * Locks content for anonymous users or users with expired subscriptions.
 * Keeps only the first N paragraphs, applies gradient blur to the last one,
 * and inserts subscription promo graphic with login and subscription links.
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION - Modify these values as needed
    // ============================================
    const CONFIG = {
        // Content locking settings
        paragraphsToKeep: 5,  // Number of paragraphs to keep before locking
        
        // Selectors for finding target elements
        selectors: {
            blockContent: '#block-bokss-content',
            nodeContainer: 'div.node-container',
            targetSectionIndex: 1,  // Second section (0-indexed)
            fallbackGridSelector: 'div.grid'
        },
        
        // Element IDs (for checking if already processed)
        ids: {
            promoContainer: 'subscription-promo-container',
            btnContainer: 'subscription-btn-container',
            btnLockArea: 'subscription-btn-lock-area',
            gradientBlurWrapper: 'gradient-blur-wrapper'
        },
        
        // URLs
        urls: {
            login: '/oauth2/login',
            subscription: '/new-subscription'
        },
        
        // Promo graphic images
        images: {
            left: {
                src: '/sites/default/files/inpages/photo/subscription_promo_left.png',
                alt: 'Re:Fresh 會員登入'
            },
            right: {
                src: '/sites/default/files/inpages/photo/subscription_promo_right.png',
                alt: '成為 Re:Fresh 會員'
            }
        },
        
        // Promo graphic styling
        promo: {
            containerMaxWidth: '1200px',
            containerMargin: '30px auto',
            containerBackground: '#FFFFFF',
            borderColor: '#FF8C42',
            borderWidth: '5px',
            wrapperMargin: '30px 0',
            wrapperPadding: '0 20px'
        },
        
        // Gradient blur settings
        gradientBlur: {
            enabled: true,
            gradient: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.8) 100%)'
        },
        
        // Initialization delays (in milliseconds) for dynamically loaded content
        initDelays: [100, 500, 1000],
        
        // Console logging
        logging: {
            enabled: true,
            verbose: false  // Set to true for detailed logging
        }
    };
    // ============================================

    // Check if user is anonymous (not logged in)
    function isAnonymous() {
        try {
            return !drupalSettings || !drupalSettings.user || !drupalSettings.user.uid;
        } catch (e) {
            return true;
        }
    }

    // Check if subscription is expired
    function isExpired() {
        try {
            return !!(drupalSettings &&
                      drupalSettings.user &&
                      drupalSettings.user.subscription &&
                      drupalSettings.user.subscription.expire_subscription === true);
        } catch (e) {
            return false;
        }
    }

    // Determine if content should be blocked
    function shouldBlock() {
        return isAnonymous() || isExpired();
    }

    // Wait for DOM to be fully loaded
    function initContentLock() {
        // Check if user is anonymous or subscription is expired
        // Only apply lock if user is anonymous or subscription is expired
        if (!shouldBlock()) {
            if (CONFIG.logging.enabled) console.log('User is not anonymous or subscription is not expired. Content lock not applied.');
            return;
        }
        
        // Find the specific target element
        const blockContent = document.querySelector(CONFIG.selectors.blockContent);
        
        if (!blockContent) {
            if (CONFIG.logging.enabled) console.warn('block-bokss-content not found. Content lock not applied.');
            return;
        }

        // Navigate to the target element
        const nodeContainer = blockContent.querySelector(CONFIG.selectors.nodeContainer);
        if (!nodeContainer) {
            if (CONFIG.logging.enabled) console.warn('node-container not found. Content lock not applied.');
            return;
        }

        const sections = nodeContainer.querySelectorAll('section');
        if (sections.length <= CONFIG.selectors.targetSectionIndex) {
            if (CONFIG.logging.enabled) console.warn('Target section not found. Content lock not applied.');
            return;
        }

        const targetSection = sections[CONFIG.selectors.targetSectionIndex];
        const sectionDivs = targetSection.querySelectorAll('div');
        
        if (sectionDivs.length < 2) {
            if (CONFIG.logging.enabled) console.warn('Target div not found in section. Content lock not applied.');
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
            targetElement = targetSection.querySelector(CONFIG.selectors.fallbackGridSelector);
        }

        if (!targetElement) {
            if (CONFIG.logging.enabled) console.warn('Target element not found. Content lock not applied.');
            return;
        }

        if (CONFIG.logging.verbose) console.log('Target element found:', targetElement);

        // Check if content has already been processed (promo graphic or old button exists)
        if (targetElement.querySelector('#' + CONFIG.ids.promoContainer) || 
            targetElement.querySelector('#' + CONFIG.ids.btnLockArea)) {
            if (CONFIG.logging.enabled) console.log('Content already processed. Skipping.');
            return;
        }

        // Find all <p> tags within the target element
        const allParagraphs = targetElement.querySelectorAll('p');
        
        if (allParagraphs.length === 0) {
            if (CONFIG.logging.enabled) console.warn('No <p> tags found in target element. Content lock not applied.');
            return;
        }

        // Keep only the first N <p> tags, remove all others
        const paragraphsToKeep = Math.min(CONFIG.paragraphsToKeep, allParagraphs.length);
        const keptParagraphs = [];
        
        for (let i = 0; i < paragraphsToKeep; i++) {
            keptParagraphs.push(allParagraphs[i]);
        }
        
        // Remove all other paragraphs (after the first N)
        for (let i = paragraphsToKeep; i < allParagraphs.length; i++) {
            allParagraphs[i].remove();
            if (CONFIG.logging.verbose) console.log('Removed paragraph:', i + 1);
        }

        // Remove all other elements except those that contain the kept paragraphs
        // First, collect all direct children to remove
        const allChildren = Array.from(targetElement.children);
        const elementsToRemove = [];
        
        allChildren.forEach(function(child) {
            // Skip if it's one of the paragraphs we're keeping
            if (keptParagraphs.includes(child)) {
                return;
            }
            
            // Skip if it's the subscription button container, promo container, blur wrapper, or gradient blur wrapper
            if (child.id === CONFIG.ids.btnContainer || 
                child.id === CONFIG.ids.promoContainer ||
                child.id === CONFIG.ids.gradientBlurWrapper ||
                child.querySelector('#' + CONFIG.ids.btnContainer) ||
                child.querySelector('#' + CONFIG.ids.promoContainer) ||
                child.querySelector('#' + CONFIG.ids.btnLockArea) ||
                child.querySelector('#' + CONFIG.ids.gradientBlurWrapper)) {
                return;
            }
            
            // Check if this child contains any of the kept paragraphs
            let containsKeptParagraph = false;
            for (let i = 0; i < keptParagraphs.length; i++) {
                if (child.contains(keptParagraphs[i])) {
                    containsKeptParagraph = true;
                    break;
                }
            }
            
            // If it doesn't contain any kept paragraphs, mark it for removal
            if (!containsKeptParagraph) {
                elementsToRemove.push(child);
            }
        });
        
        // Remove all other direct children that don't contain kept paragraphs
        elementsToRemove.forEach(function(element) {
            element.remove();
        });
        
        // Now, within elements that contain kept paragraphs, remove other content
        // For each kept paragraph, remove all siblings that aren't kept paragraphs
        keptParagraphs.forEach(function(keptPara) {
            const parent = keptPara.parentNode;
            if (parent && parent !== targetElement) {
                const siblings = Array.from(parent.children);
                siblings.forEach(function(sibling) {
                    // Skip if it's the subscription button, promo container, blur wrapper, or gradient blur wrapper
                    if (sibling.id === CONFIG.ids.btnContainer || 
                        sibling.id === CONFIG.ids.promoContainer ||
                        sibling.id === CONFIG.ids.gradientBlurWrapper ||
                        sibling.querySelector('#' + CONFIG.ids.btnContainer) ||
                        sibling.querySelector('#' + CONFIG.ids.promoContainer) ||
                        sibling.querySelector('#' + CONFIG.ids.btnLockArea) ||
                        sibling.querySelector('#' + CONFIG.ids.gradientBlurWrapper)) {
                        return;
                    }
                    // Remove siblings that aren't kept paragraphs
                    if (sibling !== keptPara && !keptParagraphs.includes(sibling)) {
                        sibling.remove();
                    }
                });
            }
        });

        if (CONFIG.logging.enabled) {
            console.log('Kept first', paragraphsToKeep, 'paragraph(s), removed', allParagraphs.length - paragraphsToKeep, 'other paragraphs and', elementsToRemove.length, 'other elements.');
        }

        // Check and remove blank last paragraphs
        while (keptParagraphs.length > 0) {
            const lastPara = keptParagraphs[keptParagraphs.length - 1];
            const textContent = lastPara.textContent ? lastPara.textContent.trim() : '';
            const innerHTML = lastPara.innerHTML ? lastPara.innerHTML.trim() : '';
            
            // Check if paragraph is blank (empty text or only whitespace/HTML tags)
            if (textContent === '' || innerHTML === '' || innerHTML === '<br>' || innerHTML === '<br/>') {
                if (CONFIG.logging.verbose) console.log('Removing blank last paragraph');
                lastPara.remove();
                keptParagraphs.pop();
            } else {
                break; // Found a non-blank paragraph, stop removing
            }
        }

        // Add gradient blur to the last kept paragraph (if any remain)
        let lastParagraph = keptParagraphs.length > 0 ? keptParagraphs[keptParagraphs.length - 1] : null;
        let blurWrapper = null;
        
        if (lastParagraph && CONFIG.gradientBlur.enabled) {
            blurWrapper = applyGradientBlur(lastParagraph);
        }

        // Add subscription promo graphic after the last kept paragraph (after blur wrapper if it exists)
        addSubscriptionPromo(targetElement, lastParagraph, blurWrapper);
    }
    
    // Function to apply gradient blur to the last paragraph
    function applyGradientBlur(element) {
        if (!element) {
            return null;
        }
        
        // Create a wrapper for the gradient blur effect
        const wrapper = document.createElement('div');
        wrapper.id = CONFIG.ids.gradientBlurWrapper;
        wrapper.style.cssText = 
            'position: relative !important; ' +
            'display: block !important; ' +
            'width: 100% !important;';
        
        // Create gradient overlay mask
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.cssText = 
            'position: absolute !important; ' +
            'top: 0 !important; ' +
            'left: 0 !important; ' +
            'right: 0 !important; ' +
            'bottom: 0 !important; ' +
            'background: ' + CONFIG.gradientBlur.gradient + ' !important; ' +
            'pointer-events: none !important; ' +
            'z-index: 1 !important;';
        
        // Wrap the element
        if (element.parentNode) {
            // Insert wrapper before the element
            element.parentNode.insertBefore(wrapper, element);
            // Move element into wrapper
            wrapper.appendChild(element);
            // Add gradient overlay
            wrapper.appendChild(gradientOverlay);
        }
        
        if (CONFIG.logging.verbose) console.log('Gradient blur applied to last paragraph');
        return wrapper; // Return the wrapper so promo can be inserted after it
    }
    
    // Function to create subscription promo graphic
    function createSubscriptionGraphic(insertTarget) {
        // Check if already created
        if (document.getElementById(CONFIG.ids.promoContainer)) {
            return;
        }

        // Create main container
        const container = document.createElement('div');
        container.id = CONFIG.ids.promoContainer;
        container.style.cssText = 
            'position: relative; ' +
            'width: 100%; ' +
            'max-width: ' + CONFIG.promo.containerMaxWidth + '; ' +
            'margin: ' + CONFIG.promo.containerMargin + '; ' +
            'background-color: ' + CONFIG.promo.containerBackground + '; ' +
            'display: flex; ' +
            'border-top: ' + CONFIG.promo.borderWidth + ' solid ' + CONFIG.promo.borderColor + '; ' +
            'border-bottom: ' + CONFIG.promo.borderWidth + ' solid ' + CONFIG.promo.borderColor + '; ' +
            'box-sizing: border-box;';

        // Create inner content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.style.cssText = 
            'display: flex; ' +
            'width: 100%; ' +
            'position: relative; ' +
            'align-items: stretch;';

        // Create left section
        const leftSection = document.createElement('div');
        leftSection.style.cssText = 
            'position: relative; ' +
            'display: flex; ' +
            'align-items: center; ' +
            'justify-content: center; ' +
            'box-sizing: border-box;';

        // Create left image link
        const leftLink = document.createElement('a');
        leftLink.href = CONFIG.urls.login;
        leftLink.style.cssText = 'display: block; text-decoration: none;';
        
        // Create left image
        const leftImg = document.createElement('img');
        leftImg.src = CONFIG.images.left.src;
        leftImg.alt = CONFIG.images.left.alt;
        leftImg.style.cssText = 
            'max-width: 100%; ' +
            'width: auto; ' +
            'height: auto; ' +
            'object-fit: contain; ' +
            'display: block;';

        leftLink.appendChild(leftImg);
        leftSection.appendChild(leftLink);

        // Create right section
        const rightSection = document.createElement('div');
        rightSection.style.cssText = 
            'position: relative; ' +
            'display: flex; ' +
            'align-items: center; ' +
            'justify-content: center; ' +
            'box-sizing: border-box;';

        // Create right image link
        const rightLink = document.createElement('a');
        rightLink.href = CONFIG.urls.subscription;
        rightLink.style.cssText = 'display: block; text-decoration: none;';
        
        // Create right image
        const rightImg = document.createElement('img');
        rightImg.src = CONFIG.images.right.src;
        rightImg.alt = CONFIG.images.right.alt;
        rightImg.style.cssText = 
            'max-width: 100%; ' +
            'width: auto; ' +
            'height: auto; ' +
            'object-fit: contain; ' +
            'display: block;';

        rightLink.appendChild(rightImg);
        rightSection.appendChild(rightLink);

        // Assemble the structure
        contentWrapper.appendChild(leftSection);
        contentWrapper.appendChild(rightSection);
        container.appendChild(contentWrapper);

        // Create wrapper div for centering
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'text-align: center; margin: ' + CONFIG.promo.wrapperMargin + '; padding: ' + CONFIG.promo.wrapperPadding + ';';
        wrapper.appendChild(container);

        // Insert the promo graphic at the target location
        if (insertTarget && insertTarget.parentNode) {
            if (insertTarget.nextSibling) {
                insertTarget.parentNode.insertBefore(wrapper, insertTarget.nextSibling);
            } else {
                insertTarget.parentNode.appendChild(wrapper);
            }
        } else {
            // Fallback: append to target element
            if (insertTarget) {
                insertTarget.appendChild(wrapper);
            }
        }
    }

    // Function to add subscription promo graphic after the last kept paragraph
    function addSubscriptionPromo(targetElement, lastParagraph, blurWrapper) {
        // Check if promo graphic already exists
        if (targetElement.querySelector('#' + CONFIG.ids.promoContainer)) {
            return;
        }
        
        // Determine where to insert the promo graphic
        let insertTarget = null;
        if (blurWrapper && blurWrapper.parentNode) {
            insertTarget = blurWrapper;
        } else if (lastParagraph && lastParagraph.parentNode) {
            insertTarget = lastParagraph;
        } else {
            insertTarget = targetElement;
        }
        
        // Create and insert the subscription promo graphic
        createSubscriptionGraphic(insertTarget);
        
        if (CONFIG.logging.verbose) console.log('Subscription promo graphic added after last kept paragraph');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContentLock);
    } else {
        // DOM is already loaded
        initContentLock();
    }

    // Also try after delays to catch dynamically loaded content
    CONFIG.initDelays.forEach(function(delay) {
        setTimeout(initContentLock, delay);
    });
})();

