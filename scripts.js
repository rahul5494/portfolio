const hamburger = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
AOS.init({ duration: 600, easing: 'ease-in-out', once: false });

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

let currentIndex = 0;
const blogsPerLoad = 5;

function loadBlogs() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;
  const blogsToLoad = blogs.slice(currentIndex, currentIndex + blogsPerLoad);
  blogsToLoad.forEach(blog => {
    const blogPost = document.createElement('article');
    blogPost.classList.add('blog-post');
    blogPost.setAttribute('data-aos', 'fade-up');
    blogPost.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.excerpt}</p>
      <button class="read-more">Read More</button>
    `;
    blogGrid.appendChild(blogPost);
  });
  currentIndex += blogsPerLoad;
  if (currentIndex >= blogs.length) {
    document.getElementById('load-more').style.display = 'none';
  }
  AOS.refresh();
}

const loadMoreBtn = document.getElementById('load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', loadBlogs);
  loadBlogs();
}

const modal = document.getElementById('blog-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close');

if (modal) {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more')) {
      const blogTitle = e.target.previousElementSibling.previousElementSibling.textContent;
      const blog = blogs.find(b => b.title === blogTitle);
      modalTitle.textContent = blog.title;
      modalContent.innerHTML = blog.content 
      modal.style.display = 'block';
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
