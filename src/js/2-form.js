const storageKey = 'feedback-msg';
const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', (e) => {
  const userName = e.currentTarget.elements.email.value.trim();
  const userMessage = e.currentTarget.elements.message.value.trim();

  const data = {
    name: userName,
    message: userMessage,
  };
  saveToLS(storageKey, data);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userName = form.elements.email.value.trim();
  const userMessage = form.elements.message.value.trim();

  if (userName && userMessage) {
    const data = loadFromLS(storageKey) || {};
    console.log(data);

    localStorage.removeItem(storageKey);
    form.reset();
  } else {
    console.log('Please complete both fields of the form before submitting.');
  }
});

function loadFromLS(key = 'empty') {
  const data = localStorage.getItem(key);

  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function restoreData() {
  const data = loadFromLS(storageKey) || {};

  form.elements.email.value = data.name || '';
  form.elements.message.value = data.message || '';
}

restoreData();
