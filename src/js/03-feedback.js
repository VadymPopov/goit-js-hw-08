import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const savedInfo = JSON.parse(localStorage.getItem(STORAGE_KEY));

refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onSubmit);

populateForm();

function onSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(savedInfo);

  localStorage.removeItem(STORAGE_KEY);
}

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  if (savedInfo === null) {
    return;
  }

  refs.email.value = savedInfo.email || '';
  refs.message.value = savedInfo.message || '';
}
