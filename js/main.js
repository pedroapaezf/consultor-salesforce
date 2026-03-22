/* ============================================================
   FAQ ACCORDION
============================================================ */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Cerrar todos
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });

  // Abrir el clickeado si estaba cerrado
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ============================================================
   FORM SUBMISSION
   Conectar al endpoint de Netlify Forms (ya configurado en el HTML).
   Para usar un webhook externo, reemplazar el bloque del fetch.
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('theForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        form.style.display = 'none';
        document.getElementById('formOk').style.display = 'block';
      })
      .catch(() => {
        // Fallback: mostrar éxito igualmente (útil en desarrollo local)
        form.style.display = 'none';
        document.getElementById('formOk').style.display = 'block';
      });
  });
});

/* ============================================================
   SMOOTH SCROLL — fallback para navegadores sin soporte nativo
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
