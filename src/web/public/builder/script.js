document.addEventListener('DOMContentLoaded', () => {
  const draggableItems = document.querySelectorAll('.draggable');
  const dropArea = document.getElementById('drop-area');
  const settingsPanel = document.getElementById('settings-panel');

  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.dataset.type);
    });
  });

  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('text/plain');

    // Fetch block data using AJAX
    fetch(`/admin/block-data/${blockType}`)
      .then(response => {
        return response.json()
      })
      .then(blockData => {
        // Render block in the drop area
        const settingsArea = document.querySelector("#settings-panel")
        dropArea.innerHTML += `<div id="dropped-block" data-blockId="${blockData.id}">${blockData.render}</div>`;

        const template = document.createElement('template');
        template.innerHTML = `<div id="settings-block" data-blockId="${blockData.id}" data-blockType="${blockData.type}">${blockData.renderAdminUI}</div>`;
        // Render block settings in the right sidebar
        const newSettingsBlock = template.content.cloneNode(true);  // Deep clone to include any nested elements
        settingsArea.appendChild(newSettingsBlock);
      })
      .catch(error => console.error('Error fetching block data:', error));
  });
});
