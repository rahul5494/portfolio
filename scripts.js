document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.service-card, .project-card, .about-content');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.5 });
  elements.forEach(el => observer.observe(el));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const generateQrBtn = document.getElementById('generate-qr');
  if (generateQrBtn) {
    if(isMobile){
      generateQrBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        if (!name || !email || !amount) {
          alert('Please fill all fields');
          return;
        }
        const randomCode = Math.random().toString(36).substring(2, 14);
        const tn = encodeURIComponent(name + email + randomCode);
        const upiLink = `upi://pay?pa=9772539583@ibl&pn=Rahul%20Kumar%20Prajapat&am=${amount}&cu=INR&tn=${tn}`;
        window.location.href = upiUrl;
      })
      
    }
    else{
      generateQrBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        if (!name || !email || !amount) {
          alert('Please fill all fields');
          return;
        }
        const randomCode = Math.random().toString(36).substring(2, 14);
        const tn = encodeURIComponent(name + email + randomCode);
        const upiLink = `upi://pay?pa=9772539583@ibl&pn=Rahul%20Kumar%20Prajapat&am=${amount}&cu=INR&tn=${tn}`;
        const qrCodeDiv = document.getElementById('qr-code');
        qrCodeDiv.style.display = 'block';
        QRCode.toDataURL(upiLink, { width: 256, height: 256 }, (err, url) => {
          if (err) console.error(err);
          document.getElementById('qr-img').src = url;
        });
      });
    }
  }
});