// @ts-nocheck
import { chapter1Content } from './chapters/chapter1.js';
import { chapter2Content } from './chapters/chapter2.js';
import { vocabulary } from './vocabulary.js';

// Store chapter info content
const chaptersInfo = [chapter1Content, chapter2Content];

// Swedish alphabet for pronunciation buttons
const swedishAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');

let currentIndex = 0;
let showingWord = true;
let filteredVocabulary = [...vocabulary];
let isAlphabetVisible = false;
let currentVisibleChapter = null;

// DOM Elements
const flashcard = document.getElementById('flashcard');
const letterFilter = document.getElementById('letterFilter');
const categoryFilter = document.getElementById('categoryFilter');
const chapterSelect = document.getElementById('chapterSelect');
const vocabTableContainer = document.getElementById('vocabTableContainer');
const vocabTableBody = document.querySelector('#vocabTable tbody');
const swedishAlphabetBtn = document.getElementById('swedishAlphabet');
const chapterContainer = document.getElementById('chapter-notes');
const chapterButtons = document.querySelectorAll('[data-chapter]');

// 🗣 Speak Swedish text
function speakSwedish(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'sv-SE';
  speechSynthesis.speak(utterance);
}

// 🗣 Speak English text
function speakEnglish(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// 🔤 Populate alphabet filter
function populateLetterFilter() {
  letterFilter.innerHTML = '<option value="">Filter by Letter</option>';
  swedishAlphabet.forEach((letter) => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    letterFilter.appendChild(option);
  });
}

// 🔤 Toggle Swedish alphabet grid
function toggleSwedishAlphabet() {
  const target = document.getElementById('alphabetDisplay');
  if (!target) return;

  // Always hide vocabulary section when showing alphabet
  vocabTableContainer.style.display = 'none';

  if (isAlphabetVisible) {
    target.innerHTML = '';
    isAlphabetVisible = false;
    return;
  }

  const container = document.createElement('div');
  container.style.cssText =
    'margin: 20px auto; max-width: 600px; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;';
  swedishAlphabet.forEach((letter) => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => speakSwedish(letter);
    container.appendChild(btn);
  });
  target.innerHTML = '';
  target.appendChild(container);
  isAlphabetVisible = true;
}

// 🃏 Show current flashcard
function showCard() {
  if (!filteredVocabulary.length) {
    flashcard.textContent = 'No cards found.';
    return;
  }
  showingWord = true;
  flashcard.textContent = filteredVocabulary[currentIndex].word;
  document.getElementById('cardCounter').textContent = `Word ${
    currentIndex + 1
  } of ${filteredVocabulary.length}`;
  const progress = ((currentIndex + 1) / filteredVocabulary.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('percentageLabel').textContent = `${Math.round(
    progress
  )}% complete`;
}

// 🔁 Flip flashcard and speak
function toggleCard() {
  if (!filteredVocabulary.length) return;
  showingWord = !showingWord;
  const text = showingWord
    ? filteredVocabulary[currentIndex].word
    : filteredVocabulary[currentIndex].meaning;
  flashcard.textContent = text;
  showingWord ? speakSwedish(text) : speakEnglish(text);
}

// 🔊 Play current side audio
function playAudio() {
  if (!filteredVocabulary.length) return;
  const text = showingWord
    ? filteredVocabulary[currentIndex].word
    : filteredVocabulary[currentIndex].meaning;
  showingWord ? speakSwedish(text) : speakEnglish(text);
}

// ⏭ Next flashcard
function nextCard() {
  if (!filteredVocabulary.length) return;
  currentIndex = (currentIndex + 1) % filteredVocabulary.length;
  showCard();
}

// ⏮ Previous flashcard
function prevCard() {
  if (!filteredVocabulary.length) return;
  currentIndex =
    (currentIndex - 1 + filteredVocabulary.length) % filteredVocabulary.length;
  showCard();
}

// ➕ Add new vocabulary
function addCard() {
  const word = document.getElementById('wordInput').value.trim();
  const meaning = document.getElementById('meaningInput').value.trim();
  if (word && meaning) {
    vocabulary.push({ word, meaning, category: 'Noun' });
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    filteredVocabulary = [...vocabulary];
    document.getElementById('wordInput').value = '';
    document.getElementById('meaningInput').value = '';
    populateLetterFilter();
    showCard();
    alert('New word added!');
  } else {
    alert('Please enter both Swedish word and English meaning.');
  }
}

// 📥 Download vocabulary as PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16).text('Swedish to English Vocabulary', 20, 20);
  doc.setFontSize(12).text(`Total Words: ${vocabulary.length}`, 20, 30);
  let y = 40;
  vocabulary
    .sort((a, b) => a.word.localeCompare(b.word, 'sv'))
    .forEach((item, i) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(
        `${i + 1}. ${item.word} – ${item.meaning} (${item.category})`,
        20,
        y
      );
      y += 10;
    });
  doc.save('swedish_english_vocabulary.pdf');
}

// 🔁 Shuffle flashcards
function shuffleCards() {
  for (let i = filteredVocabulary.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredVocabulary[i], filteredVocabulary[j]] = [
      filteredVocabulary[j],
      filteredVocabulary[i],
    ];
  }
  currentIndex = 0;
  showCard();
  alert('Cards shuffled!');
}

// 🧹 Reset filters and cards
function resetCards() {
  currentIndex = 0;
  filteredVocabulary = [...vocabulary];
  letterFilter.value = '';
  categoryFilter.value = '';
  showCard();
}

// 🗂 Show or hide vocabulary table
function toggleVocabTable() {
  const alphabetDisplay = document.getElementById('alphabetDisplay');
  if (!vocabTableContainer || !vocabTableBody) return;

  // Always hide alphabet when showing vocabulary
  alphabetDisplay.innerHTML = '';
  isAlphabetVisible = false;

  const isHidden =
    vocabTableContainer.style.display === 'none' ||
    !vocabTableContainer.style.display;
  vocabTableBody.innerHTML = '';
  if (isHidden) {
    vocabulary.forEach((entry, i) => {
      const row = document.createElement('tr');
      row.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#f0f0f0';
      row.innerHTML = `
        <td>${entry.word} <button class="speak-btn" data-word="${entry.word}" title="Play Audio">🔊</button></td>
        <td>${entry.meaning}</td>
        <td>${entry.category}</td>
      `;
      vocabTableBody.appendChild(row);
    });
    vocabTableBody.querySelectorAll('.speak-btn').forEach((btn) => {
      btn.addEventListener('click', () => speakSwedish(btn.dataset.word));
    });
    vocabTableContainer.style.display = 'block';
  } else {
    vocabTableContainer.style.display = 'none';
  }
}

// 🧠 Filter vocabulary
function applyFilters(letter = '', category = '') {
  const selectedLetter = letter || letterFilter.value;
  const selectedCategory = category || categoryFilter.value;
  filteredVocabulary = vocabulary.filter((word) => {
    const matchLetter = selectedLetter
      ? word.word.startsWith(selectedLetter)
      : true;
    const matchCategory = selectedCategory
      ? word.category === selectedCategory
      : true;
    return matchLetter && matchCategory;
  });
  currentIndex = 0;
  showCard();
}

// 📘 Render chapter notes
function renderChapterInfo(chapter = 1) {
  const container = document.getElementById('chapter-notes');
  if (container) {
    container.innerHTML =
      chaptersInfo[chapter - 1] || '<p>No notes available.</p>';
    container.style.display = 'block';
  }
}

// 🔄 Switch visible chapter
function switchChapter(chapterNumber) {
  const chapter = parseInt(chapterNumber, 10);
  renderChapterInfo(chapter);
}

// 📦 Setup listeners and init app
window.addEventListener('DOMContentLoaded', () => {
  populateLetterFilter();
  showCard();

  document.getElementById('cardCounter').textContent = '';
  document.getElementById('percentageLabel').textContent = '';
  document.getElementById('progressBar').style.width = '0%';

  swedishAlphabetBtn?.addEventListener('click', toggleSwedishAlphabet);
  flashcard?.addEventListener('click', toggleCard);

  document.getElementById('prevCard')?.addEventListener('click', prevCard);
  document.getElementById('nextCard')?.addEventListener('click', nextCard);
  document.getElementById('playAudio')?.addEventListener('click', playAudio);
  document.getElementById('resetCards')?.addEventListener('click', resetCards);
  document
    .getElementById('shuffleCards')
    ?.addEventListener('click', shuffleCards);
  document.getElementById('addCard')?.addEventListener('click', addCard);
  document
    .getElementById('toggleVocabTable')
    ?.addEventListener('click', toggleVocabTable);
  document
    .getElementById('downloadPDF')
    ?.addEventListener('click', downloadPDF);

  letterFilter?.addEventListener('change', () => applyFilters());
  categoryFilter?.addEventListener('change', () => applyFilters());

  chapterButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (currentVisibleChapter === i) {
        chapterContainer.style.display = 'none';
        currentVisibleChapter = null;
      } else {
        renderChapterInfo(i + 1);
        chapterContainer.style.display = 'block';
        currentVisibleChapter = i;
      }
    });
  });

  // Hide chapter notes by default
  if (chapterContainer) chapterContainer.style.display = 'none';
});
