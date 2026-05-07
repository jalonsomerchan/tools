const input = document.getElementById('input');
const output = document.getElementById('output');
const statusElement = document.getElementById('status');

const encodeUtf8 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const decodeUtf8 = (value) => {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const setStatus = (message, isError = false) => {
  statusElement.textContent = message;
  statusElement.style.color = isError ? '#fca5a5' : '';
};

const actions = {
  encode() {
    try {
      output.value = encodeUtf8(input.value);
      setStatus('Texto codificado correctamente.');
    } catch (error) {
      setStatus('No se pudo codificar el texto.', true);
    }
  },

  decode() {
    try {
      output.value = decodeUtf8(input.value.trim());
      setStatus('Texto decodificado correctamente.');
    } catch (error) {
      setStatus('La cadena Base64 no es válida.', true);
    }
  },

  swap() {
    const currentInput = input.value;
    input.value = output.value;
    output.value = currentInput;
    setStatus('Contenido intercambiado.');
  },

  clear() {
    input.value = '';
    output.value = '';
    setStatus('Contenido eliminado.');
  },

  async copy() {
    if (!output.value) {
      setStatus('No hay contenido para copiar.', true);
      return;
    }

    try {
      await navigator.clipboard.writeText(output.value);
      setStatus('Resultado copiado al portapapeles.');
    } catch (error) {
      setStatus('No se pudo copiar el resultado.', true);
    }
  }
};

for (const button of document.querySelectorAll('[data-action]')) {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    actions[action]?.();
  });
}

input.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    actions.encode();
  }
});
