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