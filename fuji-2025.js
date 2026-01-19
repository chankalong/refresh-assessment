(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSurvey);
    } else {
        initSurvey();
    }
    
    function initSurvey() {
        console.log('Survey script loaded');
        
        // Define sections in order
        const sections = [
            'section_consent',
            'section_part1',
            'section_part2',
            'section_part3',
            'section_part4',
            'section_personal'
        ];
        
        let currentSectionIndex = 0;
        let isInitialLoad = true;
        let userName = '';
        let userEmail = '';
        const redirectUrl = '/oauth2/login'; // Login redirect URL
        
        // Initialize hidden metadata fields from Drupal settings
        (function initHiddenFields() {
            try {
                var system_id_textbox = document.getElementById('system_id');
                var member_id_textbox = document.getElementById('member_id');
                var uid_textbox = document.getElementById('uid');
                var member_level_textbox = document.getElementById('member_level');
                var eap_company_textbox = document.getElementById('eap_company');
                var complete_time_textbox = document.getElementById('complete_time');
                var subscription_textbox = document.getElementById('subscription');
                
                if (!system_id_textbox || !member_id_textbox || !uid_textbox || !member_level_textbox || !eap_company_textbox || !complete_time_textbox || !subscription_textbox) {
                    return;
                }
                
                // Basic Drupal settings checks
                if (typeof drupalSettings !== 'undefined') {
                    if (drupalSettings.user && drupalSettings.user.member_id) {
                        member_id_textbox.value = drupalSettings.user.member_id;
                    }
                    if (drupalSettings.bokss && drupalSettings.bokss.user_uuid) {
                        system_id_textbox.value = drupalSettings.bokss.user_uuid;
                    }
                }
                
                // UID (random if not already set)
                if (uid_textbox.value) {
                    console.log('input uid value already');
                } else {
                    uid_textbox.value = Math.random();
                }
                
                // Member level
                if (typeof drupalSettings !== 'undefined' && drupalSettings.user) {
                    if (drupalSettings.user.levels === undefined) {
                        member_level_textbox.value = 0;
                    } else {
                        member_level_textbox.value = drupalSettings.user.levels[0];
                    }
                }
                
                // EAP company
                if (typeof drupalSettings !== 'undefined' && drupalSettings.user) {
                    if (drupalSettings.user.eap === undefined) {
                        eap_company_textbox.value = '0';
                    } else {
                        eap_company_textbox.value = drupalSettings.user.eap.label;
                    }
                }
                
                // Helper to left-pad numbers
                Number.prototype.padLeft = function (base, chr) {
                    var len = String(base || 10).length - String(this).length + 1;
                    return len > 0 ? new Array(len).join(chr || '0') + this : this;
                };
                
                // Completion time in yyyy-mm-dd hh:mm:ss
                var d = new Date();
                var dformat =
                    [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') +
                    ' ' +
                    [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
                complete_time_textbox.value = dformat;
                
                // Subscription expiry
                if (typeof drupalSettings !== 'undefined' && drupalSettings.user && drupalSettings.user.subscription) {
                    subscription_textbox.value = drupalSettings.user.subscription.expire_subscription;
                }
            } catch (e) {
                console.error('Error initializing hidden metadata fields:', e);
            }
        })();
        
        // Login check functions
        function isAnonymous() {
            try {
                return !drupalSettings || !drupalSettings.user || drupalSettings.user.member_id === "anonymous";
            } catch (e) {
                return true;
            }
        }
        
        function shouldBlock() {
            return isAnonymous();
        }
        
        function showLoginModal(options) {
            const message = options.message || '您尚未登入。';
            const ctaText = options.ctaText || '登入';
            const ctaHref = options.ctaHref || '/';
            
            if (typeof Swal === 'undefined') {
                // Fallback to basic alert if SweetAlert2 is not loaded
                alert(message);
                return;
            }
            
            Swal.fire({
                title: '提示',
                text: message,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: ctaText,
                cancelButtonText: '關閉',
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#6c757d',
                allowOutsideClick: true,
                allowEscapeKey: true
            }).then(function(result) {
                if (result.isConfirmed) {
                    window.location.href = ctaHref;
                }
            });
        }
        
        // Show first section
        showSection(0);
        
        // Set up navigation buttons
        setupNavigation();
        
        // Set up conditional fields
        setupConditionalFields();
        
        // Set up form submission
        setupFormSubmission();
        
        // Fetch user profile (name and email) in the background while user fills questionnaire
        // This runs asynchronously and won't block the UI
        fetchUserProfile();
        
        function showSection(index, shouldScroll) {
            // Hide all sections
            sections.forEach(function(sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.style.display = 'none';
                }
            });
            
            // Show current section
            if (index >= 0 && index < sections.length) {
                const currentSection = document.getElementById(sections[index]);
                if (currentSection) {
                    currentSection.style.display = 'block';
                    currentSectionIndex = index;
                    
                    // Only scroll if explicitly requested (not on initial load)
                    if (shouldScroll && !isInitialLoad) {
                        currentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    
                    // Mark that initial load is complete after first section is shown
                    if (isInitialLoad) {
                        isInitialLoad = false;
                    }
                }
            }
        }
        
        function validateSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) return true;
            
            // Get all required fields in this section
            const requiredFields = section.querySelectorAll('[required="required"]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                } else if (field.tagName === 'SELECT') {
                    if (!field.value || field.value === '') {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                } else {
                    if (!field.value || field.value.trim() === '') {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                }
            });
            
            // Special validation for consent section
            if (sectionId === 'section_consent') {
                const consentCheckbox = document.getElementById('consent_checkbox');
                if (consentCheckbox && !consentCheckbox.checked) {
                    isValid = false;
                    if (typeof Swal !== 'undefined') {
                        Swal.fire({
                            title: '提示',
                            text: '請先同意參加是次問卷調查。',
                            icon: 'warning',
                            confirmButtonText: '確定',
                            confirmButtonColor: '#0d6efd'
                        });
                    } else {
                        alert('請先同意參加是次問卷調查。');
                    }
                }
            }
            
            // Special validation for birth year (must be 4 digits)
            if (sectionId === 'section_personal') {
                const birthyear = document.getElementById('personal_birthyear');
                if (birthyear) {
                    const year = birthyear.value.trim();
                    if (!year || !/^\d{4}$/.test(year) || parseInt(year) < 1900 || parseInt(year) > 2016) {
                        birthyear.style.borderColor = 'red';
                        isValid = false;
                        if (year) {
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({
                                    title: '輸入錯誤',
                                    text: '請輸入有效的4位數字年份（1900-2016）',
                                    icon: 'error',
                                    confirmButtonText: '確定',
                                    confirmButtonColor: '#0d6efd'
                                });
                            } else {
                                alert('請輸入有效的4位數字年份（1900-2016）');
                            }
                        }
                    } else {
                        birthyear.style.borderColor = '';
                    }
                }
            }
            
            return isValid;
        }
        
        function setupNavigation() {
            // Consent to Part 1 - with login check
            const btnNextConsent = document.getElementById('btn_next_consent');
            if (btnNextConsent) {
                btnNextConsent.addEventListener('click', function(e) {
                    // Check login first
                    if (shouldBlock()) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        showLoginModal({
                            message: '您尚未登入。請先登入以繼續。',
                            ctaText: '登入',
                            ctaHref: redirectUrl
                        });
                        return;
                    }
                    
                    // If logged in, proceed with validation and navigation
                    if (validateSection('section_consent')) {
                        showSection(1, true);
                    }
                });
            }
            
            // Part 1 to Part 2
            const btnNextPart1 = document.getElementById('btn_next_part1');
            if (btnNextPart1) {
                btnNextPart1.addEventListener('click', function() {
                    if (validateSection('section_part1')) {
                        showSection(2, true);
                    }
                });
            }
            
            // Part 2 navigation
            const btnPrevPart2 = document.getElementById('btn_prev_part2');
            if (btnPrevPart2) {
                btnPrevPart2.addEventListener('click', function() {
                    showSection(1, true);
                });
            }
            
            const btnNextPart2 = document.getElementById('btn_next_part2');
            if (btnNextPart2) {
                btnNextPart2.addEventListener('click', function() {
                    if (validateSection('section_part2')) {
                        showSection(3, true);
                    }
                });
            }
            
            // Part 3 navigation
            const btnPrevPart3 = document.getElementById('btn_prev_part3');
            if (btnPrevPart3) {
                btnPrevPart3.addEventListener('click', function() {
                    showSection(2, true);
                });
            }
            
            const btnNextPart3 = document.getElementById('btn_next_part3');
            if (btnNextPart3) {
                btnNextPart3.addEventListener('click', function() {
                    if (validateSection('section_part3')) {
                        showSection(4, true);
                    }
                });
            }
            
            // Part 4 navigation
            const btnPrevPart4 = document.getElementById('btn_prev_part4');
            if (btnPrevPart4) {
                btnPrevPart4.addEventListener('click', function() {
                    showSection(3, true);
                });
            }
            
            const btnNextPart4 = document.getElementById('btn_next_part4');
            if (btnNextPart4) {
                btnNextPart4.addEventListener('click', function() {
                    if (validateSection('section_part4')) {
                        showSection(5, true);
                    }
                });
            }
            
            // Personal info navigation
            const btnPrevPersonal = document.getElementById('btn_prev_personal');
            if (btnPrevPersonal) {
                btnPrevPersonal.addEventListener('click', function() {
                    showSection(4, true);
                });
            }
        }
        
        function setupConditionalFields() {
            // Gender other field
            const personalGender = document.getElementById('personal_gender');
            const personalGenderOther = document.getElementById('personal_gender_other_wrapper');
            if (personalGender && personalGenderOther) {
                personalGender.addEventListener('change', function() {
                    if (this.value === '2') {
                        personalGenderOther.style.display = 'block';
                        document.getElementById('personal_gender_other').required = true;
                    } else {
                        personalGenderOther.style.display = 'none';
                        document.getElementById('personal_gender_other').required = false;
                        document.getElementById('personal_gender_other').value = '';
                    }
                });
            }
            
            // Education other field
            const personalEducation = document.getElementById('personal_education');
            const personalEducationOther = document.getElementById('personal_education_other_wrapper');
            if (personalEducation && personalEducationOther) {
                personalEducation.addEventListener('change', function() {
                    if (this.value === '8') {
                        personalEducationOther.style.display = 'block';
                        document.getElementById('personal_education_other').required = true;
                    } else {
                        personalEducationOther.style.display = 'none';
                        document.getElementById('personal_education_other').required = false;
                        document.getElementById('personal_education_other').value = '';
                    }
                });
            }
            
            // Occupation other field
            const personalOccupation = document.getElementById('personal_occupation');
            const personalOccupationOther = document.getElementById('personal_occupation_other_wrapper');
            if (personalOccupation && personalOccupationOther) {
                personalOccupation.addEventListener('change', function() {
                    if (this.value === '10') {
                        personalOccupationOther.style.display = 'block';
                        document.getElementById('personal_occupation_other').required = true;
                    } else {
                        personalOccupationOther.style.display = 'none';
                        document.getElementById('personal_occupation_other').required = false;
                        document.getElementById('personal_occupation_other').value = '';
                    }
                });
            }
            
            // Birth year validation (must be 4 digits)
            const personalBirthyear = document.getElementById('personal_birthyear');
            if (personalBirthyear) {
                personalBirthyear.addEventListener('blur', function() {
                    const year = this.value.trim();
                    if (year && (!/^\d{4}$/.test(year) || parseInt(year) < 1900 || parseInt(year) > 2016)) {
                        this.style.borderColor = 'red';
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                title: '輸入錯誤',
                                text: '請輸入有效的4位數字年份（1900-2016）',
                                icon: 'error',
                                confirmButtonText: '確定',
                                confirmButtonColor: '#0d6efd'
                            });
                        } else {
                            alert('請輸入有效的4位數字年份（1900-2016）');
                        }
                    } else {
                        this.style.borderColor = '';
                    }
                });
                
                personalBirthyear.addEventListener('input', function() {
                    // Only allow digits
                    this.value = this.value.replace(/[^\d]/g, '');
                });
            }
        }
        
        // Helper function to reverse score (0-4 scale)
        function reverseScore4(value) {
            return 4 - parseInt(value);
        }
        
        // Helper function to reverse score (1-5 scale)
        function reverseScore5(value) {
            return 6 - parseInt(value);
        }
        
        // Helper function to get field value
        function getFieldValue(id) {
            const field = document.getElementById(id);
            return field && field.value ? parseInt(field.value) : null;
        }
        
        // Calculate scores for each section according to research literature
        function calculateScores() {
            const scores = {
                // Part 1: WHO-5 (sum, range 0-25)
                part1: 0,
                
                // Part 2: BESAA (two subscales, means, range 0-4)
                part2_appearance: 0,
                part2_attribution: 0,
                
                // Part 3: SCS (Level 1 and Level 2 subscales, means, range 1-5)
                part3_selfKindness: 0,
                part3_commonHumanity: 0,
                part3_mindfulness: 0,
                part3_selfJudgment: 0,
                part3_isolation: 0,
                part3_overIdentification: 0,
                part3_selfCompassion: 0,  // Level 2
                part3_selfCriticism: 0,   // Level 2
                
                // Part 4: SPMS (mean, range 0-4 with 0-4 scale)
                part4: 0
            };
            
            // Part 1: WHO-5 - Sum of all items (range 0-25)
            for (let i = 1; i <= 5; i++) {
                const value = getFieldValue('part1_q' + i);
                if (value !== null) {
                    scores.part1 += value;
                }
            }
            
            // Part 2: BESAA - Two subscales
            // Appearance = Sum of 1, 4, 5R, 6R, 7R, 10R, 12, 13R, 15R, 16
            const appearanceItems = [
                { q: 1, reverse: false },
                { q: 4, reverse: false },
                { q: 5, reverse: true },
                { q: 6, reverse: true },
                { q: 7, reverse: true },
                { q: 10, reverse: true },
                { q: 12, reverse: false },
                { q: 13, reverse: true },
                { q: 15, reverse: true },
                { q: 16, reverse: false }
            ];
            
            let appearanceSum = 0;
            let appearanceCount = 0;
            appearanceItems.forEach(function(item) {
                const value = getFieldValue('part2_q' + item.q);
                if (value !== null) {
                    appearanceSum += item.reverse ? reverseScore4(value) : value;
                    appearanceCount++;
                }
            });
            // Store BESAA Appearance as sum (range 0-40)
            scores.part2_appearance = appearanceSum;
            
            // Attribution = Sum of 2, 3, 8, 11, 14
            const attributionItems = [2, 3, 8, 11, 14];
            let attributionSum = 0;
            let attributionCount = 0;
            attributionItems.forEach(function(q) {
                const value = getFieldValue('part2_q' + q);
                if (value !== null) {
                    attributionSum += value;
                    attributionCount++;
                }
            });
            // Store BESAA Attribution as sum (range 0-20)
            scores.part2_attribution = attributionSum;
            
            // Part 3: SCS - Level 1 subscales
            // Self-Kindness: Mean of 5, 13, 20, 24, 27
            const selfKindnessItems = [5, 13, 20, 24, 27];
            let selfKindnessSum = 0;
            let selfKindnessCount = 0;
            selfKindnessItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    selfKindnessSum += value;
                    selfKindnessCount++;
                }
            });
            scores.part3_selfKindness = selfKindnessCount > 0 ? selfKindnessSum / selfKindnessCount : 0;
            
            // Common Humanity: Mean of 3, 7, 11, 16
            const commonHumanityItems = [3, 7, 11, 16];
            let commonHumanitySum = 0;
            let commonHumanityCount = 0;
            commonHumanityItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    commonHumanitySum += value;
                    commonHumanityCount++;
                }
            });
            scores.part3_commonHumanity = commonHumanityCount > 0 ? commonHumanitySum / commonHumanityCount : 0;
            
            // Mindfulness: Mean of 10, 15, 18, 23
            const mindfulnessItems = [10, 15, 18, 23];
            let mindfulnessSum = 0;
            let mindfulnessCount = 0;
            mindfulnessItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    mindfulnessSum += value;
                    mindfulnessCount++;
                }
            });
            scores.part3_mindfulness = mindfulnessCount > 0 ? mindfulnessSum / mindfulnessCount : 0;
            
            // Self-Judgment: Mean of 1, 8, 12, 17, 22 (reverse)
            const selfJudgmentItems = [1, 8, 12, 17, 22];
            let selfJudgmentSum = 0;
            let selfJudgmentCount = 0;
            selfJudgmentItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    selfJudgmentSum += reverseScore5(value);
                    selfJudgmentCount++;
                }
            });
            scores.part3_selfJudgment = selfJudgmentCount > 0 ? selfJudgmentSum / selfJudgmentCount : 0;
            
            // Isolation: Mean of 4, 14, 19, 26 (reverse)
            const isolationItems = [4, 14, 19, 26];
            let isolationSum = 0;
            let isolationCount = 0;
            isolationItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    isolationSum += reverseScore5(value);
                    isolationCount++;
                }
            });
            scores.part3_isolation = isolationCount > 0 ? isolationSum / isolationCount : 0;
            
            // Over-identification: Mean of 2, 6, 21, 25 (reverse)
            const overIdentificationItems = [2, 6, 21, 25];
            let overIdentificationSum = 0;
            let overIdentificationCount = 0;
            overIdentificationItems.forEach(function(q) {
                const value = getFieldValue('part3_q' + q);
                if (value !== null) {
                    overIdentificationSum += reverseScore5(value);
                    overIdentificationCount++;
                }
            });
            scores.part3_overIdentification = overIdentificationCount > 0 ? overIdentificationSum / overIdentificationCount : 0;
            
            // Part 3: SCS - Level 2 subscales
            // Self-Compassion: Mean of Self-Kindness, Common Humanity, Mindfulness
            scores.part3_selfCompassion = (scores.part3_selfKindness + scores.part3_commonHumanity + scores.part3_mindfulness) / 3;
            
            // Self-Criticism: Mean of Self-Judgment, Isolation, Over-identification
            scores.part3_selfCriticism = (scores.part3_selfJudgment + scores.part3_isolation + scores.part3_overIdentification) / 3;
            
            // Part 4: SPMS - Mean of all items (range 0-4 with 0-4 scale)
            let part4Sum = 0;
            let part4Count = 0;
            for (let i = 1; i <= 10; i++) {
                const value = getFieldValue('part4_q' + i);
                if (value !== null) {
                    part4Sum += value;
                    part4Count++;
                }
            }
            scores.part4 = part4Count > 0 ? part4Sum / part4Count : 0;
            
            return scores;
        }
        
        // Categorize scores into groups according to research literature
        function categorizeScores(scores) {
            const categories = {
                // Part 1: WHO-5
                part1: '',
                
                // Part 2: BESAA (two subscales)
                part2_appearance: '',
                part2_attribution: '',
                
                // Part 3: SCS Level 2 (more interpretable)
                part3_selfCompassion: '',
                part3_selfCriticism: '',
                
                // Part 4: SPMS
                part4: ''
            };

            // Determine age group from birth year (12-18 vs 19+)
            let ageGroup = null; // '12-18' or '19+'
            try {
                const birthField = document.getElementById('personal_birthyear');
                if (birthField && birthField.value) {
                    const birthYear = parseInt(birthField.value, 10);
                    const currentYear = new Date().getFullYear();
                    if (!isNaN(birthYear) && birthYear > 1900 && birthYear <= currentYear) {
                        const age = currentYear - birthYear;
                        if (age <= 18) {
                            ageGroup = '12-18';
                        } else if (age >= 19) {
                            ageGroup = '19+';
                        }
                    }
                }
            } catch (e) {
                // If anything goes wrong, fall back to generic interpretation below
                ageGroup = null;
            }
            
            // Part 1: WHO-5
            // Cut-off: < 13 = poor wellbeing; >= 13 = good wellbeing
            if (scores.part1 < 13) {
                categories.part1 = '欠佳';
            } else {
                categories.part1 = '理想';
            }
            
            // Part 2: BESAA - Appearance subscale (sum)
            // Age-specific cutoffs:
            //  - 12-18歲: 高 22–40, 低 0–21
            //  - 19歲或以上: 高 26–40, 低 0–25
            if (ageGroup === '12-18') {
                if (scores.part2_appearance >= 22) {
                    categories.part2_appearance = '高';
                } else if (scores.part2_appearance <= 21) {
                    categories.part2_appearance = '低';
                } else {
                    categories.part2_appearance = '中等';
                }
            } else if (ageGroup === '19+') {
                if (scores.part2_appearance >= 26) {
                    categories.part2_appearance = '高';
                } else if (scores.part2_appearance <= 25) {
                    categories.part2_appearance = '低';
                } else {
                    categories.part2_appearance = '中等';
                }
            } else {
                // Fallback: use generic mean-based interpretation if age is unavailable
                const appearanceMean = scores.part2_appearance / 10;
                if (appearanceMean <= 2.49) {
                    categories.part2_appearance = '低';
                } else if (appearanceMean <= 3.5) {
                    categories.part2_appearance = '中等';
                } else {
                    categories.part2_appearance = '高';
                }
            }

            // Part 2: BESAA - Attribution subscale (sum)
            // Age-specific cutoffs:
            //  - 12-18歲: 高 6–20, 低 0–5
            //  - 19歲或以上: 高 8–20, 低 0–7
            if (ageGroup === '12-18') {
                if (scores.part2_attribution >= 6) {
                    categories.part2_attribution = '高';
                } else if (scores.part2_attribution <= 5) {
                    categories.part2_attribution = '低';
                } else {
                    categories.part2_attribution = '中等';
                }
            } else if (ageGroup === '19+') {
                if (scores.part2_attribution >= 8) {
                    categories.part2_attribution = '高';
                } else if (scores.part2_attribution <= 7) {
                    categories.part2_attribution = '低';
                } else {
                    categories.part2_attribution = '中等';
                }
            } else {
                // Fallback: use generic mean-based interpretation if age is unavailable
                const attributionMean = scores.part2_attribution / 5;
                if (attributionMean <= 2.49) {
                    categories.part2_attribution = '低';
                } else if (attributionMean <= 3.5) {
                    categories.part2_attribution = '中等';
                } else {
                    categories.part2_attribution = '高';
                }
            }
            
            // Part 3: SCS Level 2 - Self-Compassion (range 1-5)
            // Categories: 1.0-2.49 = low, 2.5-3.5 = moderate, 3.51-5.0 = high
            if (scores.part3_selfCompassion <= 2.49) {
                categories.part3_selfCompassion = '低';
            } else if (scores.part3_selfCompassion <= 3.5) {
                categories.part3_selfCompassion = '中等';
            } else {
                categories.part3_selfCompassion = '高';
            }
            
            // Part 3: SCS Level 2 - Self-Criticism (range 1-5)
            // Note: Lower is better for self-criticism, so we reverse the interpretation
            // Categories: 1.0-2.49 = low, 2.5-3.5 = moderate, 3.51-5.0 = high
            if (scores.part3_selfCriticism <= 2.49) {
                categories.part3_selfCriticism = '低';
            } else if (scores.part3_selfCriticism <= 3.5) {
                categories.part3_selfCriticism = '中等';
            } else {
                categories.part3_selfCriticism = '高';
            }
            
            // Part 4: SPMS - no cutoff calculation needed
            
            return categories;
        }
        
        // Update thank you message with user name
        function updateThankYouMessage() {
            const resultsDiv = document.getElementById('survey_results');
            if (!resultsDiv) return;
            
            // Find the paragraph containing "(name)" and replace it
            const paragraphs = resultsDiv.querySelectorAll('p');
            paragraphs.forEach(function(p) {
                if (p.textContent.includes('(name)')) {
                    if (userName) {
                        // Replace "(name)" with the actual name: "親愛的 xxx："
                        p.textContent = '親愛的' + userName + '：';
                    } else {
                        // Fallback if name is not available
                        p.textContent = '親愛的參加者：';
                    }
                }
            });
        }
        
        // Helper function to get color based on category
        function getColorForCategory(category, isReversed) {
            // For reversed scales (like self-criticism), lower is better
            if (isReversed) {
                if (category === '低') {
                    return '#4caf50'; // Green (low self-criticism is good)
                } else if (category === '中等') {
                    return '#ff9800'; // Orange
                } else {
                    return '#f44336'; // Red (high self-criticism is bad)
                }
            } else {
                // Normal scales (higher is better)
                if (category === '高' || category === '良好' || category === '理想') {
                    return '#4caf50'; // Green
                } else if (category === '中等') {
                    return '#ff9800'; // Orange
                } else {
                    return '#f44336'; // Red
                }
            }
        }
        
        // Helper function to create Plotly gauge chart
        function createGaugeChart(containerId, value, maxValue, title, color) {
            if (typeof Plotly === 'undefined') {
                console.error('Plotly library not loaded');
                return;
            }
            
            const container = document.getElementById(containerId);
            if (!container) {
                console.error('Container not found: ' + containerId);
                return;
            }
            
            try {
                var data = [
                    {
                        domain: { x: [0, 1], y: [0, 1] },
                        value: value,
                        title: { text: title },
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: {
                            axis: { range: [0, maxValue], tickvals: [0, maxValue/2, maxValue] },
                            bar: { color: color, thickness: 1 },
                            bgcolor: "white"
                        }
                    }
                ];
                
                var layout = {
                    margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 },
                    height: 200,
                    autosize: true,
                    font: {
                        family: 'Arial, sans-serif'
                    },
                    paper_bgcolor: "transparent"
                };
                
                var config = {
                    responsive: true,
                    displaylogo: false,
                    displayModeBar: false
                };
                
                Plotly.newPlot(containerId, data, layout, config);
                console.log('Gauge chart created for: ' + containerId);
            } catch (error) {
                console.error('Error creating gauge chart for ' + containerId + ':', error);
            }
        }
        
        // Generate descriptions based on scores (returns plain text)
        function generateDescriptions(scores, categories) {
            const descriptions = {
                part1: '',
                part2: '',
                part3_selfCompassion: '',
                part3_selfCriticism: '',
                part4: ''
            };
            
            // Part 1: 身心健康狀況
            if (scores.part1 >= 13) {
                descriptions.part1 = '你的身心狀態目前處於理想水平。你較能在日常生活中感受到快樂與活力，並維持良好的休息與精神狀態。';
            } else {
                descriptions.part1 = '你的身心狀態值得多加留意。你目前可能較常感到疲憊或壓力大，或較難在生活中感到活力。這可能是身體和內心在提醒你，是時候給自己多一點關懷與休息。若這些感受持續，尋求專業協助可能對你有所幫助。';
            }
            
            // Part 2: 外貌滿意度與自信
            // Use categories to determine high/low (consistent with categorizeScores)
            const selfEvalHigh = categories.part2_appearance === '高';
            const othersEvalHigh = categories.part2_attribution === '高';
            
            if (selfEvalHigh && othersEvalHigh) {
                descriptions.part2 = '你對自己的外貌有信心，也感受到身邊的人對你的外貌的欣賞。這種「內外一致」的自信，是你強大的能量來源，有助你在生活與人際互動中更積極自在。';
            } else if (!selfEvalHigh && othersEvalHigh) {
                descriptions.part2 = '你可能感受到別人對你外貌的肯定，但你對自己的外表卻有較高的要求，並傾向留意自己的不足。這可能源於你對自我有較高的期望，或受社交媒體上「完美形象」的影響。建議練習接納並相信別人的讚美！當有人欣賞你時，容許自己收下這份肯定，在別人眼中你擁有獨特的魅力。';
            } else if (selfEvalHigh && !othersEvalHigh) {
                descriptions.part2 = '你的心理質素非常強大！即使你認為別人不一定對你的外貌給予最高評價，但你仍能欣賞自己，反映你不容易被別人的眼光左右，並擁有主見。美本來就是主觀的；活成自己喜歡的模樣，比取悅世界更重要。';
            } else {
                descriptions.part2 = '你目前可能較在意自己的外貌，會因此而感到苦惱，同時也擔心別人怎樣看你。當「自己不太滿意」加上「又怕別人不喜歡」這種雙重焦慮，有時會令你感到有壓力。請提醒自己：美，可以有很多不同的標準，我值得活出屬於自己的美，做自己最迷人！';
            }
            
            // Part 3: 自我關懷 - Self-Compassion
            if (scores.part3_selfCompassion >= 3.51) {
                descriptions.part3_selfCompassion = '你擁有良好的自我關懷能力，能理解與接納自己的不完美。這有助你在逆境中能迅速調整自己，以重新恢復力量。';
            } else if (scores.part3_selfCompassion >= 2.5) {
                descriptions.part3_selfCompassion = '你具備一定的自我關懷能力，在某些情況下能體諒自己，但當面對較大的挑戰或壓力時，你較難維持這份自我關懷。建議慢慢培養與練習這份可貴的能力。';
            } else {
                descriptions.part3_selfCompassion = '你可能覺得自己必須完美，所以較少在逆境或困難時對自己展現溫柔。請謹記：你值得被自己理解與呵護。';
            }
            
            // Part 3: 自我關懷 - Negative Self-compassion (Self-Criticism)
            if (scores.part3_selfCriticism >= 3.51) {
                descriptions.part3_selfCriticism = '此外，面對挑戰或不如意時，你傾向對自己嚴厲，容易陷入自我批評或孤立感。這會讓你增加壓力，並影響你從中恢復，建議學習善待自己。';
            } else if (scores.part3_selfCriticism >= 2.5) {
                descriptions.part3_selfCriticism = '此外，你偶爾出現的自我批評聲音，會令你懷疑自己或與人比較，覺得他人似乎更快樂。這些感受雖然常見，但有可能會影響你的情緒和自我接納，建議多些溫柔對待自己。';
            } else {
                descriptions.part3_selfCriticism = '此外，你較少在逆境中過度苛責自己，這種心態讓你能較輕鬆地應對生活中的種種挑戰。';
            }
            
            // Part 4: 照片修飾行為
            descriptions.part4 = '分數愈高，代表你愈多花心力在修飾和美化照片，希望在別人眼中展現出最好的自己。';
            
            return descriptions;
        }
        
        // Display results on thank you page
        function displayResults(scores, categories) {
            const resultsDiv = document.getElementById('survey_results');
            if (!resultsDiv) return;
            
            // Check if results have already been inserted to prevent duplicates
            if (document.getElementById('gauge_part1')) {
                return; // Results already exist, skip insertion
            }
            
            // Format numbers to 2 decimal places
            function formatScore(score) {
                return typeof score === 'number' ? score.toFixed(2) : score;
            }
            
            // Generate descriptions (plain text)
            const descriptions = generateDescriptions(scores, categories);
            
            // Build results HTML with new scoring structure and gauge chart containers
            // Using Tailwind CSS classes for responsive layout (one column on small screens, two columns on medium+)
            const resultsHTML = '<h3 style="text-align: center;">你的結果</h3>' +
                '<div class="py-1 px-8 rounded-4 my-4" style="background-color: #f5f5f5;">' +
                '<h4>第1部分︰WHO-5 (身心健康狀況)</h4>' +
                '<div id="gauge_part1" class="my-5"></div>' +
                '<p style="text-align: center;">' + categories.part1 + '</p>' +
                '<p style="margin-top: 15px;">' + descriptions.part1 + '</p>' +
                '</div>' +
                '<div class="py-1 px-8 rounded-4 my-4" style="background-color: #f5f5f5;">' +
                '<h4>第2部分︰BESAA (外貌滿意度)</h4>' +
                '<div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">' +
                '<div><div id="gauge_part2_appearance"></div><p style="text-align: center;">' + categories.part2_appearance + '</p></div>' +
                '<div><div id="gauge_part2_attribution"></div><p style="text-align: center;">' + categories.part2_attribution + '</p></div>' +
                '</div>' +
                '<p style="margin-top: 15px;">' + descriptions.part2 + '</p>' +
                '</div>' +
                '<div class="py-1 px-8 rounded-4 my-4" style="background-color: #f5f5f5;">' +
                '<h4>第3部分︰SCS (自我關懷)</h4>' +
                '<div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">' +
                '<div><div id="gauge_part3_selfCompassion"></div><p style="text-align: center;">' + categories.part3_selfCompassion + '</p></div>' +
                '<div><div id="gauge_part3_selfCriticism"></div><p style="text-align: center;">' + categories.part3_selfCriticism + '</p></div>' +
                '</div>' +
                '<div>' +
                '<p style="margin-top: 15px;">' + descriptions.part3_selfCompassion + '</p>' +
                '<p style="margin-top: 15px;">' + descriptions.part3_selfCriticism + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="py-1 px-8 rounded-4 my-4" style="background-color: #f5f5f5;">' +
                '<h4>第4部分︰SPMS (照片修飾行為)</h4>' +
                '<div id="gauge_part4" class="my-5"></div>' +
                '<p style="margin-top: 15px;">分數越高，代表你越常花費心力修飾與美化照片，以展現你所<b>追求的理想形象</b>，反映你十分重視自己的形象。</p>' +
                '<p style="margin-top: 15px;">分數較低，意味你越傾向於以自然、未經修飾的樣貌示人，並對此感到自在，擁有一份對<b>真實自我</b>的接納和自信。</p>' +
                '<p style="margin-top: 15px;">無論你的分數高低，這都是一個機會去思考自己在社交媒體上如何呈現真實與理想之間的平衡。</p>' +
                '</div>';
            
            // Find the paragraph that says "（結果TBC）" and replace it with actual results
            const paragraphs = resultsDiv.querySelectorAll('p');
            let resultsInserted = false;
            
            paragraphs.forEach(function(p) {
                if (p.textContent.includes('（結果TBC）')) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = resultsHTML;
                    
                    // Insert all child nodes before the paragraph
                    while (tempDiv.firstChild) {
                        p.parentNode.insertBefore(tempDiv.firstChild, p);
                    }
                    
                    // Remove the "（結果TBC）" paragraph
                    p.remove();
                    resultsInserted = true;
                }
            });
            
            // Fallback: if we didn't find the placeholder, append results
            // But only if results haven't been inserted yet
            if (!resultsInserted) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = resultsHTML;
                
                // Find the paragraph that says "根據你的作答結果，我們為你整理了以下摘要供參考："
                // and insert results after it
                let insertAfterParagraph = null;
                paragraphs.forEach(function(p) {
                    if (p.textContent.includes('根據你的作答結果，我們為你整理了以下摘要供參考：')) {
                        insertAfterParagraph = p;
                    }
                });
                
                if (insertAfterParagraph && insertAfterParagraph.nextSibling) {
                    // Insert after the paragraph
                    while (tempDiv.firstChild) {
                        insertAfterParagraph.parentNode.insertBefore(tempDiv.firstChild, insertAfterParagraph.nextSibling);
                    }
                } else {
                    // Append to the results div as last resort
                    while (tempDiv.firstChild) {
                        resultsDiv.appendChild(tempDiv.firstChild);
                    }
                }
            }
            
            // Create gauge charts after ensuring DOM is ready and Plotly is loaded
            function createAllGaugeCharts(retryCount) {
                retryCount = retryCount || 0;
                const maxRetries = 50; // Maximum 5 seconds (50 * 100ms)
                
                // Check if Plotly is loaded (check both window.Plotly and typeof Plotly)
                if (typeof Plotly === 'undefined' || typeof window.Plotly === 'undefined') {
                    if (retryCount < maxRetries) {
                        console.log('Waiting for Plotly to load... (attempt ' + (retryCount + 1) + '/' + maxRetries + ')');
                        setTimeout(function() {
                            createAllGaugeCharts(retryCount + 1);
                        }, 100);
                        return;
                    } else {
                        console.error('Plotly failed to load after ' + maxRetries + ' attempts. Charts will not be displayed.');
                        return;
                    }
                }
                
                // Check if all containers exist
                const containers = [
                    'gauge_part1',
                    'gauge_part2_appearance',
                    'gauge_part2_attribution',
                    'gauge_part3_selfCompassion',
                    'gauge_part3_selfCriticism',
                    'gauge_part4'
                ];
                
                let allContainersExist = true;
                containers.forEach(function(id) {
                    if (!document.getElementById(id)) {
                        allContainersExist = false;
                        console.log('Container not found: ' + id);
                    }
                });
                
                if (!allContainersExist) {
                    if (retryCount < maxRetries) {
                        console.log('Waiting for containers to be created... (attempt ' + (retryCount + 1) + '/' + maxRetries + ')');
                        setTimeout(function() {
                            createAllGaugeCharts(retryCount + 1);
                        }, 100);
                        return;
                    } else {
                        console.error('Containers not found after ' + maxRetries + ' attempts. Charts will not be displayed.');
                        return;
                    }
                }
                
                // All containers exist and Plotly is loaded, create charts
                console.log('Creating gauge charts...');
                
                // Part 1: WHO-5 (0-25)
                createGaugeChart('gauge_part1', scores.part1, 25, '身心健康狀況', getColorForCategory(categories.part1));
                
                // Part 2: BESAA Appearance (sum 0-40)
                createGaugeChart('gauge_part2_appearance', scores.part2_appearance, 40, '外貌評價', getColorForCategory(categories.part2_appearance));
                
                // Part 2: BESAA Attribution (sum 0-20)
                createGaugeChart('gauge_part2_attribution', scores.part2_attribution, 20, '外貌歸因', getColorForCategory(categories.part2_attribution));
                
                // Part 3: SCS Self-Compassion (1-5)
                createGaugeChart('gauge_part3_selfCompassion', scores.part3_selfCompassion, 5, '自我關懷', getColorForCategory(categories.part3_selfCompassion));
                
                // Part 3: SCS Self-Criticism (1-5) - Lower is better (reversed)
                createGaugeChart('gauge_part3_selfCriticism', scores.part3_selfCriticism, 5, '自我批評', getColorForCategory(categories.part3_selfCriticism, true));
                
                // Part 4: SPMS (0-4 average)
                createGaugeChart('gauge_part4', scores.part4, 4, '鏡頭下的你', '#2196f3');
            }
            
            // Start creating charts after a short delay
            setTimeout(function() {
                createAllGaugeCharts(0);
            }, 100);
        }
        
        function setupFormSubmission() {
            const btnSubmit = document.getElementById('btn_submit');
            if (btnSubmit) {
                btnSubmit.addEventListener('click', function() {
                    if (validateSection('section_personal')) {
                        // Disable submit button to prevent double submission
                        btnSubmit.disabled = true;
                        btnSubmit.textContent = '提交中...';
                        
                        // Calculate scores
                        const scores = calculateScores();
                        const categories = categorizeScores(scores);
                        const descriptions = generateDescriptions(scores, categories);
                        
                        // Collect all form data
                        const formData = collectFormData();
                        
                        // Add scores, categories, and descriptions to form data
                        formData.scores = scores;
                        formData.categories = categories;
                        formData.descriptions = descriptions;
                        
                        // Add timestamp
                        formData.complete_time = new Date().toISOString();
                        
                        // Submit to backend
                        const endpoint = 'https://defaulte276d80940774e26bccb996f646d92.50.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d87d26ad55ec4eb185bc177043d535c8/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3_0Nx2R8FE17wBz6kE1YzyjIWDM80q4D1dXe-rRpbjg';
                        
                        fetch(endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        })
                        .then(function(response) {
                            // Check if response is successful (200-299 range includes 202)
                            if (!response.ok) {
                                throw new Error('Network response was not ok: ' + response.status);
                            }
                            
                            // Power Automate 202 responses often have no body or non-JSON content
                            // Try to parse JSON, but handle gracefully if it fails
                            return response.text().then(function(text) {
                                if (text && text.trim()) {
                                    try {
                                        return JSON.parse(text);
                                    } catch (e) {
                                        // Not JSON or parse error, that's okay for 202 responses
                                        console.log('Response is not JSON, treating as success');
                                        return {};
                                    }
                                }
                                // Empty response is fine for 202 Accepted
                                return {};
                            }).catch(function() {
                                // If text() fails, still treat as success for 202
                                return {};
                            });
                        })
                        .then(function(data) {
                            console.log('Success:', data);
                            
                            // Hide all sections
                            sections.forEach(function(sectionId) {
                                const section = document.getElementById(sectionId);
                                if (section) {
                                    section.style.display = 'none';
                                }
                            });
                            
                            // Show completion message with results
                            const completeDiv = document.getElementById('survey_complete');
                            if (completeDiv) {
                                completeDiv.style.display = 'block';
                                // Display results
                                displayResults(scores, categories);
                                // Update name in thank you message
                                updateThankYouMessage();
                                completeDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        })
                        .catch(function(error) {
                            console.error('Error:', error);
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({
                                    title: '提交失敗',
                                    text: '提交失敗，請稍後再試。如問題持續，請聯絡研究團隊。',
                                    icon: 'error',
                                    confirmButtonText: '確定',
                                    confirmButtonColor: '#0d6efd'
                                });
                            } else {
                                alert('提交失敗，請稍後再試。如問題持續，請聯絡研究團隊。');
                            }
                            
                            // Re-enable submit button
                            btnSubmit.disabled = false;
                            btnSubmit.textContent = '提交';
                        });
                    }
                });
            }
        }
        
        // Fetch user profile from API
        // This function runs asynchronously in the background and won't block the UI
        // The name and email will be available when the form is submitted
        function fetchUserProfile() {
            fetch('https://refresh.bokss.org.hk/jwt/token')
                .then(function(res) {
                    return res.json();
                })
                .then(function(res) {
                    const token = res.token;
                    return fetch('https://refresh.bokss.org.hk/sys/member/api/v1/profile', {
                        method: 'GET',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        })
                    });
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(profile) {
                    if (profile.name) {
                        userName = profile.name;
                    }
                    if (profile.email) {
                        userEmail = profile.email;
                    }
                    console.log('User profile loaded:', { name: userName, email: userEmail });
                    // Update thank you message if it's already displayed
                    updateThankYouMessage();
                })
                .catch(function(error) {
                    console.error('Error fetching user profile:', error);
                    // Silently fail - user can still complete the survey without profile data
                });
        }
        
        function collectFormData() {
            const data = {};
        
            // Add user name and email from API
            if (userName) {
                data.name = userName;
            }
            if (userEmail) {
                data.email = userEmail;
            }
            
            // Part 1 data
            for (let i = 1; i <= 5; i++) {
                const field = document.getElementById('part1_q' + i);
                if (field) {
                    data['part1_q' + i] = field.value;
                }
            }
            
            // Part 2 data
            for (let i = 1; i <= 16; i++) {
                const field = document.getElementById('part2_q' + i);
                if (field) {
                    data['part2_q' + i] = field.value;
                }
            }
            
            // Part 3 data
            for (let i = 1; i <= 27; i++) {
                const field = document.getElementById('part3_q' + i);
                if (field) {
                    data['part3_q' + i] = field.value;
                }
            }
            
            // Part 4 data
            for (let i = 1; i <= 10; i++) {
                const field = document.getElementById('part4_q' + i);
                if (field) {
                    data['part4_q' + i] = field.value;
                }
            }
            
            // Personal data
            data.personal_gender = document.getElementById('personal_gender')?.value || '';
            data.personal_gender_other = document.getElementById('personal_gender_other')?.value || '';
            data.personal_birthyear = document.getElementById('personal_birthyear')?.value || '';
            data.personal_education = document.getElementById('personal_education')?.value || '';
            data.personal_education_other = document.getElementById('personal_education_other')?.value || '';
            data.personal_occupation = document.getElementById('personal_occupation')?.value || '';
            data.personal_occupation_other = document.getElementById('personal_occupation_other')?.value || '';
            data.personal_satisfaction = document.getElementById('personal_satisfaction')?.value || '';
            data.personal_friends = document.getElementById('personal_friends')?.value || '';
            data.personal_selfie = document.getElementById('personal_selfie')?.value || '';
            
            // Hidden metadata fields
            data.system_id = document.getElementById('system_id')?.value || '';
            data.member_id = document.getElementById('member_id')?.value || '';
            data.uid = document.getElementById('uid')?.value || '';
            data.member_level = document.getElementById('member_level')?.value || '';
            data.eap_company = document.getElementById('eap_company')?.value || '';
            data.complete_time_field = document.getElementById('complete_time')?.value || '';
            data.subscription = document.getElementById('subscription')?.value || '';
            
            return data;
        }
    }
})();

