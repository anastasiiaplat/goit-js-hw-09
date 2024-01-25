const storage_key = 'feedback-msg'; 
const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textatea');


form.addEventListener('input', e => {
  const userName = e.currentTarget.elements.email.value;
    const userMessage = e.currentTarget.elements.message.value;
 
    const data = {
    name: userName,
    message: userMessage,
  };
saveToLS(storage_key, data);
});


form.addEventListener('submit', e => {
  e.preventDefault();

  const data = loadFromLS(storage_key) || {};
  console.log(data);

  localStorage.removeItem(storage_key);
  form.reset();
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
  const data = loadFromLS(storage_key) || {};

  form.elements.email.value = data.name || '';
  form.elements.message.value = data.message || '';
}
restoreData();
 

