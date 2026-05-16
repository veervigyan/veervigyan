// Veer Vigyan JavaScript Implementation
// This file contains all the interactive functionality for the educational platform

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const gradeBtns = document.querySelectorAll('.grade-btn');
const subjectBtns = document.querySelectorAll('.subject-btn');
const notesGrid = document.getElementById('notes-grid');
const testsContainer = document.getElementById('tests-container');
const booksGrid = document.getElementById('books-grid');
const mcqsContainer = document.getElementById('mcqs-container');

// Sample Data for Notes
const notesData = [
    {
        id: 1,
        title: "Physics: Laws of Motion",
        description: "Complete revision notes covering Newton's laws of motion, friction, and circular motion.",
        type: "revision",
        grade: 11,
        subject: "physics",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 2,
        title: "Chemistry: Periodic Table",
        description: "Short notes on periodic trends, groups, and periods of elements.",
        type: "short",
        grade: 10,
        subject: "chemistry",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 3,
        title: "Biology: Cell Structure",
        description: "Detailed explanation of cell organelles and their functions.",
        type: "explained",
        grade: 9,
        subject: "biology",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 4,
        title: "Physics: Thermodynamics",
        description: "Comprehensive notes on heat, temperature, and laws of thermodynamics.",
        type: "revision",
        grade: 11,
        subject: "physics",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 5,
        title: "Chemistry: Chemical Bonding",
        description: "Short notes explaining ionic, covalent, and metallic bonds.",
        type: "short",
        grade: 11,
        subject: "chemistry",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 6,
        title: "Biology: Genetics",
        description: "Explained notes on heredity, DNA, and genetic disorders.",
        type: "explained",
        grade: 12,
        subject: "biology",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 7,
        title: "Mathematics: Calculus Basics",
        description: "Revision notes covering limits, derivatives, and integrals.",
        type: "revision",
        grade: 12,
        subject: "mathematics",
        downloadLink: "#",
        viewLink: "#"
    },
    {
        id: 8,
        title: "Physics: Waves and Sound",
        description: "Short notes on wave properties, sound waves, and Doppler effect.",
        type: "short",
        grade: 10,
        subject: "physics",
        downloadLink: "#",
        viewLink: "#"
    }
];

// Sample Data for Test Series
const testData = [
    {
        id: 1,
        title: "Chapter 1: Motion Test",
        description: "Comprehensive test covering kinematics and dynamics.",
        grade: 9,
        subject: "physics",
        duration: "60 minutes",
        questions: 25,
        difficulty: "Medium"
    },
    {
        id: 2,
        title: "Chapter 2: Force and Laws of Motion",
        description: "Test on Newton's laws and applications.",
        grade: 9,
        subject: "physics",
        duration: "45 minutes",
        questions: 20,
        difficulty: "Easy"
    },
    {
        id: 3,
        title: "Chapter 3: Atoms and Molecules",
        description: "Test on atomic structure and molecular formation.",
        grade: 9,
        subject: "chemistry",
        duration: "50 minutes",
        questions: 22,
        difficulty: "Hard"
    },
    {
        id: 4,
        title: "Chapter 4: Tissues",
        description: "Test on plant and animal tissues.",
        grade: 9,
        subject: "biology",
        duration: "40 minutes",
        questions: 18,
        difficulty: "Medium"
    },
    {
        id: 5,
        title: "Chapter 1: Electric Charges and Fields",
        description: "Comprehensive test on electrostatics.",
        grade: 12,
        subject: "physics",
        duration: "75 minutes",
        questions: 30,
        difficulty: "Hard"
    },
    {
        id: 6,
        title: "Chapter 2: Solutions",
        description: "Test on colligative properties and Raoult's law.",
        grade: 12,
        subject: "chemistry",
        duration: "60 minutes",
        questions: 25,
        difficulty: "Medium"
    },
    {
        id: 7,
        title: "Chapter 3: Reproduction in Organisms",
        description: "Test on sexual and asexual reproduction.",
        grade: 12,
        subject: "biology",
        duration: "55 minutes",
        questions: 22,
        difficulty: "Easy"
    },
    {
        id: 8,
        title: "Chapter 4: Relations and Functions",
        description: "Test on mathematical relations and functions.",
        grade: 12,
        subject: "mathematics",
        duration: "70 minutes",
        questions: 28,
        difficulty: "Medium"
    }
];

// Sample Data for Books
const booksData = [
    {
        id: 1,
        title: "Physics Mastery",
        author: "Dr. Rajesh Sharma",
        description: "Comprehensive guide to physics concepts for classes 11-12",
        price: "â‚¹299",
        rating: 4.8,
        pages: 450,
        isbn: "978-81-945678-1-2",
        edition: "3rd Edition",
        publication: "Veer Vigyan Publications"
    },
    {
        id: 2,
        title: "Chemistry Simplified",
        author: "Prof. Priya Nair",
        description: "Step-by-step approach to mastering chemistry fundamentals",
        price: "â‚¹249",
        rating: 4.7,
        pages: 380,
        isbn: "978-81-945678-2-9",
        edition: "2nd Edition",
        publication: "Veer Vigyan Publications"
    },
    {
        id: 3,
        title: "Biology Explorer",
        author: "Dr. Anil Kumar",
        description: "Visual learning guide for biology concepts",
        price: "â‚¹349",
        rating: 4.9,
        pages: 520,
        isbn: "978-81-945678-3-6",
        edition: "4th Edition",
        publication: "Veer Vigyan Publications"
    },
    {
        id: 4,
        title: "Mathematics Made Easy",
        author: "Prof. Sunita Devi",
        description: "Problem-solving strategies for complex mathematics",
        price: "â‚¹279",
        rating: 4.6,
        pages: 420,
        isbn: "978-81-945678-4-3",
        edition: "5th Edition",
        publication: "Veer Vigyan Publications"
    },
    {
        id: 5,
        title: "Science Foundation",
        author: "Dr. Manoj Patel",
        description: "Complete guide for classes 9-10 science curriculum",
        price: "â‚¹199",
        rating: 4.5,
        pages: 320,
        isbn: "978-81-945678-5-0",
        edition: "1st Edition",
        publication: "Veer Vigyan Publications"
    },
    {
        id: 6,
        title: "Advanced Physics",
        author: "Prof. Kavita Reddy",
        description: "In-depth coverage of advanced physics topics",
        price: "â‚¹449",
        rating: 4.9,
        pages: 600,
        isbn: "978-81-945678-6-7",
        edition: "2nd Edition",
        publication: "Veer Vigyan Publications"
    }
];

// Sample Data for MCQs
const mcqsData = [
    {
        id: 1,
        question: "Which of the following is not a fundamental force?",
        options: [
            "Gravitational Force",
            "Electromagnetic Force",
            "Strong Nuclear Force",
            "Frictional Force"
        ],
        correct: 3,
        grade: 11,
        subject: "physics",
        difficulty: "Medium"
    },
    {
        id: 2,
        question: "The atomic number of an element represents:",
        options: [
            "Number of neutrons",
            "Number of protons",
            "Number of electrons",
            "Mass number"
        ],
        correct: 1,
        grade: 10,
        subject: "chemistry",
        difficulty: "Easy"
    },
    {
        id: 3,
        question: "Which part of the cell is known as the powerhouse?",
        options: [
            "Nucleus",
            "Mitochondria",
            "Ribosome",
            "Endoplasmic Reticulum"
        ],
        correct: 1,
        grade: 9,
        subject: "biology",
        difficulty: "Easy"
    },
    {
        id: 4,
        question: "What is the SI unit of electric current?",
        options: [
            "Volt",
            "Ohm",
            "Ampere",
            "Watt"
        ],
        correct: 2,
        grade: 12,
        subject: "physics",
        difficulty: "Easy"
    },
    {
        id: 5,
        question: "Which gas is produced when sodium reacts with water?",
        options: [
            "Oxygen",
            "Hydrogen",
            "Nitrogen",
            "Carbon Dioxide"
        ],
        correct: 1,
        grade: 10,
        subject: "chemistry",
        difficulty: "Medium"
    },
    {
        id: 6,
        question: "Which of the following is a prokaryotic cell?",
        options: [
            "Animal cell",
            "Plant cell",
            "Bacterial cell",
            "Fungal cell"
        ],
        correct: 2,
        grade: 11,
        subject: "biology",
        difficulty: "Medium"
    },
    {
        id: 7,
        question: "The process of photosynthesis occurs in which organelle?",
        options: [
            "Mitochondria",
            "Chloroplast",
            "Nucleus",
            "Vacuole"
        ],
        correct: 1,
        grade: 10,
        subject: "biology",
        difficulty: "Easy"
    },
    {
        id: 8,
        question: "Which law states that energy cannot be created or destroyed?",
        options: [
            "Newton's First Law",
            "Law of Conservation of Energy",
            "Boyle's Law",
            "Charles's Law"
        ],
        correct: 1,
        grade: 11,
        subject: "physics",
        difficulty: "Medium"
    }
];

// Current state variables
let selectedGrade = null;
let selectedSubject = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Initialize the application
function initApp() {
    // Load initial content
    loadNotes(notesData);
    loadBooks(booksData);
    
    // Add event listeners
    addEventListeners();
    
    // Set up intersection observer for animations
    setupIntersectionObserver();
}

// Add event listeners
function addEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Filter buttons for notes
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => handleNoteFilter(btn.dataset.filter));
    });
    
    // Grade buttons for test series
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', () => handleGradeSelection(btn.dataset.grade));
    });
    
    // Subject buttons for test series
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', () => handleSubjectSelection(btn.dataset.subject));
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Handle note filtering
function handleNoteFilter(filterType) {
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filterType) {
            btn.classList.add('active');
        }
    });
    
    // Filter and reload notes
    let filteredNotes = notesData;
    if (filterType !== 'all') {
        filteredNotes = notesData.filter(note => note.type === filterType);
    }
    
    loadNotes(filteredNotes);
}

// Load notes into the grid
function loadNotes(notes) {
    notesGrid.innerHTML = '';
    
    if (notes.length === 0) {
        notesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No Notes Found</h3>
                <p>Try changing your filters to see more results</p>
            </div>
        `;
        return;
    }
    
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card card-content fade-in-up';
        
        noteCard.innerHTML = `
            <div class="tag">${note.type.charAt(0).toUpperCase() + note.type.slice(1)} Notes</div>
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value">${note.grade}</div>
                    <div class="stat-label">Class</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${note.subject.charAt(0).toUpperCase() + note.subject.slice(1)}</div>
                    <div class="stat-label">Subject</div>
                </div>
            </div>
            <div class="note-actions">
                <button class="liquid-btn btn-primary" onclick="viewNote(${note.id})">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="liquid-btn btn-secondary" onclick="downloadNote(${note.id})">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;
        
        notesGrid.appendChild(noteCard);
    });
}

// Load books into the grid
function loadBooks(books) {
    booksGrid.innerHTML = '';
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card card-content fade-in-up';
        
        bookCard.innerHTML = `
            <div class="book-cover">
                <span>Book Cover</span>
            </div>
            <h3>${book.title}</h3>
            <div class="author">by ${book.author}</div>
            <p>${book.description}</p>
            <div class="rating">
                ${generateStars(book.rating)}
                <span>(${book.rating}/5)</span>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value">${book.pages}</div>
                    <div class="stat-label">Pages</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${book.edition}</div>
                    <div class="stat-label">Edition</div>
                </div>
            </div>
            <div class="book-actions">
                <button class="liquid-btn btn-primary" onclick="getBook(${book.id})">
                    Get Book - ${book.price}
                </button>
            </div>
        `;
        
        booksGrid.appendChild(bookCard);
    });
}

// Generate star rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 > 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Handle grade selection for test series
function handleGradeSelection(grade) {
    selectedGrade = parseInt(grade);
    
    // Show subject selector
    document.querySelectorAll('.subject-selector').forEach(el => {
        el.classList.remove('hidden');
    });
    
    // Hide tests container initially
    testsContainer.classList.add('hidden');
    
    // Scroll to subject selector
    scrollToSection('test-series');
}

// Handle subject selection for test series
function handleSubjectSelection(subject) {
    selectedSubject = subject;
    
    // Filter tests based on selected grade and subject
    const filteredTests = testData.filter(test => 
        test.grade === selectedGrade && test.subject === selectedSubject
    );
    
    // Load filtered tests
    loadTests(filteredTests);
    
    // Show tests container
    testsContainer.classList.remove('hidden');
    
    // Scroll to tests
    scrollToSection('tests-container');
}

// Load tests into the container
function loadTests(tests) {
    testsContainer.innerHTML = '';
    
    if (tests.length === 0) {
        testsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>No Tests Available</h3>
                <p>Currently no tests are available for this combination</p>
            </div>
        `;
        return;
    }
    
    tests.forEach(test => {
        const testCard = document.createElement('div');
        testCard.className = 'test-card card-content fade-in-up';
        
        testCard.innerHTML = `
            <div class="tag">${test.difficulty} Difficulty</div>
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <div class="test-meta">
                <span><i class="fas fa-clock"></i> ${test.duration}</span>
                <span><i class="fas fa-question-circle"></i> ${test.questions} Qs</span>
            </div>
            <div class="test-actions">
                <button class="liquid-btn btn-primary" onclick="startTest(${test.id})">
                    Start Test
                </button>
            </div>
        `;
        
        testsContainer.appendChild(testCard);
    });
}

// Handle grade selection for MCQs
function handleMcqGradeSelection(grade) {
    selectedGrade = parseInt(grade);
    
    // Show subject selector
    document.querySelectorAll('.subject-selector').forEach(el => {
        el.classList.remove('hidden');
    });
    
    // Hide MCQs container initially
    mcqsContainer.classList.add('hidden');
    
    // Scroll to subject selector
    scrollToSection('mcqs');
}

// Handle subject selection for MCQs
function handleMcqSubjectSelection(subject) {
    selectedSubject = subject;
    
    // Filter MCQs based on selected grade and subject
    const filteredMcqs = mcqsData.filter(mcq => 
        mcq.grade === selectedGrade && mcq.subject === selectedSubject
    );
    
    // Load filtered MCQs
    loadMcqs(filteredMcqs);
    
    // Show MCQs container
    mcqsContainer.classList.remove('hidden');
    
    // Scroll to MCQs
    scrollToSection('mcqs-container');
}

// Load MCQs into the container
function loadMcqs(mcqs) {
    mcqsContainer.innerHTML = '';
    
    if (mcqs.length === 0) {
        mcqsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-question-circle"></i>
                <h3>No MCQs Available</h3>
                <p>Currently no MCQs are available for this combination</p>
            </div>
        `;
        return;
    }
    
    mcqs.forEach((mcq, index) => {
        const mcqCard = document.createElement('div');
        mcqCard.className = 'mcq-card fade-in-up';
        
        mcqCard.innerHTML = `
            <div class="mcq-question">
                <strong>Question ${index + 1}:</strong> ${mcq.question}
            </div>
            <div class="mcq-options">
                ${mcq.options.map((option, idx) => `
                    <label class="option">
                        <input type="radio" name="mcq-${mcq.id}" value="${idx}">
                        <span>${String.fromCharCode(65 + idx)}. ${option}</span>
                    </label>
                `).join('')}
            </div>
            <div class="mcq-actions">
                <button class="liquid-btn btn-primary" onclick="submitAnswer(${mcq.id}, '${mcq.subject}')">
                    Submit Answer
                </button>
                <button class="liquid-btn btn-secondary" onclick="showCorrectAnswer(${mcq.id})">
                    Show Answer
                </button>
            </div>
        `;
        
        mcqsContainer.appendChild(mcqCard);
    });
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Handle window resize
function handleResize() {
    // Close mobile menu on larger screens
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Note-related functions
function viewNote(noteId) {
    showNotification(`Viewing note ${noteId}`, 'success');
    // In a real app, this would open the note in a modal or new page
}

function downloadNote(noteId) {
    showNotification(`Downloading note ${noteId}`, 'success');
    // In a real app, this would trigger the download
}

// Book-related functions
function getBook(bookId) {
    showNotification(`Getting book ${bookId}`, 'success');
    // In a real app, this would initiate the purchase process
}

// Test-related functions
function startTest(testId) {
    showNotification(`Starting test ${testId}`, 'success');
    // In a real app, this would start the test
}

// MCQ-related functions
function submitAnswer(mcqId, subject) {
    showNotification(`Submitted answer for ${subject} question ${mcqId}`, 'success');
    // In a real app, this would process the answer
}

function showCorrectAnswer(mcqId) {
    const mcq = mcqsData.find(q => q.id === mcqId);
    if (mcq) {
        showNotification(`Correct answer: ${mcq.options[mcq.correct]}`, 'success');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize the MCQ functionality
function initMcqFunctionality() {
    // Add event listeners for MCQ grade buttons
    document.querySelectorAll('#mcqs .grade-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMcqGradeSelection(btn.dataset.grade));
    });
    
    // Add event listeners for MCQ subject buttons
    document.querySelectorAll('#mcqs .subject-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMcqSubjectSelection(btn.dataset.subject));
    });
}

// Initialize MCQ functionality after DOM loads
document.addEventListener('DOMContentLoaded', initMcqFunctionality);

// Additional utility functions for enhanced interactivity

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Debounce function for search inputs
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Set cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Get cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Delete cookie
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Local storage helper functions
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

function getLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error getting from localStorage:', e);
        return null;
    }
}

// Session storage helper functions
function setSessionStorage(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error saving to sessionStorage:', e);
        return false;
    }
}

function getSessionStorage(key) {
    try {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error getting from sessionStorage:', e);
        return null;
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!', 'success');
    }, function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Failed to copy text', 'error');
    });
}

// Share content
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(url);
    }
}

// Check if user is online/offline
function checkOnlineStatus() {
    return navigator.onLine;
}

// Add offline event listener
window.addEventListener('online', function() {
    showNotification('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showNotification('You are offline. Some features may not work.', 'error');
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
    }
}

// Run performance measurement when page loads
window.addEventListener('load', measurePerformance);

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    document.querySelectorAll('button, [role="button"]').forEach(button => {
        if (!button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent || button.innerText);
        }
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Run accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Theme switcher functionality
function initThemeSwitcher() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Add theme toggle button if needed
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.addEventListener('click', toggleTheme);
    
    document.body.appendChild(themeToggle);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDarkMode = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    const themeToggle = document.querySelector('.theme-toggle i');
    if (isDarkMode) {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// Initialize theme switcher
initThemeSwitcher();

// Add loading spinner for async operations
function showLoadingSpinner(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading';
    spinner.innerHTML = '<div class="spinner"></div>';
    element.appendChild(spinner);
    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
    }
}

// Modal functionality
function showModal(content, title = '') {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            ${title ? `<h2>${title}</h2>` : ''}
            <div class="modal-body">${content}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking close button or outside
    modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    // Close with Escape key
    const handleEsc = (e) => {
        if (e.key === 'Escape') closeModal(modal);
    };
    document.addEventListener('keydown', handleEsc);
    
    // Cleanup
    modal.addEventListener('transitionend', () => {
        if (!modal.classList.contains('active')) {
            document.removeEventListener('keydown', handleEsc);
            document.body.removeChild(modal);
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Auto-save forms
function autoSaveForm(formId, key) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Load saved data if exists
    const savedData = getLocalStorage(key);
    if (savedData) {
        Object.keys(savedData).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.value = savedData[fieldName];
            }
        });
    }
    
    // Save on input change
    form.addEventListener('input', debounce(() => {
        const formData = {};
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            formData[field.name] = field.value;
        });
        setLocalStorage(key, formData);
    }, 1000));
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Service Worker registration (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // In a real implementation, this would send data to analytics service
    console.log('Analytics event:', { category, action, label });
}

// Error boundary simulation
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Add custom event for page load completion
document.addEventListener('DOMContentLoaded', () => {
    const event = new CustomEvent('pageLoaded', { detail: { timestamp: Date.now() } });
    document.dispatchEvent(event);
});

// Function to handle form submissions
function handleFormSubmission(formId, callback) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(form)) {
            // Simulate async operation
            const spinner = showLoadingSpinner(form);
            
            setTimeout(() => {
                hideLoadingSpinner(spinner);
                callback(new FormData(form));
            }, 1000);
        }
    });
}

// Initialize all form submissions
function initFormSubmissions() {
    // Example: Initialize contact form
    handleFormSubmission('contact-form', (formData) => {
        showNotification('Message sent successfully!', 'success');
        document.getElementById('contact-form').reset();
    });
}

// Initialize form submissions after DOM loads
document.addEventListener('DOMContentLoaded', initFormSubmissions);

// Export functions for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        formatCurrency,
        debounce,
        throttle,
        isElementInViewport,
        getUrlParameter,
        setCookie,
        getCookie,
        deleteCookie,
        setLocalStorage,
        getLocalStorage,
        setSessionStorage,
        getSessionStorage,
        copyToClipboard,
        shareContent,
        checkOnlineStatus,
        validateForm,
        autoSaveForm
    };
}
