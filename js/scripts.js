/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Dynamic Password Visibility Toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        // Add class to preserve custom styling (like right padding)
        input.classList.add('password-field');
        
        // Find floating container
        const container = input.parentElement;
        if (container && container.classList.contains('form-floating')) {
            container.style.position = 'relative';

            // Create eye toggle button
            const toggleBtn = document.createElement('span');
            toggleBtn.className = 'password-toggle-btn';
            toggleBtn.style.position = 'absolute';
            toggleBtn.style.right = '16px';
            toggleBtn.style.top = '50%';
            toggleBtn.style.transform = 'translateY(-50%)';
            toggleBtn.style.cursor = 'pointer';
            toggleBtn.style.color = '#94a3b8';
            toggleBtn.style.zIndex = '10';
            toggleBtn.style.display = 'flex';
            toggleBtn.style.alignItems = 'center';
            
            // Use fontawesome eye icon
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
            container.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                if (input.type === 'password') {
                    input.type = 'text';
                    toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    input.type = 'password';
                    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        }
    });
});
