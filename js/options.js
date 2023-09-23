document.addEventListener('DOMContentLoaded', () => {
  // Load current settings
  browser.storage.local.get(['nextChatShortcut', 'prevChatShortcut'])
  .then((result) => {
    if (result.nextChatShortcut) {
      document.getElementById('nextChatKey').value = result.nextChatShortcut.key;
      document.getElementById('nextCtrl').checked = result.nextChatShortcut.ctrl;
      document.getElementById('nextAlt').checked = result.nextChatShortcut.alt;
      document.getElementById('nextShift').checked = result.nextChatShortcut.shift;
    }
    if (result.prevChatShortcut) {
      document.getElementById('prevChatKey').value = result.prevChatShortcut.key;
      document.getElementById('prevCtrl').checked = result.prevChatShortcut.ctrl;
      document.getElementById('prevAlt').checked = result.prevChatShortcut.alt;
      document.getElementById('prevShift').checked = result.prevChatShortcut.shift;
    }
  });

  // Save settings
  document.getElementById('saveBtn').addEventListener('click', () => {
    const nextChatShortcut = {
      key: document.getElementById('nextChatKey').value,
      ctrl: document.getElementById('nextCtrl').checked,
      alt: document.getElementById('nextAlt').checked,
      shift: document.getElementById('nextShift').checked
    };

    const prevChatShortcut = {
      key: document.getElementById('prevChatKey').value,
      ctrl: document.getElementById('prevCtrl').checked,
      alt: document.getElementById('prevAlt').checked,
      shift: document.getElementById('prevShift').checked
    };

    browser.storage.local.set({nextChatShortcut, prevChatShortcut});
  });
});

