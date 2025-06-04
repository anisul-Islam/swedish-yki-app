//@ts-nocheck
let vocabulary = JSON.parse(localStorage.getItem('vocabulary')) || [
  { word: 'Vad heter du?', meaning: 'What is your name?', category: 'Phrase' },
  { word: 'Jag heter ...', meaning: 'My name is ...', category: 'Phrase' },
  {
    word: 'Varifrån kommer du?',
    meaning: 'Where are you from?',
    category: 'Phrase',
  },
  {
    word: 'Jag kommer från ...',
    meaning: 'I come from ...',
    category: 'Phrase',
  },
  {
    word: 'Vad talar du för språk?',
    meaning: 'What language do you speak?',
    category: 'Phrase',
  },
  {
    word: 'Jag talar svenska och engelska.',
    meaning: 'I speak Swedish and English.',
    category: 'Phrase',
  },
  { word: 'Bra', meaning: 'Great', category: 'Adjective' },
  { word: 'Jag jobbar inte.', meaning: 'I’m not working.', category: 'Phrase' },
  {
    word: 'Jag arbetar inte.',
    meaning: 'I’m not working.',
    category: 'Phrase',
  },
  { word: 'inte', meaning: 'not', category: 'Adverb' },
  { word: 'jobbar', meaning: 'work', category: 'Verb' },
  { word: 'arbetar', meaning: 'work', category: 'Verb' },
  { word: 'söker', meaning: 'looking for', category: 'Verb' },
  { word: 'pensionär', meaning: 'retired person', category: 'Noun' },
  { word: 'Jobbar du?', meaning: 'Do you work?', category: 'Phrase' },
  { word: 'Jag pluggar.', meaning: 'I study.', category: 'Phrase' },
  { word: 'Vad gör du?', meaning: 'What do you do?', category: 'Phrase' },
  {
    word: 'Vad studerar du?',
    meaning: 'What are you studying?',
    category: 'Phrase',
  },
  { word: 'här', meaning: 'here', category: 'Adverb' },
  { word: 'där', meaning: 'there', category: 'Adverb' },
  { word: 'den här', meaning: 'this (common gender)', category: 'Phrase' },
  { word: 'det här', meaning: 'this (neuter gender)', category: 'Phrase' },
  { word: 'den där', meaning: 'that (common gender)', category: 'Phrase' },
  { word: 'det där', meaning: 'that (neuter gender)', category: 'Phrase' },

  { word: 'advokat', meaning: 'lawyer', category: 'Noun' },
  { word: 'läkare', meaning: 'doctor', category: 'Noun' },
  { word: 'ingenjör', meaning: 'engineer', category: 'Noun' },
  { word: 'lärare', meaning: 'teacher', category: 'Noun' },
  { word: 'busschaufför', meaning: 'bus driver', category: 'Noun' },
  { word: 'fotograf', meaning: 'photographer', category: 'Noun' },
  { word: 'servitör', meaning: 'waiter', category: 'Noun' },
  { word: 'kock', meaning: 'cook', category: 'Noun' },
  { word: 'sjuksköterska', meaning: 'nurse', category: 'Noun' },
  { word: 'tandläkare', meaning: 'dentist', category: 'Noun' },
  { word: 'webbdesigner', meaning: 'web designer', category: 'Noun' },
  { word: 'frisör', meaning: 'hairdresser', category: 'Noun' },
  { word: 'Apelsin', meaning: 'Orange', category: 'Noun' },
  { word: 'Apa', meaning: 'Monkey', category: 'Noun' },
  { word: 'Ananas', meaning: 'Pineapple', category: 'Noun' },
  { word: 'Barn', meaning: 'Child', category: 'Noun' },
  { word: 'Bil', meaning: 'Car', category: 'Noun' },
  { word: 'Bra', meaning: 'great', category: 'Noun' },
  { word: 'Banan', meaning: 'Banana', category: 'Noun' },
  { word: 'Citron', meaning: 'Lemon', category: 'Noun' },
  { word: 'Cykel', meaning: 'Bicycle', category: 'Noun' },
  { word: 'Dator', meaning: 'Computer', category: 'Noun' },
  { word: 'Delfin', meaning: 'Dolphin', category: 'Noun' },
  { word: 'Elefant', meaning: 'Elephant', category: 'Noun' },
  { word: 'Eld', meaning: 'Fire', category: 'Noun' },
  { word: 'Flicka', meaning: 'Girl', category: 'Noun' },
  { word: 'Flygplan', meaning: 'Plane', category: 'Noun' },
  { word: 'Fotboll', meaning: 'Football', category: 'Noun' },
  { word: 'Glass', meaning: 'Ice cream', category: 'Noun' },
  { word: 'Gurka', meaning: 'Cucumber', category: 'Noun' },
  { word: 'Hund', meaning: 'Dog', category: 'Noun' },
  { word: 'Häst', meaning: 'Horse', category: 'Noun' },
  { word: 'Is', meaning: 'Ice', category: 'Noun' },
  { word: 'Jordgubbe', meaning: 'Strawberry', category: 'Noun' },
  { word: 'Katt', meaning: 'Cat', category: 'Noun' },
  { word: 'Klocka', meaning: 'Clock', category: 'Noun' },
  { word: 'Kurs', meaning: 'Classroom', category: 'Noun' },
  { word: 'Lejon', meaning: 'Lion', category: 'Noun' },
  { word: 'Lampa', meaning: 'Lamp', category: 'Noun' },
  { word: 'Mjölk', meaning: 'Milk', category: 'Noun' },
  { word: 'Mat', meaning: 'Food', category: 'Noun' },
  { word: 'Nalle', meaning: 'Teddy bear', category: 'Noun' },
  { word: 'Nej', meaning: 'No', category: 'Noun' },
  { word: 'Nyckel', meaning: 'Key', category: 'Noun' },
  { word: 'Ost', meaning: 'Cheese', category: 'Noun' },
  { word: 'Och', meaning: 'And', category: 'Conjunction' },
  { word: 'Olja', meaning: 'Oil', category: 'Noun' },
  { word: 'Pojke', meaning: 'Boy', category: 'Noun' },
  { word: 'Penna', meaning: 'Pen', category: 'Noun' },
  { word: 'Papper', meaning: 'Paper', category: 'Noun' },
  { word: 'Qvint', meaning: 'Fifth (music)', category: 'Noun' },
  { word: 'Ris', meaning: 'Rice', category: 'Noun' },
  { word: 'Räv', meaning: 'Fox', category: 'Noun' },
  { word: 'Stol', meaning: 'Chair', category: 'Noun' },
  { word: 'Jaha', meaning: 'I see', category: 'Noun' },
  { word: 'Såklart', meaning: 'of course', category: 'Noun' },
  { word: 'Sol', meaning: 'Sun', category: 'Noun' },
  { word: 'Tack', meaning: 'Thank you', category: 'Phrase' },
  { word: 'Tomat', meaning: 'Tomato', category: 'Noun' },
  { word: 'Teve', meaning: 'Television', category: 'Noun' },
  { word: 'Tåg', meaning: 'Train', category: 'Noun' },
  { word: 'Underbar', meaning: 'Wonderful', category: 'Adjective' },
  { word: 'Vän', meaning: 'Friend', category: 'Noun' },
  { word: 'Vindruva', meaning: 'Grapes', category: 'Noun' },
  { word: 'Vägg', meaning: 'Wall', category: 'Noun' },
  { word: 'Xylofon', meaning: 'Xylophone', category: 'Noun' },
  { word: 'Yoghurt', meaning: 'Yogurt', category: 'Noun' },
  { word: 'Zebra', meaning: 'Zebra', category: 'Noun' },
  { word: 'År', meaning: 'Year', category: 'Noun' },
  { word: 'Äpple', meaning: 'Apple', category: 'Noun' },
  { word: 'Öga', meaning: 'Eye', category: 'Noun' },
  { word: 'Sida', meaning: 'Page', category: 'Noun' },
  { word: 'Bok', meaning: 'Book', category: 'Noun' },
  { word: 'Kapitel', meaning: 'Chapter', category: 'Noun' },
  { word: 'Svar', meaning: 'Answer', category: 'Noun' },
  { word: 'Fråga', meaning: 'Question', category: 'Noun' },
  { word: 'Lära', meaning: 'Learn', category: 'Verb' },
  { word: 'Studera', meaning: 'Study', category: 'Verb' },
  { word: 'Börja', meaning: 'Begin', category: 'Verb' },
  { word: 'Sluta', meaning: 'End', category: 'Verb' },
  { word: 'Lyssna', meaning: 'Listen', category: 'Verb' },
  { word: 'Hej', meaning: 'Hi / Hello', category: 'Phrase' },
  { word: 'Jag', meaning: 'I', category: 'Pronoun' },
  { word: 'Du', meaning: 'You', category: 'Pronoun' },
  { word: 'Heter', meaning: 'Am called', category: 'Verb' },
  { word: 'Kommer', meaning: 'Come', category: 'Verb' },
  { word: 'Från', meaning: 'From', category: 'Preposition' },
  { word: 'Varifrån', meaning: 'Where from', category: 'Question' },
  { word: 'Talar', meaning: 'Speak', category: 'Verb' },
  { word: 'Vad', meaning: 'What', category: 'Question' },
  { word: 'Hon', meaning: 'She', category: 'Pronoun' },
  { word: 'Han', meaning: 'He', category: 'Pronoun' },
  { word: 'Vi', meaning: 'We', category: 'Pronoun' },
  { word: 'Ni', meaning: 'You (plural)', category: 'Pronoun' },
  { word: 'De', meaning: 'They', category: 'Pronoun' },
  { word: 'Apelsin', meaning: 'Orange', category: 'Noun' },
  { word: 'Hund', meaning: 'Dog', category: 'Noun' },
  { word: 'Katt', meaning: 'Cat', category: 'Noun' },
  { word: 'Underbar', meaning: 'Wonderful', category: 'Adjective' },
  { word: 'Tack', meaning: 'Thank you', category: 'Phrase' },
  { word: 'Och', meaning: 'And', category: 'Conjunction' },
  { word: 'Foton', meaning: 'Photos', category: 'Noun' },
  { word: 'Ord', meaning: 'Word', category: 'Noun' },
  { word: 'Eller', meaning: 'Or', category: 'Conjunction' },
];

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

const chaptersInfo = [
  `  <div class="chapter-content">
        <h2>📘 Chapter 1 – You can speak Swedish!</h2>
        <p><strong>🎯 Goal:</strong> Learn basic greetings, pronunciation, verb position, and how to introduce someone.</p>

        <h3>🧠 What you'll learn</h3>
        <ul>
          <li>👋 Say hello and ask names: <em>Hej! Jag heter…</em>, <em>Vad heter du?</em></li>
          <li>🌍 Ask origin: <em>Varifrån kommer du?</em></li>
          <li>🗣️ Long & short vowels: <em>mobil</em> vs <em>kaffe</em></li>
          <li>🧩 Sentence structure and verb position</li>
          <li>🧍‍♂️ Introduce others: <em>Han heter… Hon kommer från…</em></li>
        </ul>

        <h3>📌 Key Grammar</h3>
        <ul>
          <li><strong>Verb Position:</strong> Verbs go in position 2</li>
          <li><strong>Pronouns:</strong> jag, du, han, hon, vi, ni, de</li>
          <li><strong>Question Words:</strong> Vad, Varifrån, Var</li>
          <li><strong>Verbs:</strong> heter, kommer, talar</li>
          <li><strong>Conjunctions:</strong> och (and), eller (or), men (but), för (because)</li>
          <li><strong>Pronunciation Tips:</strong> 'g' is often soft or silent (e.g., <em>dag</em> → <em>da</em>), and 'r' is lightly rolled (e.g., <em>röd</em>, <em>Sverige</em>)</li>
        </ul>

        <h3>💬 Useful Phrases</h3>
       <div class="table-container">
        <table class="phrase-table">
          <tr><th>Swedish</th><th>English</th></tr>
          <tr><td><strong>Vad heter jag/du/han/hon/vi/ni/de?</strong><br>Jag/du/han/hon/vi/ni/de heter...</td><td>What is my/your/his/her/our/your/their name?<br>My/Your/His/Her/Our/Your/Their name is...</td></tr>
          <tr><td><strong>Varifrån kommer jag/du/han/hon/vi/ni/de?</strong><br>Jag/du/han/hon/vi/ni/de kommer från...</td><td>Where am I/are you/is he/she/are we/are you/are they from?<br>I/You/He/She/We/You/They come from...</td></tr>
          <tr><td><strong>Vad talar jag/du/han/hon/vi/ni/de för språk?</strong><br>Jag/du/han/hon/vi/ni/de talar...</td><td>What language(s) do I/you/he/she/we/you/they speak?<br>I/You/He/She/We/You/They speak...</td></tr>
          <tr><td><strong>Arbetar du här?</strong></td><td>Do you work here?</td></tr>
          <tr><td><strong>Jag arbetar inte här.</strong></td><td>I don’t work here.</td></tr>
          <tr><td><strong>Vad gör du?</strong></td><td>What do you do?</td></tr>
          <tr><td><strong>Jag söker jobb.</strong></td><td>I’m looking for a job.</td></tr>
          <tr><td><strong>Jag är pensionär.</strong></td><td>I am retired.</td></tr>
        </table>
       </div>

       <h3>🌐 Common Languages in Swedish</h3>
       <div class="table-container">
   <table class="phrase-table">
          <tr><th>Swedish</th><th>English</th></tr>
          <tr><td>svenska</td><td>Swedish</td></tr>
          <tr><td>engelska</td><td>English</td></tr>
          <tr><td>arabiska</td><td>Arabic</td></tr>
          <tr><td>bengaliska</td><td>Bengali</td></tr>
          <tr><td>franska</td><td>French</td></tr>
          <tr><td>tyska</td><td>German</td></tr>
          <tr><td>spanska</td><td>Spanish</td></tr>
          <tr><td>finska</td><td>Finnish</td></tr>
          <tr><td>hindi</td><td>Hindi</td></tr>
          <tr><td>urdu</td><td>Urdu</td></tr>
          <tr><td>ryska</td><td>Russian</td></tr>
          <tr><td>kinesiska</td><td>Chinese</td></tr>
          <tr><td>japanska</td><td>Japanese</td></tr>
        </table>
</div>

        
       

        <h3>👩‍⚕️ Occupation Vocabulary</h3>
        <div class="table-container"> <table class="phrase-table">
          <tr><th>Swedish</th><th>English</th></tr>
          <tr><td>ingenjör</td><td>engineer</td></tr>
          <tr><td>läkare</td><td>doctor</td></tr>
          <tr><td>sjuksköterska</td><td>nurse</td></tr>
          <tr><td>tandläkare</td><td>dentist</td></tr>
          <tr><td>advokat</td><td>lawyer</td></tr>
          <tr><td>busschaufför</td><td>bus driver</td></tr>
          <tr><td>servitör</td><td>waiter</td></tr>
          <tr><td>kock</td><td>chef</td></tr>
          <tr><td>frisör</td><td>hairdresser</td></tr>
          <tr><td>webbdesigner</td><td>web designer</td></tr>
          <tr><td>fotograf</td><td>photographer</td></tr>
          <tr><td>lärare</td><td>teacher</td></tr>
        </table>
 </div>
        
        <h3>✅ Checklist</h3>
        <ul class="checklist">
          <li><label><input type="checkbox"> Introduce yourself and ask others’ names</label></li>
          <li><label><input type="checkbox"> Ask and answer about origin and languages</label></li>
          <li><label><input type="checkbox"> Learn all subject pronouns</label></li>
          <li><label><input type="checkbox"> Understand and apply verb position rules</label></li>
          <li><label><input type="checkbox"> Practice pronunciation: soft 'g' and light 'r'</label></li>
          <li><label><input type="checkbox"> Practice work/study conversation phrases</label></li>
        </ul>
      </div>`,
];

function populateLetterFilter() {
  const letters = [
    ...new Set(vocabulary.map((v) => v.word[0].toUpperCase())),
  ].sort();
  letters.forEach((letter) => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    letterFilter.appendChild(option);
  });
}

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
  container.innerHTML =
    chaptersInfo[chapter - 1] || '<p>No notes available.</p>';
}

function switchChapter(chapterNumber) {
  const chapter = parseInt(chapterNumber, 10);
  renderChapterInfo(chapter);
}

document.addEventListener('DOMContentLoaded', () => {
  populateLetterFilter();
  showCard();
  switchChapter(1);

  // Add event listeners
  flashcard.addEventListener('click', toggleCard);
  document.getElementById('prevCard').addEventListener('click', prevCard);
  document.getElementById('nextCard').addEventListener('click', nextCard);
  document.getElementById('playAudio').addEventListener('click', playAudio);
  document.getElementById('resetCards').addEventListener('click', resetCards);
  document
    .getElementById('shuffleCards')
    .addEventListener('click', shuffleCards);
  document.getElementById('addCard').addEventListener('click', addCard);
  document
    .getElementById('toggleVocabTable')
    ?.addEventListener('click', toggleVocabTable);
  document
    .getElementById('downloadPDF')
    ?.addEventListener('click', downloadPDF);
  letterFilter.addEventListener('change', () => applyFilters());
  categoryFilter.addEventListener('change', () => applyFilters());
  chapterSelect.addEventListener('change', (e) =>
    switchChapter(e.target.value)
  );
});
