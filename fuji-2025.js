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
                    if (!year || !/^\d{4}$/.test(year) || parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
                        birthyear.style.borderColor = 'red';
                        isValid = false;
                        if (year) {
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({
                                    title: '輸入錯誤',
                                    text: '請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）',
                                    icon: 'error',
                                    confirmButtonText: '確定',
                                    confirmButtonColor: '#0d6efd'
                                });
                            } else {
                                alert('請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）');
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
                    if (year && (!/^\d{4}$/.test(year) || parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear())) {
                        this.style.borderColor = 'red';
                        if (typeof Swal !== 'undefined') {
                            Swal.fire({
                                title: '輸入錯誤',
                                text: '請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）',
                                icon: 'error',
                                confirmButtonText: '確定',
                                confirmButtonColor: '#0d6efd'
                            });
                        } else {
                            alert('請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）');
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
                
                // Part 4: SPMS (sum, range 10-50, but actual is 0-40 with 0-4 scale)
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
            // Appearance = Mean of 1, 4, 5R, 6R, 7R, 10R, 12, 13R, 15R, 16
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
            scores.part2_appearance = appearanceCount > 0 ? appearanceSum / appearanceCount : 0;
            
            // Attribution = Mean of 2, 3, 8, 11, 14
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
            scores.part2_attribution = attributionCount > 0 ? attributionSum / attributionCount : 0;
            
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
            
            // Part 4: SPMS - Sum of all items (range 0-40 with 0-4 scale, or 10-50 if scale is different)
            for (let i = 1; i <= 10; i++) {
                const value = getFieldValue('part4_q' + i);
                if (value !== null) {
                    scores.part4 += value;
                }
            }
            
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
            
            // Part 1: WHO-5
            // Cut-off: < 13 = poor wellbeing; >= 13 = good wellbeing
            if (scores.part1 < 13) {
                categories.part1 = '較差';
            } else {
                categories.part1 = '良好';
            }
            
            // Part 2: BESAA - Appearance subscale (range 0-4)
            // Using general interpretation: low (< 2), moderate (2-3), high (> 3)
            if (scores.part2_appearance < 2) {
                categories.part2_appearance = '低';
            } else if (scores.part2_appearance <= 3) {
                categories.part2_appearance = '中等';
            } else {
                categories.part2_appearance = '高';
            }
            
            // Part 2: BESAA - Attribution subscale (range 0-4)
            if (scores.part2_attribution < 2) {
                categories.part2_attribution = '低';
            } else if (scores.part2_attribution <= 3) {
                categories.part2_attribution = '中等';
            } else {
                categories.part2_attribution = '高';
            }
            
            // Part 3: SCS Level 2 - Self-Compassion (range 1-5)
            // Categories: 1.0-2.49 = low, 2.5-3.5 = moderate, 3.51-5.0 = high
            if (scores.part3_selfCompassion < 2.5) {
                categories.part3_selfCompassion = '低';
            } else if (scores.part3_selfCompassion <= 3.5) {
                categories.part3_selfCompassion = '中等';
            } else {
                categories.part3_selfCompassion = '高';
            }
            
            // Part 3: SCS Level 2 - Self-Criticism (range 1-5)
            // Note: Lower is better for self-criticism, so we reverse the interpretation
            if (scores.part3_selfCriticism > 3.5) {
                categories.part3_selfCriticism = '高';
            } else if (scores.part3_selfCriticism >= 2.5) {
                categories.part3_selfCriticism = '中等';
            } else {
                categories.part3_selfCriticism = '低';
            }
            
            // Part 4: SPMS (range 0-40 with 0-4 scale)
            // Using tertiles: low (< 13.33), moderate (13.33-26.67), high (> 26.67)
            if (scores.part4 < 13.33) {
                categories.part4 = '低';
            } else if (scores.part4 <= 26.67) {
                categories.part4 = '中等';
            } else {
                categories.part4 = '高';
            }
            
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
                if (category === '高' || category === '良好') {
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
            
            var data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: value,
                    title: { text: title },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                        axis: { range: [0, maxValue] },
                        bar: { color: color, thickness: 1 },
                        steps: [
                            { range: [0, maxValue * 0.33], color: "#f44336" },
                            { range: [maxValue * 0.33, maxValue * 0.67], color: "#ff9800" },
                            { range: [maxValue * 0.67, maxValue], color: "#4caf50" }
                        ]
                    }
                }
            ];
            
            var layout = {
                margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 },
                height: 200,
                autosize: true,
                font: {
                    family: 'Arial, sans-serif'
                }
            };
            
            var config = {
                responsive: true,
                displaylogo: false,
                displayModeBar: false
            };
            
            Plotly.newPlot(containerId, data, layout, config);
        }
        
        // Display results on thank you page
        function displayResults(scores, categories) {
            const resultsDiv = document.getElementById('survey_results');
            if (!resultsDiv) return;
            
            // Format numbers to 2 decimal places
            function formatScore(score) {
                return typeof score === 'number' ? score.toFixed(2) : score;
            }
            
            // Build results HTML with new scoring structure and gauge chart containers
            const resultsHTML = '<h3>你的問卷結果</h3>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第一部份：情緒健康 (WHO-5)</h4>' +
                '<div id="gauge_part1" style="margin: 20px 0;"></div>' +
                '<p>總分：' + scores.part1 + ' / 25</p>' +
                '<p>等級：' + categories.part1 + '</p>' +
                (scores.part1 < 13 ? '<p style="color: #d32f2f; font-weight: bold;">注意：分數低於13分，建議進一步評估</p>' : '') +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第二部份：儀容外貌 (BESAA)</h4>' +
                '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">' +
                '<div><h5>外貌評價</h5><div id="gauge_part2_appearance"></div><p>分數：' + formatScore(scores.part2_appearance) + ' / 4.00</p><p>等級：' + categories.part2_appearance + '</p></div>' +
                '<div><h5>外貌歸因</h5><div id="gauge_part2_attribution"></div><p>分數：' + formatScore(scores.part2_attribution) + ' / 4.00</p><p>等級：' + categories.part2_attribution + '</p></div>' +
                '</div>' +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第三部份：自我關懷 (SCS)</h4>' +
                '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">' +
                '<div><h5>自我關懷</h5><div id="gauge_part3_selfCompassion"></div><p>分數：' + formatScore(scores.part3_selfCompassion) + ' / 5.00</p><p>等級：' + categories.part3_selfCompassion + '</p></div>' +
                '<div><h5>自我批評</h5><div id="gauge_part3_selfCriticism"></div><p>分數：' + formatScore(scores.part3_selfCriticism) + ' / 5.00</p><p>等級：' + categories.part3_selfCriticism + '</p></div>' +
                '</div>' +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第四部份：照片修飾行為 (SPMS)</h4>' +
                '<div id="gauge_part4" style="margin: 20px 0;"></div>' +
                '<p>總分：' + scores.part4 + ' / 40</p>' +
                '<p>等級：' + categories.part4 + '</p>' +
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
            if (!resultsInserted) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = resultsHTML;
                
                // Append results to the results div
                while (tempDiv.firstChild) {
                    resultsDiv.appendChild(tempDiv.firstChild);
                }
            }
            
            // Create gauge charts after a short delay to ensure DOM is ready
            setTimeout(function() {
                // Part 1: WHO-5 (0-25)
                createGaugeChart('gauge_part1', scores.part1, 25, '分數', getColorForCategory(categories.part1));
                
                // Part 2: BESAA Appearance (0-4)
                createGaugeChart('gauge_part2_appearance', scores.part2_appearance, 4, '分數', getColorForCategory(categories.part2_appearance));
                
                // Part 2: BESAA Attribution (0-4)
                createGaugeChart('gauge_part2_attribution', scores.part2_attribution, 4, '分數', getColorForCategory(categories.part2_attribution));
                
                // Part 3: SCS Self-Compassion (1-5)
                createGaugeChart('gauge_part3_selfCompassion', scores.part3_selfCompassion, 5, '分數', getColorForCategory(categories.part3_selfCompassion));
                
                // Part 3: SCS Self-Criticism (1-5) - Lower is better (reversed)
                createGaugeChart('gauge_part3_selfCriticism', scores.part3_selfCriticism, 5, '分數', getColorForCategory(categories.part3_selfCriticism, true));
                
                // Part 4: SPMS (0-40)
                createGaugeChart('gauge_part4', scores.part4, 40, '分數', getColorForCategory(categories.part4));
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
                        
                        // Collect all form data
                        const formData = collectFormData();
                        
                        // Add scores and categories to form data
                        formData.scores = scores;
                        formData.categories = categories;
                        
                        // Add timestamp
                        formData.complete_time = new Date().toISOString();
                        
                        // Submit to backend
                        const endpoint = 'https://defaulte276d80940774e26bccb996f646d92.50.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/eef19df43b134c84a02021836f390d11/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=um7WkTzIEKTLzJ0fJ-i8Mt3A7OJanC3ETZES0rKjwko';
                        
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
            
            return data;
        }
    }
})();

