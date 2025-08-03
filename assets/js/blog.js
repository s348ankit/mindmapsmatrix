// Blog functionality for MindMatrix AIML Academy

let blogPosts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 6;

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('blog.html')) {
        initializeBlog();
    } else if (window.location.pathname.includes('blog-post.html')) {
        loadBlogPost();
    }
});

// Initialize blog page
async function initializeBlog() {
    try {
        await loadBlogPosts();
        setupEventListeners();
        renderFeaturedPost();
        renderBlogPosts();
    } catch (error) {
        console.error('Error initializing blog:', error);
        showBlogLoadError('Failed to load blog posts. Please try again later.');
    }
}

// Load blog posts from JSON file
async function loadBlogPosts() {
    try {
        const response = await fetch('assets/data/blog-posts.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        blogPosts = await response.json();
        filteredPosts = [...blogPosts];
        
        // Sort by date (newest first)
        filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
        console.error('Error loading blog posts:', error);
        throw error;
    }
}

// Setup event listeners for blog functionality
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounceSearch);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setActiveFilter(this);
            filterPosts(this.dataset.category);
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

// Debounced search function
const debounceSearch = debounce(function(event) {
    const searchTerm = event.target.value.toLowerCase();
    searchPosts(searchTerm);
}, 300);

// Search posts
function searchPosts(searchTerm) {
    if (!searchTerm) {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderBlogPosts();
}

// Set active filter button
function setActiveFilter(activeButton) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Filter posts by category
function filterPosts(category) {
    if (category === 'all') {
        filteredPosts = [...blogPosts];
    } else {
        filteredPosts = blogPosts.filter(post => post.category === category);
    }
    
    currentPage = 1;
    renderBlogPosts();
}

// Render featured post
function renderFeaturedPost() {
    const featuredPostContainer = document.getElementById('featured-post');
    if (!featuredPostContainer || filteredPosts.length === 0) return;
    
    const featuredPost = filteredPosts[0]; // Use the latest post as featured
    
    featuredPostContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div class="relative">
                    <img src="${featuredPost.image}" alt="${featuredPost.title}" 
                         class="w-full h-64 lg:h-full object-cover">
                    <div class="absolute top-4 left-4">
                        <span class="badge badge-primary">${featuredPost.category}</span>
                    </div>
                </div>
                <div class="p-8 lg:p-12 flex flex-col justify-center">
                    <div class="text-sm text-gray-500 mb-2">Featured Post</div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">
                        <a href="blog-post.html?id=${featuredPost.id}" class="hover:text-blue-600 transition-colors">
                            ${featuredPost.title}
                        </a>
                    </h2>
                    <p class="text-gray-600 mb-6">${featuredPost.excerpt}</p>
                    <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <span><i class="fas fa-user mr-1"></i>${featuredPost.author}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${formatDate(featuredPost.date)}</span>
                        <span><i class="fas fa-clock mr-1"></i>${featuredPost.readingTime}</span>
                    </div>
                    <a href="blog-post.html?id=${featuredPost.id}" class="btn-primary self-start">
                        Read Full Article
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Render blog posts
function renderBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const noResultsContainer = document.getElementById('no-results');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!blogPostsContainer) return;
    
    // Skip featured post for regular posts
    const postsToShow = filteredPosts.slice(1);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = postsToShow.slice(0, endIndex);
    
    if (currentPosts.length === 0) {
        blogPostsContainer.innerHTML = '';
        noResultsContainer?.classList.remove('hidden');
        loadMoreBtn?.classList.add('hidden');
        return;
    }
    
    noResultsContainer?.classList.add('hidden');
    
    blogPostsContainer.innerHTML = currentPosts.map(post => createPostCard(post)).join('');
    
    // Show/hide load more button
    if (loadMoreBtn) {
        if (currentPosts.length < postsToShow.length) {
            loadMoreBtn.classList.remove('hidden');
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    }
}

// Create post card HTML
function createPostCard(post) {
    return `
        <article class="blog-card">
            <div class="relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
                <div class="absolute top-4 left-4">
                    <span class="badge badge-primary">${post.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                    <a href="blog-post.html?id=${post.id}" class="hover:text-blue-600 transition-colors">
                        ${post.title}
                    </a>
                </h3>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <div class="flex items-center gap-3">
                        <span><i class="fas fa-user mr-1"></i>${post.author}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${formatDate(post.date)}</span>
                    </div>
                    <span><i class="fas fa-clock mr-1"></i>${post.readingTime}</span>
                </div>
            </div>
        </article>
    `;
}

// Load more posts
function loadMorePosts() {
    currentPage++;
    renderBlogPosts();
}

// Load individual blog post
async function loadBlogPost() {
    try {
        await loadBlogPosts();
        
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        if (!postId) {
            window.location.href = 'blog.html';
            return;
        }
        
        const post = blogPosts.find(p => p.id === postId);
        
        if (!post) {
            showErrorMessage('Blog post not found.');
            return;
        }
        
        renderBlogPost(post);
        loadRelatedPosts(post);
        
    } catch (error) {
        console.error('Error loading blog post:', error);
        showErrorMessage('Failed to load blog post. Please try again later.');
    }
}

// Render individual blog post
function renderBlogPost(post) {
    // Update page title and meta
    document.title = `${post.title} - MindMatrix AIML Academy`;
    document.getElementById('post-title').content = post.title;
    document.getElementById('post-description').content = post.excerpt;
    
    // Update post content
    document.getElementById('breadcrumb-title').textContent = post.title;
    document.getElementById('post-category').textContent = post.category;
    document.getElementById('post-reading-time').textContent = post.readingTime;
    document.getElementById('article-title').textContent = post.title;
    document.getElementById('post-author').textContent = post.author;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('featured-image').src = post.image;
    document.getElementById('featured-image').alt = post.title;
    
    // Render content
    const contentContainer = document.getElementById('post-content');
    if (contentContainer) {
        contentContainer.innerHTML = post.content;
    }
    
    // Setup sharing
    setupSocialSharing(post);
}

// Load related posts
function loadRelatedPosts(currentPost) {
    const relatedPostsContainer = document.getElementById('related-posts');
    if (!relatedPostsContainer) return;
    
    // Find related posts by category, excluding current post
    const relatedPosts = blogPosts
        .filter(post => post.category === currentPost.category && post.id !== currentPost.id)
        .slice(0, 3);
    
    if (relatedPosts.length === 0) {
        relatedPostsContainer.closest('section').style.display = 'none';
        return;
    }
    
    relatedPostsContainer.innerHTML = relatedPosts.map(post => createPostCard(post)).join('');
}

// Setup social sharing
function setupSocialSharing(post) {
    const currentUrl = window.location.href;
    const encodedTitle = encodeURIComponent(post.title);
    const encodedUrl = encodeURIComponent(currentUrl);
    
    window.shareOnTwitter = function() {
        const url = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.shareOnLinkedIn = function() {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.shareOnFacebook = function() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        window.open(url, '_blank', 'width=600,height=400');
    };
    
    window.copyLink = function() {
        navigator.clipboard.writeText(currentUrl).then(() => {
            showSuccessMessage('Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showSuccessMessage('Link copied to clipboard!');
        });
    };
}

// Newsletter form submission
function handleNewsletterSubmission(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    const successMessage = document.getElementById('newsletter-success');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
    submitButton.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        if (successMessage) {
            successMessage.classList.remove('hidden');
        }
        
        event.target.reset();
        
        // Auto-hide success message
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.add('hidden');
            }
        }, 5000);
        
        console.log('Newsletter subscription:', email);
    }, 1500);
}

// Utility functions
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            ${message}
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-700 hover:text-red-900">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            ${message}
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-green-700 hover:text-green-900">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 3000);
}

// Show blog loading error in content area
function showBlogLoadError(message) {
    const featuredPost = document.getElementById('featured-post');
    const blogPostsContainer = document.getElementById('blog-posts');
    
    if (featuredPost) {
        featuredPost.innerHTML = '';
    }
    
    if (blogPostsContainer) {
        blogPostsContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-6"></i>
                    <h3 class="text-2xl font-bold text-red-800 mb-4">Blog Posts Unavailable</h3>
                    <p class="text-red-700 mb-4 text-lg">${message}</p>
                    <p class="text-red-600 text-sm mb-6">This usually happens when running the site locally without a proper web server. The blog requires a web server to load content.</p>
                    <div class="bg-red-100 rounded-lg p-4 text-left text-sm text-red-700">
                        <p class="font-semibold mb-2">Solutions:</p>
                        <ul class="list-disc list-inside space-y-1">
                            <li>Deploy the site to see full blog functionality</li>
                            <li>Use a local web server (not file:// protocol)</li>
                            <li>Check your internet connection</li>
                            <li>Ensure the assets/data/blog-posts.json file exists</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
