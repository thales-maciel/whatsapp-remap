// Initialize definitions
let hashedDefinitions = {
    'backspace:true:true:true': 'delete',
    'u:true:true:true': 'markUnread',
    'm:true:true:true': 'mute',
    'e:true:true:true': 'archive',
    'p:true:true:true': 'pin',
    '/:true:true:false': 'search',
    'f:true:true:true': 'searchInChat',
    'n:true:true:false': 'newChat',
    'n:true:true:true': 'newGroup',
    'tab:true:true:false': 'nextChat',
    'tab:true:true:true': 'prevChat',
    'escape:true:true:true': 'closeChat',
    'p:true:true:false': 'profile',
    '.:false:false:true': 'speedUp',
    ',:false:false:true': 'speedDown',
    ',:true:true:false': 'settings',
    'e:true:true:false': 'emojiPanel',
    'g:true:true:false': 'gifPanel',
    's:true:true:false': 'stickerPanel',
    'k:false:true:false': 'extendedSearch',
    'l:true:true:false': 'lockScreen',
}

// Function to load definitions from browser
const loadDefinitions = () => {
  browser.storage.local.get(['hashedDefinitions']).then((result) => {
    if (result.hashedDefinitions) hashedDefinitions = result.hashedDefinitions;
  });
};

// Listen for changes in definitions
browser.storage.onChanged.addListener((changes) => {
  if (changes.hashedDefinitions) hashedDefinitions = changes.hashedDefinitions.newValue;
});

// Load initial settings
loadDefinitions();

const commands = {
    deleteChat:     new KeyboardEvent('keydown', { key: 'Backspace', ctrlKey: true,  altKey: true,  shiftKey: true  }),
    markUnread:     new KeyboardEvent('keydown', { key: 'u',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    mute:           new KeyboardEvent('keydown', { key: 'm',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    archive:        new KeyboardEvent('keydown', { key: 'e',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    pin:            new KeyboardEvent('keydown', { key: 'p',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    search:         new KeyboardEvent('keydown', { key: '/',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    searchInChat:   new KeyboardEvent('keydown', { key: 'f',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    newChat:        new KeyboardEvent('keydown', { key: 'n',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    newGroup:       new KeyboardEvent('keydown', { key: 'n',         ctrlKey: true,  altKey: true,  shiftKey: true  }),
    nextChat:       new KeyboardEvent('keydown', { key: 'Tab',       ctrlKey: true,  altKey: true,  shiftKey: false }),
    prevChat:       new KeyboardEvent('keydown', { key: 'Tab',       ctrlKey: true,  altKey: true,  shiftKey: true  }),
    closeChat:      new KeyboardEvent('keydown', { key: 'Escape',    ctrlKey: true,  altKey: true,  shiftKey: true  }),
    profile:        new KeyboardEvent('keydown', { key: 'p',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    speedUp:        new KeyboardEvent('keydown', { key: '.',         ctrlKey: false, altKey: false, shiftKey: true  }),
    speedDown:      new KeyboardEvent('keydown', { key: ',',         ctrlKey: false, altKey: false, shiftKey: true  }),
    settings:       new KeyboardEvent('keydown', { key: ',',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    emojiPanel:     new KeyboardEvent('keydown', { key: 'e',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    gifPanel:       new KeyboardEvent('keydown', { key: 'g',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    stickerPanel:   new KeyboardEvent('keydown', { key: 's',         ctrlKey: true,  altKey: true,  shiftKey: false }),
    extendedSearch: new KeyboardEvent('keydown', { key: 'k',         ctrlKey: false, altKey: true,  shiftKey: false }),
    lockScreen:     new KeyboardEvent('keydown', { key: 'l',         ctrlKey: true,  altKey: true,  shiftKey: false }),
}

function tryMatch({key, ctrlKey, altKey, shiftKey}) {
    const shortcutKey = `${key.toLowerCase()}:${ctrlKey}:${altKey}:${shiftKey}`
    return commands?.[hashedDefinitions?.[shortcutKey]] 
}

// Main key event handler
document.addEventListener('keydown', (event) => {
    const newEvent = tryMatch(event)
    if (newEvent) {
      document.dispatchEvent(newEvent)
      event.preventDefault()
      event.stopImmediatePropagation()
    }
}, true);
