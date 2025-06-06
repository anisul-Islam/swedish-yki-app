// @ts-nocheck
import { chapter1Content } from './chapters/chapter1.js';
import { chapter2Content } from './chapters/chapter2.js';
import { vocabulary } from './vocabulary.js';
import {
  evaluateChapter1Quiz,
  bindChapter1QuizEvents,
} from './quizzes/quiz1.js';

const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
toggleDarkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

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
const alphabetDisplay = document.getElementById('alphabetDisplay');

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
  // Always hide vocabulary section when showing alphabet
  vocabTableContainer.style.display = 'none';

  if (isAlphabetVisible) {
    alphabetDisplay.innerHTML = '';
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
  alphabetDisplay.innerHTML = '';
  alphabetDisplay.appendChild(container);
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
// function renderChapterInfo(chapter = 1) {
//   console.log(chapter)
//   const container = document.getElementById('chapter-notes');
//   if (container) {
//     container.innerHTML =
//       chaptersInfo[chapter - 1] || '<p>No notes available.</p>';
//     container.style.display = 'block';

//     // ✅ Bind quiz logic for Chapter 1 only
//     if (parseInt(chapter) === 1) {
//       bindChapter1QuizEvents();
//       console.log("hi1")
//       enableActivityEDragAndDrop(); // <- this line is essential here
//        console.log('hi2');
//     }
//   }
// }

// 🔄 Switch visible chapter
// function switchChapter(chapterNumber) {
//   const chapter = parseInt(chapterNumber, 10);
//   renderChapterInfo(chapter);
// }

const correctSentences = {
  1: ['talar', 'du', 'franska', '?'],
  2: ['Georgios', 'är', 'inte', 'gift'],
  3: ['varifrån', 'kommer', 'Juan', '?'],
  4: ['Lisa', 'studerar', 'matematik'],
  5: ['vad', 'talar', 'du', 'språk'], // or ['Vad', 'talar', 'du', 'för', 'språk'] if you update sentence
  6: ['Renate', 'har', 'två', 'barn'],
  7: ['vad', 'jobbar', 'du', 'med'],
  8: ['Kim', 'studerar', 'till', 'ingenjör'],
  9: ['Johan', 'söker', 'jobb'],
};

function validateActivityE() {
  const listItems = document.querySelectorAll('#activity-e-list li');
  let correctCount = 0;

  listItems.forEach((li) => {
    const id = li.getAttribute('data-id');
    const wordSpans = Array.from(li.querySelectorAll('.word'));
    const userWords = wordSpans.map((w) => w.textContent.trim());
    const correctWords = correctSentences[id];
    const isCorrect = userWords.join(' ') === correctWords.join(' ');

    li.style.backgroundColor = isCorrect ? '#d1fae5' : '#fee2e2';
    if (isCorrect) correctCount++;
  });

  document.getElementById(
    'activityEFeedback'
  ).innerHTML = `✅ ${correctCount} of ${listItems.length} sentences are correct.`;
}


function shuffleWords(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomizeActivityE() {
  const listItems = document.querySelectorAll('#activity-e-list li');
  listItems.forEach((li) => {
    const id = li.getAttribute('data-id');
    const original = [...correctSentences[id]];
    const shuffled = shuffleWords(original);
    li.innerHTML = shuffled
      .map((word) => `<span class="word" draggable="true">${word}</span>`)
      .join(' ');
  });
  enableActivityEDragAndDrop();
  document.getElementById('activityEFeedback').innerHTML = '';
}

function enableActivityEDragAndDrop() {
  const listItems = document.querySelectorAll('#activity-e-list li');
  listItems.forEach((li) => {
    const words = Array.from(li.querySelectorAll('.word'));
    words.forEach((word) => {
      word.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', word.innerText);
        e.dataTransfer.effectAllowed = 'move';
        word.classList.add('dragging');
      });
      word.addEventListener('dragend', () => word.classList.remove('dragging'));
      word.addEventListener('dragover', (e) => e.preventDefault());
      word.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedWord = document.querySelector('.dragging');
        if (!draggedWord || draggedWord === word) return;

        const parent = word.parentElement;
        const wordList = Array.from(parent.querySelectorAll('.word'));
        const fromIndex = wordList.indexOf(draggedWord);
        const toIndex = wordList.indexOf(word);

        if (fromIndex < toIndex) {
          parent.insertBefore(draggedWord, word.nextSibling);
        } else {
          parent.insertBefore(draggedWord, word);
        }
      });
    });
  });
}

// 📦 Setup listeners
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

  chapterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chapterNum = btn.dataset.chapter;
      const slot = document.getElementById(`chapter-content-${chapterNum}`);

      if (!slot) return;

      const isVisible = slot.style.display === 'block';
      document.querySelectorAll('.chapter-content-slot').forEach((div) => {
        div.style.display = 'none';
      });

      if (!isVisible) {
        slot.innerHTML =
          chaptersInfo[chapterNum - 1] || '<p>No notes available.</p>';
        slot.style.display = 'block';

        if (parseInt(chapterNum) === 1) {
          bindChapter1QuizEvents();
          enableActivityEDragAndDrop();

          const checkBtn = document.getElementById('checkActivityE');
          if (checkBtn) {
            const newBtn = checkBtn.cloneNode(true);
            checkBtn.parentNode.replaceChild(newBtn, checkBtn);
            newBtn.addEventListener('click', validateActivityE);
          }

          const randomBtn = document.getElementById('randomActivityE');
          if (randomBtn) {
            const newRand = randomBtn.cloneNode(true);
            randomBtn.parentNode.replaceChild(newRand, randomBtn);
            newRand.addEventListener('click', randomizeActivityE);
          }
        }
      } else {
        slot.style.display = 'none';
      }
    });
  });

  if (chapterContainer) chapterContainer.style.display = 'none';
  bindChapter1QuizEvents();
});
