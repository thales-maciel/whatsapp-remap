// Initialize settings
let nextChatShortcut = { key: 'j', ctrl: true, alt: false, shift: false };
let prevChatShortcut = { key: 'k', ctrl: true, alt: false, shift: false };

// Function to load settings
const loadSettings = () => {
  browser.storage.local.get(['nextChatShortcut', 'prevChatShortcut']).then((result) => {
    if (result.nextChatShortcut) nextChatShortcut = result.nextChatShortcut;
    if (result.prevChatShortcut) prevChatShortcut = result.prevChatShortcut;
  });
};

// Listen for changes in settings
browser.storage.onChanged.addListener((changes) => {
  if (changes.nextChatShortcut) nextChatShortcut = changes.nextChatShortcut.newValue;
  if (changes.prevChatShortcut) prevChatShortcut = changes.prevChatShortcut.newValue;
});

// Load initial settings
loadSettings();

const nextChatEvent =
    new KeyboardEvent('keydown', {
        key: 'Tab',
        ctrlKey: true,
        altKey: true
    });

const prevChatEvent =
    new KeyboardEvent('keydown', {
        key: 'Tab',
        ctrlKey: true,
        altKey: true,
        shiftKey: true
    });


// Main key event handler
document.addEventListener('keydown', (event) => {
  // Check for 'next chat'
  if (event.key === nextChatShortcut.key &&
      event.ctrlKey === nextChatShortcut.ctrl &&
      event.altKey === nextChatShortcut.alt &&
      event.shiftKey === nextChatShortcut.shift) {
      document.dispatchEvent(nextChatEvent)
      event.preventDefault()
      event.stopImmediatePropagation()
  }
  // Check for 'previous chat'
  else if (event.key === prevChatShortcut.key &&
           event.ctrlKey === prevChatShortcut.ctrl &&
           event.altKey === prevChatShortcut.alt &&
           event.shiftKey === prevChatShortcut.shift) {
      document.dispatchEvent(prevChatEvent)
      event.preventDefault()
      event.stopImmediatePropagation()
  }
}, true);
