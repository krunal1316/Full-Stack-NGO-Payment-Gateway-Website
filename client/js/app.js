document.addEventListener('DOMContentLoaded', function() {
    // Set active amount button
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('custom-amount');
    
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            customAmount.value = '';
        });
    });
    
    customAmount.addEventListener('input', function() {
        amountBtns.forEach(b => b.classList.remove('active'));
    });

    // Handle donation form submission
    const donationForm = document.getElementById('donation-form');
    
    if (donationForm) {
        donationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const cause = document.getElementById('cause').value;
            
            // Get amount (from button or custom input)
            let amount = customAmount.value;
            if (!amount) {
                const activeBtn = document.querySelector('.amount-btn.active');
                if (activeBtn) amount = activeBtn.dataset.amount;
            }
            
            if (!amount || isNaN(amount) || amount <= 0) {
                alert('Please enter a valid donation amount');
                return;
            }
            
            // Send to backend
            try {
                const response = await fetch('http://localhost:3000/api/donate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, amount, cause })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = data.url; // Redirect to Stripe
                } else {
                    alert('Payment failed: ' + data.error);
                }
            } catch (err) {
                alert('An error occurred. Please try again.');
                console.error(err);
            }
        });
    }
});