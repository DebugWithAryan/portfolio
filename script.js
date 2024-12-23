
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
        navLinks.classList.remove('active');
    }
});


(function() {
    emailjs.init("PBc0Yq3KTKnlubGn-");
})();

function showMessage(text, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-xmark'}"></i>
        ${text}
    `;
    
    // Add to document
    document.body.appendChild(message);
    
    // Remove after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'aryanjaiswal123123@gmail.com'
    };

    try {
        await emailjs.send(
            'service_1c8tj9p',
            'template_6tea7uv',
            templateParams
        );
        
        showMessage('Message sent successfully!', 'success');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error:', error);
        showMessage('Failed to send message. Please try again.', 'error');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}
