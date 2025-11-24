const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const closeBtn = document.querySelector('.menu-close');

// abre o menu
toggle.addEventListener('click', () => {
  menu.classList.add('show');
});

// fecha o menu
closeBtn.addEventListener('click', () => {
  menu.classList.remove('show');
});

// fecha quando clicar em algum link
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});

// Função para destacar o link ativo
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu a');
  const currentPath = window.location.pathname; // Pega o caminho da URL atual (ex: /sobre.html)

  links.forEach(link => {
    // Pega o caminho do href de cada link
    const linkPath = new URL(link.href).pathname;

    // Compara o caminho da página atual com o caminho do link
    if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
      link.classList.add('active'); // Adiciona a classe 'active' ao link correspondente
    }
  });
});