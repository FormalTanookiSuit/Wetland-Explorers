const cards = document.querySelectorAll('.animal-card');
const dropZones = document.querySelectorAll('.drop-zone');

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    card.classList.add('dragging');
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('highlight');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('highlight');
  });

  zone.addEventListener('drop', e => {
    const dragged = document.querySelector('.dragging');
    if (dragged) {
      const validRoles = dragged.dataset.role.split(',').map(r => r.trim());
      const dropRole = zone.dataset.role;
    
      if (validRoles.includes(dropRole)) {
        zone.appendChild(dragged);
        dragged.style.cursor = "default";
        dragged.setAttribute("draggable", false);
      }
    }
    
    zone.classList.remove('highlight');
  });
});
