// @ts-nocheck
import { chapter1Content } from './chapters/chapter1.js';
import { chapter2Content } from './chapters/chapter2.js';
import { vocabulary } from './vocabulary.js';

const chaptersInfo = [chapter1Content, chapter2Content];

// Separated Swedish alphabet list
const swedishAlphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Å',
  'Ä',
  'Ö',
];

const swedishAlphabetBtn = document.getElementById('swedishAlphabet');
swedishAlphabetBtn?.addEventListener('click', toggleSwedishAlphabet);

let isAlphabetVisible = false;

function toggleSwedishAlphabet() {
  const target = document.getElementById('alphabetDisplay');
  if (!target) return;
  if (isAlphabetVisible) {
    target.innerHTML = '';
    isAlphabetVisible = false;
    return;
  }

  const container = document.createElement('div');
  container.style.margin = '20px auto';
  container.style.maxWidth = '600px';
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.gap = '10px';

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

// Group and deduplicate words by letter and category (case-insensitive)
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');
const groupedByLetter = {};
const groupedByCategory = {};

vocabulary.forEach((entry) => {
  const word = entry.word.trim();
  const firstLetter = word[0].toLocaleUpperCase('sv-SE');
  const category = entry.category.trim().toLowerCase();

  if (!groupedByLetter[firstLetter]) groupedByLetter[firstLetter] = [];
  groupedByLetter[firstLetter].push(entry);

  if (!groupedByCategory[category]) groupedByCategory[category] = [];
  groupedByCategory[category].push(entry);
});

let currentIndex = 0;
let showingWord = true;
let filteredVocabulary = [...vocabulary];

const flashcard = document.getElementById('flashcard');
const letterFilter = document.getElementById('letterFilter');
const categoryFilter = document.getElementById('categoryFilter');
const chapterSelect = document.getElementById('chapterSelect');
const vocabTableContainer = document.getElementById('vocabTableContainer');
const vocabTableBody = document.querySelector('#vocabTable tbody');

function speakSwedish(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'sv-SE';
  speechSynthesis.speak(utterance);
}

function populateLetterFilter() {
  allLetters.forEach((letter) => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    letterFilter?.appendChild(option);
  });
}

// (rest of the unchanged code follows...)

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

function toggleCard() {
  if (!filteredVocabulary.length) return;
  showingWord = !showingWord;
  flashcard.textContent = showingWord
    ? filteredVocabulary[currentIndex].word
    : filteredVocabulary[currentIndex].meaning;
}

function nextCard() {
  if (!filteredVocabulary.length) return;
  currentIndex = (currentIndex + 1) % filteredVocabulary.length;
  showCard();
}

function prevCard() {
  if (!filteredVocabulary.length) return;
  currentIndex =
    (currentIndex - 1 + filteredVocabulary.length) % filteredVocabulary.length;
  showCard();
}

function playAudio() {
  if (!filteredVocabulary.length) return;
  speakSwedish(filteredVocabulary[currentIndex].word);
}

function addCard() {
  const word = document.getElementById('wordInput').value.trim();
  const meaning = document.getElementById('meaningInput').value.trim();
  const category = 'Noun';
  if (word && meaning) {
    vocabulary.push({ word, meaning, category });
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    filteredVocabulary = [...vocabulary];
    document.getElementById('wordInput').value = '';
    document.getElementById('meaningInput').value = '';
    alert('New word added!');
    populateLetterFilter();
    showCard();
  } else {
    alert('Please enter both Swedish word and English meaning.');
  }
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Swedish to English Vocabulary', 20, 20);
  doc.setFontSize(12);
  doc.text(`Total Words: ${filteredVocabulary.length}`, 20, 30);
  let y = 40;
  filteredVocabulary
    .sort((a, b) => a.word.localeCompare(b.word, 'sv'))
    .forEach((item, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(
        `${index + 1}. ${item.word} – ${item.meaning} (${item.category})`,
        20,
        y
      );
      y += 10;
    });
  doc.save('swedish_english_vocabulary.pdf');
}

function resetCards() {
  currentIndex = 0;
  filteredVocabulary = [...vocabulary];
  letterFilter.value = '';
  categoryFilter.value = '';
  showCard();
}

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

function toggleVocabTable() {
  if (
    vocabTableContainer.style.display === 'none' ||
    !vocabTableContainer.style.display
  ) {
    vocabTableBody.innerHTML = '';
    filteredVocabulary.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f0f0f0';
      row.innerHTML = `
        <td>
          ${entry.word}
          <button class="speak-btn" data-word="${entry.word}" title="Play Audio">🔊</button>
        </td>
        <td>${entry.meaning}</td>
        <td>${entry.category}</td>
      `;
      vocabTableBody.appendChild(row);
    });
    vocabTableBody.querySelectorAll('.speak-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        speakSwedish(btn.dataset.word);
      });
    });
    vocabTableContainer.style.display = 'block';
  } else {
    vocabTableContainer.style.display = 'none';
  }
}

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

function renderChapterInfo(chapter = 1) {
  const container = document.getElementById('chapter-notes');
  if (container) {
    container.innerHTML =
      chaptersInfo[chapter - 1] || '<p>No notes available.</p>';
    container.style.display = 'block';
  }
}

function switchChapter(chapterNumber) {
  const chapter = parseInt(chapterNumber, 10);
  renderChapterInfo(chapter);
}

// Make switchChapter available globally for inline HTML calls
window.switchChapter = switchChapter;

document.addEventListener('DOMContentLoaded', () => {
  populateLetterFilter();
  showCard();

  const chapterNotesContainer = document.getElementById('chapter-notes');
  if (chapterNotesContainer) {
    chapterNotesContainer.style.display = 'none';
  }

  if (flashcard) flashcard.addEventListener('click', toggleCard);
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
  chapterSelect?.addEventListener('change', (e) =>
    switchChapter(e.target.value)
  );
});
