/**
 * Content Lock Script
 * Keeps only the first <p> tag and removes all other <p> tags, then inserts subscription button
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    function initContentLock() {
        // Check if user has active subscription
        // Only apply lock if subscription is expired or doesn't exist
        // Lock applies when: expire_subscription === true OR subscription data doesn't exist
        const shouldApplyLock = (
            typeof drupalSettings === 'undefined' ||
            !drupalSettings ||
            !drupalSettings.user ||
            !drupalSettings.user.subscription ||
            drupalSettings.user.subscription.expire_subscription === true
        );
        
        // If user has active subscription, don't apply lock
        if (!shouldApplyLock) {
            console.log('User has active subscription. Content lock not applied.');
            return;
        }
        
        // Find the specific target element: //*[@id="block-bokss-content"]/div/section[2]/div/div[2]
        // This translates to: #block-bokss-content > div > section:nth-of-type(2) > div > div:nth-child(2)
        const blockContent = document.getElementById('block-bokss-content');
        
        if (!blockContent) {
            console.warn('block-bokss-content not found. Content lock not applied.');
            return;
        }

        // Navigate to the target element
        const nodeContainer = blockContent.querySelector('div.node-container');
        if (!nodeContainer) {
            console.warn('node-container not found. Content lock not applied.');
            return;
        }

        const sections = nodeContainer.querySelectorAll('section');
        if (sections.length < 2) {
            console.warn('Second section not found. Content lock not applied.');
            return;
        }

        const targetSection = sections[1]; // Second section (index 1)
        const sectionDivs = targetSection.querySelectorAll('div');
        
        if (sectionDivs.length < 2) {
            console.warn('Target div not found in section. Content lock not applied.');
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
            console.warn('Target element (div[2]) not found. Content lock not applied.');
            return;
        }

        console.log('Target element found:', targetElement);

        // Check if content has already been processed (promo graphic exists)
        if (targetElement.querySelector('#subscription-promo-container') || targetElement.querySelector('#subscription-btn-lock-area')) {
            console.log('Content already processed. Skipping.');
            return;
        }

        // Find all <p> tags within the target element
        const allParagraphs = targetElement.querySelectorAll('p');
        
        if (allParagraphs.length === 0) {
            console.warn('No <p> tags found in target element. Content lock not applied.');
            return;
        }

        // Keep only the first 5 <p> tags, remove all others
        const paragraphsToKeep = Math.min(5, allParagraphs.length);
        const keptParagraphs = [];
        
        for (let i = 0; i < paragraphsToKeep; i++) {
            keptParagraphs.push(allParagraphs[i]);
        }
        
        // Remove all other paragraphs (after the first 5)
        for (let i = paragraphsToKeep; i < allParagraphs.length; i++) {
            allParagraphs[i].remove();
            console.log('Removed paragraph:', i + 1);
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
            if (child.id === 'subscription-btn-container' || 
                child.id === 'subscription-promo-container' ||
                child.id === 'gradient-blur-wrapper' ||
                child.querySelector('#subscription-btn-container') ||
                child.querySelector('#subscription-promo-container') ||
                child.querySelector('#subscription-btn-lock-area') ||
                child.querySelector('#gradient-blur-wrapper')) {
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
                    if (sibling.id === 'subscription-btn-container' || 
                        sibling.id === 'subscription-promo-container' ||
                        sibling.id === 'gradient-blur-wrapper' ||
                        sibling.querySelector('#subscription-btn-container') ||
                        sibling.querySelector('#subscription-promo-container') ||
                        sibling.querySelector('#subscription-btn-lock-area') ||
                        sibling.querySelector('#gradient-blur-wrapper')) {
                        return;
                    }
                    // Remove siblings that aren't kept paragraphs
                    if (sibling !== keptPara && !keptParagraphs.includes(sibling)) {
                        sibling.remove();
                    }
                });
            }
        });

        console.log('Kept first', paragraphsToKeep, 'paragraph(s), removed', allParagraphs.length - paragraphsToKeep, 'other paragraphs and', elementsToRemove.length, 'other elements.');

        // Check and remove blank last paragraphs
        while (keptParagraphs.length > 0) {
            const lastPara = keptParagraphs[keptParagraphs.length - 1];
            const textContent = lastPara.textContent ? lastPara.textContent.trim() : '';
            const innerHTML = lastPara.innerHTML ? lastPara.innerHTML.trim() : '';
            
            // Check if paragraph is blank (empty text or only whitespace/HTML tags)
            if (textContent === '' || innerHTML === '' || innerHTML === '<br>' || innerHTML === '<br/>') {
                console.log('Removing blank last paragraph');
                lastPara.remove();
                keptParagraphs.pop();
            } else {
                break; // Found a non-blank paragraph, stop removing
            }
        }

        // Add gradient blur to the last kept paragraph (if any remain)
        let lastParagraph = keptParagraphs.length > 0 ? keptParagraphs[keptParagraphs.length - 1] : null;
        let blurWrapper = null;
        
        if (lastParagraph) {
            blurWrapper = applyGradientBlur(lastParagraph);
        }

        // Add subscription button after the last kept paragraph (after blur wrapper if it exists)
        addSubscriptionButton(targetElement, lastParagraph, blurWrapper);
    }
    
    // Function to apply gradient blur to the last paragraph
    function applyGradientBlur(element) {
        if (!element) {
            return null;
        }
        
        // Create a wrapper for the gradient blur effect
        const wrapper = document.createElement('div');
        wrapper.id = 'gradient-blur-wrapper';
        wrapper.style.cssText = 
            'position: relative !important; ' +
            'display: block !important; ' +
            'width: 100% !important;';
        
        // Apply blur filter to the element (only the paragraph, not its children's text)
        /*element.style.cssText = 
            (element.style.cssText || '') + 
            'filter: blur(3px) !important; ' +
            '-webkit-filter: blur(3px) !important; ' +
            'opacity: 0.7 !important; ' +
            'transition: filter 0.3s ease, opacity 0.3s ease !important;';
        */
        
        // Create gradient overlay mask
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.cssText = 
            'position: absolute !important; ' +
            'top: 0 !important; ' +
            'left: 0 !important; ' +
            'right: 0 !important; ' +
            'bottom: 0 !important; ' +
            'background: linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.3) 70%, rgba(255, 255, 255, 0.8) 100%) !important; ' +
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
        
        console.log('Gradient blur applied to last paragraph');
        return wrapper; // Return the wrapper so button can be inserted after it
    }
    
    // Function to create subscription promo graphic
    function createSubscriptionGraphic(insertTarget) {
        // Check if already created
        if (document.getElementById('subscription-promo-container')) {
            return;
        }

        // Create main container
        const container = document.createElement('div');
        container.id = 'subscription-promo-container';
        container.style.cssText = 
            'position: relative; ' +
            'width: 100%; ' +
            'max-width: 1200px; ' +
            'margin: 30px auto; ' +
            'background-color: #FFFFFF; ' +
            'display: flex; ' +
            'border-top: 5px solid #FF8C42; ' +
            'border-bottom: 5px solid #FF8C42; ' +
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
        leftLink.href = '/oauth2/login';
        leftLink.style.cssText = 'display: block; text-decoration: none;';
        
        // Create left image
        const leftImg = document.createElement('img');
        leftImg.src = '/sites/default/files/inpages/photo/subscription_promo_left.png';
        leftImg.alt = 'Re:Fresh 會員登入';
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
        rightLink.href = '/new-subscription';
        rightLink.style.cssText = 'display: block; text-decoration: none;';
        
        // Create right image
        const rightImg = document.createElement('img');
        rightImg.src = '/sites/default/files/inpages/photo/subscription_promo_right.png';
        rightImg.alt = '成為 Re:Fresh 會員';
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
        wrapper.style.cssText = 'text-align: center; margin: 30px 0; padding: 0 20px;';
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
    function addSubscriptionButton(targetElement, lastParagraph, blurWrapper) {
        // Check if promo graphic already exists
        if (targetElement.querySelector('#subscription-promo-container')) {
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
        
        console.log('Subscription promo graphic added after last kept paragraph');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContentLock);
    } else {
        // DOM is already loaded
        initContentLock();
    }

    // Also try after delays to catch dynamically loaded content
    setTimeout(initContentLock, 100);
    setTimeout(initContentLock, 500);
    setTimeout(initContentLock, 1000);
})();

