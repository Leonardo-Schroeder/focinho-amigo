/**
 * Script para controlar o grid de adoção com filtros e painel de detalhes (Modal no Mobile).
 * Focinho Amigo - 2025
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DOS ANIMAIS (Fonte Única da Verdade)
    const animals = [
        { id: 1, name: 'Bolinha', species: 'dog', gender: 'male', age: 2, size: 'Médio', extra: 'Vacinado: Sim', personality: 'Alta energia, dócil e adora crianças.', history: 'Bolinha foi resgatado das ruas, mas nunca perdeu sua alegria de viver.', img: '../Img/Adocao/cao1.jpg' },
        { id: 2, name: 'Miau', species: 'cat', gender: 'female', age: 1, size: 'Pequeno', extra: 'Castrada: Sim', personality: 'Calma e carinhosa, adora um colo.', history: 'Miau nasceu em nosso abrigo e é uma gatinha muito tranquila que adora um bom sofá.', img: '../Img/Adocao/gato1.jpg' },
        { id: 3, name: 'Rex', species: 'dog', gender: 'male', age: 4, size: 'Grande', extra: 'Vacinado: Sim', personality: 'Moderada energia, um grandalhão de coração mole.', history: 'Rex foi encontrado amarrado a uma árvore, mas já se recuperou e confia novamente nas pessoas.', img: '../Img/Adocao/cao2.jpg' },
        { id: 4, name: 'Fumaça', species: 'cat', gender: 'male', age: 3, size: 'Médio', extra: 'Castrado: Sim', personality: 'Tímido no início, mas muito leal.', history: 'Fumaça precisa de um lar paciente. Quando confia, se torna o melhor companheiro do mundo.', img: '../Img/Adocao/gato2.jpg' },
        { id: 5, name: 'Max', species: 'dog', gender: 'male', age: 5, size: 'Pequeno', extra: 'Vacinado: Sim', personality: 'Baixa energia, perfeito para apartamento.', history: 'Max é um cachorrinho tranquilo que só quer um cantinho confortável para seus anos dourados.', img: '../Img/Adocao/cao3.jpg' },
        { id: 6, name: 'Mia', species: 'cat', gender: 'female', age: 2, size: 'Pequeno', extra: 'Castrada: Sim', personality: 'Brincalhona e muito curiosa.', history: 'Mia é a exploradora do nosso gatil. Adora seguir as pessoas e caçar bolinhas de papel.', img: '../Img/Adocao/gato3.jpg' },
        { id: 7, name: 'Luna', species: 'dog', gender: 'female', age: 1, size: 'Médio', extra: 'Vacinada: Sim', personality: 'Muito ativa e inteligente.', history: 'Luna foi deixada em nossa porta ainda filhote. Hoje é uma cachorrinha saudável e pronta para um lar.', img: '../Img/Adocao/cao4.jpg' },
        { id: 8, name: 'Simba', species: 'cat', gender: 'male', age: 2, size: 'Grande', extra: 'Castrado: Sim', personality: 'Majestoso e tranquilo, um verdadeiro rei.', history: 'Simba vivia em uma casa com muitos gatos e precisa de um espaço só para ele.', img: '../Img/Adocao/gato4.jpg' },
        { id: 9, name: 'Bella', species: 'dog', gender: 'female', age: 3, size: 'Pequeno', extra: 'Vacinada: Sim', personality: 'Dócil e um pouco medrosa no início.', history: 'Bella sofreu maus-tratos, mas com amor e carinho está se tornando uma ótima companheira.', img: '../Img/Adocao/cao5.jpg' }
    ];

    // 2. SELETORES DOS ELEMENTOS DA PÁGINA
    const grid = document.querySelector('.animal-grid');
    const detailsPanel = document.querySelector('.animal-details-panel');
    const detailsPlaceholder = document.getElementById('details-placeholder');
    const detailsContent = document.getElementById('details-content');
    const detailsImg = document.getElementById('details-img');
    const detailsName = document.getElementById('details-name');
    const detailsCaracteristicas = document.getElementById('details-caracteristicas');
    const detailsHistoria = document.getElementById('details-historia');
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const closeModalBtn = document.getElementById('close-modal-btn'); // Botão de fechar do modal

    // Objeto para guardar os filtros ativos
    let activeFilters = { species: 'all', gender: 'all' };

    // --- FUNÇÕES DE CONTROLE DO MODAL ---

    /**
     * Abre o painel de detalhes (ou modal no mobile)
     */
    function openDetailsPanel() {
        // Garante que o painel de detalhes seja visível
        detailsContent.classList.remove('hidden');
        detailsPlaceholder.classList.add('hidden');

        // Mostra o modal (overlay e centralização) APENAS SE FOR MOBILE
        if (window.innerWidth <= 900) {
            detailsPanel.classList.add('show-modal');
            closeModalBtn.classList.remove('hidden');
            // Impede a rolagem do corpo da página
            document.body.style.overflow = 'hidden'; 
        }
    }

    /**
     * Fecha o modal (apenas no mobile)
     */
    function closeDetailsModal() {
        if (window.innerWidth <= 900) {
            detailsPanel.classList.remove('show-modal');
            document.body.style.overflow = ''; // Restaura a rolagem
        }
    }


    // --- 3. FUNÇÕES PRINCIPAIS DE RENDERIZAÇÃO ---

    /** Renderiza o grid de animais com base nos filtros ativos. */
    function renderGrid() {
        grid.innerHTML = '';

        const filteredAnimals = animals.filter(animal => {
            const speciesMatch = activeFilters.species === 'all' || animal.species === activeFilters.species;
            const genderMatch = activeFilters.gender === 'all' || animal.gender === activeFilters.gender;
            return speciesMatch && genderMatch;
        });

        if (filteredAnimals.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #fff;">Nenhum animal encontrado com esses filtros.</p>';
            return;
        }

        filteredAnimals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            card.dataset.id = animal.id;
            card.innerHTML = `
                <img src="${animal.img}" alt="Foto de ${animal.name}">
                <p>${animal.name}</p>
            `;
            grid.appendChild(card);
        });
    }

    /** Exibe os detalhes de um animal específico no painel lateral. */
    function displayAnimalDetails(id) {
        const animal = animals.find(a => a.id == id);
        if (!animal) return;

        detailsImg.src = animal.img;
        detailsName.textContent = animal.name;

        const characteristicsHTML = `<ul>
            <li><strong>Idade:</strong> ${animal.age} anos</li>
            <li><strong>Porte:</strong> ${animal.size}</li>
            <li><strong>Status:</strong> ${animal.extra}</li>
            <li><strong>Personalidade:</strong> ${animal.personality}</li>
        </ul>`;
        detailsCaracteristicas.innerHTML = characteristicsHTML;
        detailsHistoria.innerHTML = `<p>${animal.history}</p>`;
    }

    // --- 4. EVENT LISTENERS ---

    // Listener para cliques nos cards de animais (chama detalhes e abre o modal)
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.animal-card');
        if (card) {
            const id = card.dataset.id;
            displayAnimalDetails(id);
            // <<< CHAMADA CRÍTICA PARA ABRIR O MODAL/PAINEL >>>
            openDetailsPanel(); 
        }
    });

    // Listener para o botão de fechar
    closeModalBtn.addEventListener('click', closeDetailsModal);

    // Listener para fechar clicando no fundo escuro do modal (mobile)
    detailsPanel.addEventListener('click', (e) => {
        // Verifica se o clique foi diretamente no fundo (no painel, não no conteúdo interno)
        if (window.innerWidth <= 900 && e.target === detailsPanel) {
            closeDetailsModal();
        }
    });

    // Listener para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.dataset.filterGroup;
            const filter = button.dataset.filter;

            activeFilters[group] = filter;

            document.querySelectorAll(`.filtro-btn[data-filter-group="${group}"]`).forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            renderGrid();
            // Volta para a visualização inicial após filtrar
            if (window.innerWidth <= 900) {
                detailsPanel.classList.remove('show-modal');
            }
        });
    });

    // Listener para as abas (Características/História)
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`details-${tab}`).classList.add('active');
        });
    });

    // 5. INICIALIZAÇÃO
    renderGrid();
});