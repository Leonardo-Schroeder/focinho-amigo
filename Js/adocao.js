/**
 * Script para controlar o grid de adoção com filtros e painel de detalhes.
 * Focinho Amigo - 2025
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DOS ANIMAIS (Fonte Única da Verdade)
    // Agora você só precisa mexer aqui para adicionar/remover animais!
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
    const detailsPlaceholder = document.getElementById('details-placeholder');
    const detailsContent = document.getElementById('details-content');
    const detailsImg = document.getElementById('details-img');
    const detailsName = document.getElementById('details-name');
    const detailsCaracteristicas = document.getElementById('details-caracteristicas');
    const detailsHistoria = document.getElementById('details-historia');
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // Objeto para guardar os filtros ativos
    let activeFilters = { species: 'all', gender: 'all' };

    // 3. FUNÇÕES PRINCIPAIS

    /** Renderiza o grid de animais com base nos filtros ativos. */
    function renderGrid() {
        grid.innerHTML = ''; // Limpa o grid antes de adicionar novos itens

        const filteredAnimals = animals.filter(animal => {
            const speciesMatch = activeFilters.species === 'all' || animal.species === activeFilters.species;
            const genderMatch = activeFilters.gender === 'all' || animal.gender === activeFilters.gender;
            return speciesMatch && genderMatch;
        });

        if (filteredAnimals.length === 0) {
            grid.innerHTML = '<p>Nenhum animal encontrado com esses filtros.</p>';
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

        detailsPlaceholder.classList.add('hidden');
        detailsContent.classList.remove('hidden');

        detailsImg.src = animal.img;
        detailsName.textContent = animal.name;
        
        const characteristicsHTML = `<ul>
            <li><strong>Idade:</strong> ${animal.age} anos</li>
            <li><strong>Porte:</strong> ${animal.size}</li>
            <li><strong>${animal.extra}</strong></li>
            <li><strong>Personalidade:</strong> ${animal.personality}</li>
        </ul>`;
        detailsCaracteristicas.innerHTML = characteristicsHTML;

        detailsHistoria.innerHTML = `<p>${animal.history}</p>`;
    }

    // 4. EVENT LISTENERS (QUEM "ESCUTA" AS AÇÕES DO USUÁRIO)

    // Listener para cliques nos cards de animais
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.animal-card');
        if (card) {
            const id = card.dataset.id;
            displayAnimalDetails(id);
        }
    });

    // Listener para os botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.dataset.filterGroup;
            const filter = button.dataset.filter;

            activeFilters[group] = filter;

            // Atualiza a classe 'active' nos botões do mesmo grupo
            document.querySelectorAll(`.filtro-btn[data-filter-group="${group}"]`).forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Re-renderiza o grid com o novo filtro
            renderGrid();
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
    // Renderiza o grid pela primeira vez quando a página carrega
    renderGrid();
});