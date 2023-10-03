const defaultCommands = {
  delete:         { key: 'Backspace', ctrl: true,  alt: true,  shift: true  },
  markUnread:     { key: 'u',         ctrl: true,  alt: true,  shift: true  },
  mute:           { key: 'm',         ctrl: true,  alt: true,  shift: true  },
  archive:        { key: 'e',         ctrl: true,  alt: true,  shift: true  },
  pin:            { key: 'p',         ctrl: true,  alt: true,  shift: true  },
  search:         { key: '/',         ctrl: true,  alt: true,  shift: false },
  searchInChat:   { key: 'f',         ctrl: true,  alt: true,  shift: true  },
  newChat:        { key: 'n',         ctrl: true,  alt: true,  shift: false },
  newGroup:       { key: 'n',         ctrl: true,  alt: true,  shift: true  },
  nextChat:       { key: 'Tab',       ctrl: true,  alt: true,  shift: false },
  prevChat:       { key: 'Tab',       ctrl: true,  alt: true,  shift: true  },
  closeChat:      { key: 'Escape',    ctrl: true,  alt: true,  shift: true  },
  profile:        { key: 'p',         ctrl: true,  alt: true,  shift: false },
  speedUp:        { key: '.',         ctrl: false, alt: false, shift: true  },
  speedDown:      { key: ',',         ctrl: false, alt: false, shift: true  },
  settings:       { key: ',',         ctrl: true,  alt: true,  shift: false },
  emojiPanel:     { key: 'e',         ctrl: true,  alt: true,  shift: false },
  gifPanel:       { key: 'g',         ctrl: true,  alt: true,  shift: false },
  stickerPanel:   { key: 's',         ctrl: true,  alt: true,  shift: false },
  extendedSearch: { key: 'k',         ctrl: false, alt: true,  shift: false },
  lockScreen:     { key: 'l',         ctrl: true,  alt: true,  shift: false },
}

const commandKeys = Object.keys(defaultCommands)

function createShortcutForm(cmd) {
  const keyInput = document.createElement('input')
  keyInput.id = `key-${cmd}`
  const keyLabel = document.createElement('label')
  keyLabel.htmlFor = keyInput.id
  keyInput.type = 'text'
  keyLabel.innerText = cmd

  const ctrlLabel = document.createElement('label')
  ctrlLabel.innerText = 'Ctrl'
  const ctrlInput = document.createElement('input')
  ctrlInput.type = 'checkbox'
  ctrlInput.id = `ctrl-${cmd}`
  ctrlLabel.appendChild(ctrlInput)

  const altLabel = document.createElement('label')
  altLabel.innerText = 'Alt'
  const altInput = document.createElement('input')
  altInput.type = 'checkbox'
  altInput.id = `alt-${cmd}`
  altLabel.appendChild(altInput)

  const shiftLabel = document.createElement('label')
  shiftLabel.innerText = 'Shift'
  const shiftInput = document.createElement('input')
  shiftInput.type = 'checkbox'
  shiftInput.id = `shift-${cmd}`
  shiftLabel.appendChild(shiftInput)

  const wrapper = document.createElement('div')
  wrapper.id = `wrapper-${cmd}`
  wrapper.appendChild(keyLabel)
  wrapper.appendChild(keyInput)
  wrapper.appendChild(ctrlLabel)
  wrapper.appendChild(altLabel)
  wrapper.appendChild(shiftLabel)

  return wrapper
}

document.addEventListener('DOMContentLoaded', () => {
  // Build form
  const container = document.getElementById('container')
  commandKeys.forEach(cmd => container.appendChild(createShortcutForm(cmd)))

  // Load and set current definitions from storage
  browser.storage.local.get(['definitions']).then((result) => {
    Object.entries(defaultCommands).forEach(([cmd, params]) => {
      const { key, ctrl, alt, shift } = result.definitions?.[cmd] || params
      document.getElementById(`key-${cmd}`).value = key
      document.getElementById(`ctrl-${cmd}`).checked = ctrl
      document.getElementById(`alt-${cmd}`).checked = alt
      document.getElementById(`shift-${cmd}`).checked = shift
    })
  });

  // Save new definitions
  document.getElementById('saveBtn').addEventListener('click', () => {
    const definitions = {}
    const hashedDefinitions = {}
    commandKeys.forEach(cmd => {
      const def = {
        key: document.getElementById(`key-${cmd}`).value,
        ctrl: document.getElementById(`ctrl-${cmd}`).checked,
        alt: document.getElementById(`alt-${cmd}`).checked,
        shift: document.getElementById(`shift-${cmd}`).checked,
      }
      definitions[cmd] = def
      const hash = `${def.key}:${def.ctrl}:${def.alt}:${def.shift}`.toLowerCase()
      hashedDefinitions[hash] = cmd
    })

    browser.storage.local.set({ definitions, hashedDefinitions });
  });
});

