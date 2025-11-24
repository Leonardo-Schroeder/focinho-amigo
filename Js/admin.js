/**
 * Lógica para Painel Administrativo:
 * - Troca de Abas (Tabs)
 * - Abertura e Fechamento de Modais
 * - Carregamento de Dados Placeholder nas Tabelas
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS DE PLACEHOLDER ---
    const placeholderData = {
        animais: [
            { id: 1, nome: 'Bolinha', especie: 'Cachorro', idade: 3, porte: 'Médio', status: 'Aguardando Adoção', resgate: '2024-05-10' },
            { id: 2, nome: 'Fumaça', especie: 'Gato', idade: 1, porte: 'Pequeno', status: 'Em Tratamento', resgate: '2024-06-01' },
            { id: 3, nome: 'Rex', especie: 'Cachorro', idade: 5, porte: 'Grande', status: 'Adotado', resgate: '2023-01-20' },
            { id: 4, nome: 'Mia', especie: 'Gato', idade: 2, porte: 'Pequeno', status: 'Aguardando Adoção', resgate: '2024-04-15' }
        ],
        usuarios: [
            { id: 101, nome: 'Ana Silva', email: 'ana.silva@focinho.org', perfil: 'Administrador', telefone: '(19) 98765-4321', cadastro: '2019-11-20' },
            { id: 102, nome: 'João Mello', email: 'joao.mello@focinho.org', perfil: 'Voluntário', telefone: '(19) 99123-4567', cadastro: '2022-03-15' },
            { id: 103, nome: 'Carla Souza', email: 'carla.souza@email.com', perfil: 'Padrinho', telefone: '(19) 98000-1234', cadastro: '2023-08-10' },
            { id: 104, nome: 'Pedro Henrique', email: 'pedro.h@voluntario.com', perfil: 'Voluntário', telefone: '(19) 99876-5432', cadastro: '2024-01-05' }
        ]
        ,
        noticias: [
            { id: 201, titulo: 'Recorde de Adoções', autor: 'Ana Silva', publicacao: '2024-07-05' },
            { id: 202, titulo: 'Campanha de Castração', autor: 'João Mello', publicacao: '2024-06-28' },
            { id: 203, titulo: 'Resgate de Emergência', autor: 'Comunicação Focinho', publicacao: '2024-07-10' }
        ]
    };

    // --- 2. SELETORES GLOBAIS ---
    const sidebarBtns = document.querySelectorAll('.admin-sidebar .tab-btn');
    const tabContents = document.querySelectorAll('.admin-content .tab-content');
    const modalOpenBtns = document.querySelectorAll('.btn-novo');
    const modalCloses = document.querySelectorAll('.modal .close');

    // --- 3. FUNÇÕES DE RENDERIZAÇÃO DE TABELAS ---

    /** Renderiza dados na tabela de Animais. */
    function renderAnimais(data) {
        const tbody = document.getElementById('tabela-animais');
        tbody.innerHTML = data.map(animal => `
            <tr>
                <td>${animal.nome}</td>
                <td>${animal.especie}</td>
                <td>${animal.idade}</td>
                <td>${animal.porte}</td>
                <td><span class="status-${animal.status.toLowerCase().replace(/\s/g, '-')}">${animal.status}</span></td>
                <td>${animal.resgate}</td>
                <td>
                    <button class="btn-acao editar" data-id="${animal.id}"><i class="fa-solid fa-edit"></i></button>
                    <button class="btn-acao excluir" data-id="${animal.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    /** Renderiza dados na tabela de Usuários. */
    function renderUsuarios(data) {
        const tbody = document.getElementById('tabela-usuarios');
        tbody.innerHTML = data.map(user => `
            <tr>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.perfil}</td>
                <td>${user.telefone}</td>
                <td>${user.cadastro}</td>
                <td>
                    <button class="btn-acao editar" data-id="${user.id}"><i class="fa-solid fa-edit"></i></button>
                    <button class="btn-acao excluir" data-id="${user.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    /** Renderiza dados na tabela de Notícias. */
    function renderNoticias(data) {
        const tbody = document.getElementById('tabela-noticias');
        tbody.innerHTML = data.map(news => `
            <tr>
                <td>${news.titulo}</td>
                <td>${news.autor}</td>
                <td>${news.publicacao}</td>
                <td>
                    <button class="btn-acao editar" data-id="${news.id}"><i class="fa-solid fa-edit"></i></button>
                    <button class="btn-acao excluir" data-id="${news.id}"><i class="fa-solid fa-trash"></i></button>
                </button>
                </td>
            </tr>
        `).join('');
    }


    // --- 4. FUNÇÃO DE TROCA DE ABAS ---

    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Remove 'active' de todos os botões e conteúdos
            sidebarBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Adiciona 'active' ao botão e conteúdo selecionado
            btn.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // --- 5. LÓGICA DE MODAIS ---

    // Abertura
    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            // CORREÇÃO: Adiciona a classe 'active' para ativar o display: flex no CSS
            document.getElementById(modalId).classList.add('active');
        });
    });

    // Fechamento (Botão X)
    modalCloses.forEach(span => {
        span.addEventListener('click', function() {
            // CORREÇÃO: Remove a classe 'active'
            this.closest('.modal').classList.remove('active');
        });
    });

    // Fechamento (Clique fora do modal)
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            // CORREÇÃO: Remove a classe 'active'
            event.target.classList.remove('active');
        }
    });


    // --- 6. INICIALIZAÇÃO ---
    renderAnimais(placeholderData.animais);
    renderUsuarios(placeholderData.usuarios);
    renderNoticias(placeholderData.noticias);

    // Estilos para Status de Animal (adicionar dinamicamente)
    const style = document.createElement('style');
    style.innerHTML = `
        .status-aguardando-adocao { background-color: #f7e6a5; color: #a06e10; padding: 4px 8px; border-radius: 4px; font-weight: 500; }
        .status-em-tratamento { background-color: #a5c6f7; color: #1e3a8a; padding: 4px 8px; border-radius: 4px; font-weight: 500; }
        .status-adotado { background-color: #a5f7c6; color: #0a7538; padding: 4px 8px; border-radius: 4px; font-weight: 500; }
    `;
    document.head.appendChild(style);
});