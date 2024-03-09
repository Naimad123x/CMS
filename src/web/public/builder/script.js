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
        dropArea.innerHTML += `<div id="dropped-block" data-blockId="${blockData.id}">${blockData.render}</div>`;

        // Render block settings in the right sidebar
        settingsPanel.innerHTML += blockData.renderAdminUI;
      })
      .catch(error => console.error('Error fetching block data:', error));
  });
});
