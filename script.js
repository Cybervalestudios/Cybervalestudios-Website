// Small helper to show/hide or manage local news posts
document.addEventListener('DOMContentLoaded', () => {
  const publishBtn = document.getElementById('publishBtn');
  const clearBtn = document.getElementById('clearBtn');
  const newsTitle = document.getElementById('newsTitle');
  const newsBody = document.getElementById('newsBody');
  const newsFeed = document.getElementById('newsFeed');

  // Load any saved posts from sessionStorage
  function loadPosts(){
    const posts = JSON.parse(sessionStorage.getItem('cv_posts') || '[]');
    posts.forEach(p => appendPost(p.title, p.body, p.time));
  }

  function savePost(title, body){
    const posts = JSON.parse(sessionStorage.getItem('cv_posts') || '[]');
    posts.unshift({title, body, time: new Date().toLocaleString()});
    sessionStorage.setItem('cv_posts', JSON.stringify(posts));
  }

  function appendPost(title, body, time){
    const el = document.createElement('article');
    el.className = 'news-post';
    el.innerHTML = `<h4>${escapeHtml(title)}</h4><time>${time || '— just now'}</time><p>${escapeHtml(body)}</p>`;
    newsFeed.prepend(el);
  }

  publishBtn && publishBtn.addEventListener('click', () => {
    const t = newsTitle.value.trim();
    const b = newsBody.value.trim();
    if(!t || !b) return alert('Please add a title and body');
    const now = new Date().toLocaleString();
    appendPost(t, b, now);
    savePost(t,b);
    newsTitle.value = ''; newsBody.value = '';
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    newsTitle.value = ''; newsBody.value = '';
  });

  // small helper to avoid XSS (client-only)
  function escapeHtml(text){ return (text+'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  loadPosts();
});