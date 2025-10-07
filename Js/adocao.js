/**
 * Script para controlar o carrossel de adoção com filtros e exibição de informações.
 * Focinho Amigo - 2025
 */
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // --- CONFIGURAÇÃO INICIAL E SELETORES ---
    // =========================================================================
    
    // Seletores para o carrossel e filtros
    const allSlides = document.querySelectorAll('.animal-slide');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-indicators');
    const filterButtons = document.querySelectorAll('.filtro-btn');
    // Seletores para a seção de informações (NOVOS)
    const infoLinks = document.querySelectorAll('.info-link');
    const infoDisplayContainer = document.getElementById('info-display-container');

    // Variáveis de estado
    let currentSlideIndex = 0;
    let filteredSlides = [];

    // =========================================================================
    // --- LÓGICA DO FILTRO E CARROSSEL ---
    // =========================================================================

    function applyFilter(species) {
        const slidesArray = Array.from(allSlides);
        filteredSlides = (species === 'all') ? slidesArray : slidesArray.filter(slide => slide.dataset.species === species);
        currentSlideIndex = 0;
        updateCarouselUI();
    }

    function updateCarouselUI() {
        dotsContainer.innerHTML = '';
        if (filteredSlides.length === 0) {
            allSlides.forEach(slide => slide.classList.remove('active'));
            return;
        }
        filteredSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
        showSlide(0);
    }

    function showSlide(index) {
        allSlides.forEach(slide => slide.classList.remove('active'));
        if (filteredSlides[index]) {
            filteredSlides[index].classList.add('active');
        }
        const dots = dotsContainer.querySelectorAll('.dot');
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }
        currentSlideIndex = index;
        // Limpa as informações ao trocar de slide (AJUSTE IMPORTANTE)
        clearInfoDisplay();
    }

    // =========================================================================
    // --- LÓGICA DAS INFORMAÇÕES (CARACTERÍSTICAS/HISTÓRIA) (NOVO BLOCO) ---
    // =========================================================================

    /** Limpa a caixa de informações e desativa os links. */
    function clearInfoDisplay() {
        infoDisplayContainer.innerHTML = '';
        infoLinks.forEach(link => link.classList.remove('active'));
    }

    /**
     * Mostra uma informação específica (característica ou história).
     * @param {string} infoType - O tipo de informação ('caracteristicas' ou 'historia').
     */
    function showInfo(infoType) {
        const currentAnimalSlide = filteredSlides[currentSlideIndex];
        if (!currentAnimalSlide) return;

        const infoSourceDiv = currentAnimalSlide.querySelector(`.${infoType}`);
        
        if (infoSourceDiv) {
            const contentWrapper = document.createElement('div');
            contentWrapper.classList.add('info-content');
            contentWrapper.innerHTML = infoSourceDiv.innerHTML;
            infoDisplayContainer.innerHTML = '';
            infoDisplayContainer.appendChild(contentWrapper);
        }
    }

    // =========================================================================
    // --- MANIPULADORES DE EVENTOS ---
    // =========================================================================

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAlreadyActive = button.classList.contains('active');
            if (isAlreadyActive) {
                button.classList.remove('active');
                applyFilter('all');
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const species = button.dataset.filter;
                applyFilter(species);
            }
        });
    });
    
    // NOVO EVENTO PARA OS LINKS DE INFORMAÇÃO
    infoLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link

            const infoType = link.hash.substring(1); // Pega 'caracteristicas' ou 'historia' do href
            const isAlreadyActive = link.classList.contains('active');

            const currentActiveLink = document.querySelector('.info-link.active');

            // Limpa a seleção e a caixa de exibição
            clearInfoDisplay();

            // Se o link clicado não era o que já estava ativo, mostra a nova informação
            if (!isAlreadyActive) {
                link.classList.add('active');
                showInfo(infoType);
            }
        });
    });

    nextButton.addEventListener('click', () => {
        if (filteredSlides.length === 0) return;
        let nextIndex = (currentSlideIndex + 1) % filteredSlides.length;
        showSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        if (filteredSlides.length === 0) return;
        let prevIndex = (currentSlideIndex - 1 + filteredSlides.length) % filteredSlides.length;
        showSlide(prevIndex);
    });

    // =========================================================================
    // --- INICIALIZAÇÃO DO SCRIPT ---
    // =========================================================================
    
    applyFilter('all');
    filterButtons.forEach(btn => btn.classList.remove('active'));
});