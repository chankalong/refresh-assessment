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
        
        // Show first section
        showSection(0);
        
        // Set up navigation buttons
        setupNavigation();
        
        // Set up conditional fields
        setupConditionalFields();
        
        // Set up form submission
        setupFormSubmission();
        
        function showSection(index) {
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
                    
                    // Scroll to top of section
                    currentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            
            // Special validation for attention check questions
            const part2_q9 = document.getElementById('part2_q9');
            if (part2_q9 && part2_q9.value !== '0' && part2_q9.value !== '') {
                alert('第9題請選擇「從不」。');
                isValid = false;
            }
            
            const part3_q9 = document.getElementById('part3_q9');
            if (part3_q9 && part3_q9.value !== '4' && part3_q9.value !== '') {
                alert('第9題請選擇「常常」。');
                isValid = false;
            }
            
            return isValid;
        }
        
        function setupNavigation() {
            // Consent to Part 1
            const btnNextConsent = document.getElementById('btn_next_consent');
            if (btnNextConsent) {
                btnNextConsent.addEventListener('click', function() {
                    if (validateSection('section_consent')) {
                        showSection(1);
                    }
                });
            }
            
            // Part 1 to Part 2
            const btnNextPart1 = document.getElementById('btn_next_part1');
            if (btnNextPart1) {
                btnNextPart1.addEventListener('click', function() {
                    if (validateSection('section_part1')) {
                        showSection(2);
                    }
                });
            }
            
            // Part 2 navigation
            const btnPrevPart2 = document.getElementById('btn_prev_part2');
            if (btnPrevPart2) {
                btnPrevPart2.addEventListener('click', function() {
                    showSection(1);
                });
            }
            
            const btnNextPart2 = document.getElementById('btn_next_part2');
            if (btnNextPart2) {
                btnNextPart2.addEventListener('click', function() {
                    if (validateSection('section_part2')) {
                        showSection(3);
                    }
                });
            }
            
            // Part 3 navigation
            const btnPrevPart3 = document.getElementById('btn_prev_part3');
            if (btnPrevPart3) {
                btnPrevPart3.addEventListener('click', function() {
                    showSection(2);
                });
            }
            
            const btnNextPart3 = document.getElementById('btn_next_part3');
            if (btnNextPart3) {
                btnNextPart3.addEventListener('click', function() {
                    if (validateSection('section_part3')) {
                        showSection(4);
                    }
                });
            }
            
            // Part 4 navigation
            const btnPrevPart4 = document.getElementById('btn_prev_part4');
            if (btnPrevPart4) {
                btnPrevPart4.addEventListener('click', function() {
                    showSection(3);
                });
            }
            
            const btnNextPart4 = document.getElementById('btn_next_part4');
            if (btnNextPart4) {
                btnNextPart4.addEventListener('click', function() {
                    if (validateSection('section_part4')) {
                        showSection(5);
                    }
                });
            }
            
            // Personal info navigation
            const btnPrevPersonal = document.getElementById('btn_prev_personal');
            if (btnPrevPersonal) {
                btnPrevPersonal.addEventListener('click', function() {
                    showSection(4);
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
        }
        
        function setupFormSubmission() {
            const btnSubmit = document.getElementById('btn_submit');
            if (btnSubmit) {
                btnSubmit.addEventListener('click', function() {
                    if (validateSection('section_personal')) {
                        // Disable submit button to prevent double submission
                        btnSubmit.disabled = true;
                        btnSubmit.textContent = '提交中...';
                        
                        // Collect all form data
                        const formData = collectFormData();
                        
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
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
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
                            
                            // Show completion message
                            const completeDiv = document.getElementById('survey_complete');
                            if (completeDiv) {
                                completeDiv.style.display = 'block';
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
            data.personal_school = document.getElementById('personal_school')?.value || '';
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

