// Таймер обратного отсчета до 9 мая
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Устанавливаем дату следующего 9 мая
    let targetDate = new Date(currentYear, 4, 9); // Месяцы в JS начинаются с 0 (январь)
    
    // Если текущая дата уже после 9 мая этого года, берем следующий год
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 4, 9);
    }
    
    const diff = targetDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Обновляем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

// Слайдер новостей
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Автопереключение слайдов
let slideInterval = setInterval(nextSlide, 5000);

// Остановка автопереключения при наведении
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Кнопки управления слайдером
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Галерея изображений
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close-modal');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.querySelector('img').src;
        captionText.innerHTML = this.querySelector('.gallery-overlay p').innerHTML;
    });
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Фильтрация галереи
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Форма обратной связи
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить код для отправки формы
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Анимация при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-item, .battle-card, .fact-item, .link-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Устанавливаем начальные стили для анимации
document.querySelectorAll('.feature-item, .battle-card, .fact-item, .link-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);