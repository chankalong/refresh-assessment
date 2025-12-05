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
        
        // Show first section
        showSection(0);
        
        // Set up navigation buttons
        setupNavigation();
        
        // Set up conditional fields
        setupConditionalFields();
        
        // Set up form submission
        setupFormSubmission();
        
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
                    alert('請先同意參加是次問卷調查。');
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
                            alert('請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）');
                        }
                    } else {
                        birthyear.style.borderColor = '';
                    }
                }
            }
            
            return isValid;
        }
        
        function setupNavigation() {
            // Consent to Part 1
            const btnNextConsent = document.getElementById('btn_next_consent');
            if (btnNextConsent) {
                btnNextConsent.addEventListener('click', function() {
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
                        alert('請輸入有效的4位數字年份（1900-' + new Date().getFullYear() + '）');
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
        
        // Calculate scores for each section
        function calculateScores() {
            const scores = {
                part1: 0,  // Emotional Health (5 questions, 0-5 scale, max 25)
                part2: 0,  // Appearance (16 questions, 0-4 scale, max 64)
                part3: 0,  // Self-compassion (27 questions, 1-5 scale, max 135)
                part4: 0   // Photo Editing (10 questions, 0-4 scale, max 40)
            };
            
            // Part 1: Emotional Health (5 questions, 0-5)
            for (let i = 1; i <= 5; i++) {
                const field = document.getElementById('part1_q' + i);
                if (field && field.value) {
                    scores.part1 += parseInt(field.value) || 0;
                }
            }
            
            // Part 2: Appearance (16 questions, 0-4, but skip Q9 which is attention check)
            for (let i = 1; i <= 16; i++) {
                if (i === 9) continue; // Skip attention check question
                const field = document.getElementById('part2_q' + i);
                if (field && field.value) {
                    scores.part2 += parseInt(field.value) || 0;
                }
            }
            
            // Part 3: Self-compassion (27 questions, 1-5, but skip Q9 which is attention check)
            // Note: Some items are reverse scored, but for simplicity, we'll calculate raw score
            // You may need to adjust this based on your scoring methodology
            for (let i = 1; i <= 27; i++) {
                if (i === 9) continue; // Skip attention check question
                const field = document.getElementById('part3_q' + i);
                if (field && field.value) {
                    scores.part3 += parseInt(field.value) || 0;
                }
            }
            
            // Part 4: Photo Editing (10 questions, 0-4)
            for (let i = 1; i <= 10; i++) {
                const field = document.getElementById('part4_q' + i);
                if (field && field.value) {
                    scores.part4 += parseInt(field.value) || 0;
                }
            }
            
            return scores;
        }
        
        // Categorize scores into groups
        function categorizeScores(scores) {
            const categories = {
                part1: '',
                part2: '',
                part3: '',
                part4: ''
            };
            
            // Part 1: Emotional Health (max 25)
            // Categories: Low (0-8), Medium (9-17), High (18-25)
            if (scores.part1 <= 8) {
                categories.part1 = '低';
            } else if (scores.part1 <= 17) {
                categories.part1 = '中等';
            } else {
                categories.part1 = '高';
            }
            
            // Part 2: Appearance (max 60, since we skip Q9, so 15 questions * 4 = 60)
            // Categories: Low (0-20), Medium (21-40), High (41-60)
            if (scores.part2 <= 20) {
                categories.part2 = '低';
            } else if (scores.part2 <= 40) {
                categories.part2 = '中等';
            } else {
                categories.part2 = '高';
            }
            
            // Part 3: Self-compassion (max 130, since we skip Q9, so 26 questions * 5 = 130)
            // Categories: Low (26-52), Medium (53-91), High (92-130)
            if (scores.part3 <= 52) {
                categories.part3 = '低';
            } else if (scores.part3 <= 91) {
                categories.part3 = '中等';
            } else {
                categories.part3 = '高';
            }
            
            // Part 4: Photo Editing (max 40)
            // Categories: Low (0-13), Medium (14-27), High (28-40)
            if (scores.part4 <= 13) {
                categories.part4 = '低';
            } else if (scores.part4 <= 27) {
                categories.part4 = '中等';
            } else {
                categories.part4 = '高';
            }
            
            return categories;
        }
        
        // Display results on thank you page
        function displayResults(scores, categories) {
            const resultsDiv = document.getElementById('survey_results');
            if (!resultsDiv) return;
            
            resultsDiv.innerHTML = '<h3>你的問卷結果</h3>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第一部份：情緒健康</h4>' +
                '<p>總分：' + scores.part1 + ' / 25</p>' +
                '<p>等級：' + categories.part1 + '</p>' +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第二部份：儀容外貌</h4>' +
                '<p>總分：' + scores.part2 + ' / 60</p>' +
                '<p>等級：' + categories.part2 + '</p>' +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第三部份：自我關懷</h4>' +
                '<p>總分：' + scores.part3 + ' / 130</p>' +
                '<p>等級：' + categories.part3 + '</p>' +
                '</div>' +
                '<div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">' +
                '<h4>第四部份：照片修飾行為</h4>' +
                '<p>總分：' + scores.part4 + ' / 40</p>' +
                '<p>等級：' + categories.part4 + '</p>' +
                '</div>';
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
                                completeDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        })
                        .catch(function(error) {
                            console.error('Error:', error);
                            alert('提交失敗，請稍後再試。如問題持續，請聯絡研究團隊。');
                            
                            // Re-enable submit button
                            btnSubmit.disabled = false;
                            btnSubmit.textContent = '提交';
                        });
                    }
                });
            }
        }
        
        function collectFormData() {
            const data = {};
            
            // Consent data
            data.consent_name = document.getElementById('consent_name')?.value || '';
            data.consent_date = document.getElementById('consent_date')?.value || '';
            data.consent_agreed = document.getElementById('consent_checkbox')?.checked || false;
            
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

