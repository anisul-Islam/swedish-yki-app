// quiz1.js
export function evaluateChapter1Quiz() {
  const form = document.getElementById('chapter1QuizForm');
  const resultDiv = document.getElementById('quizResult');
  if (!form || !resultDiv) return;

  const answers = {
    q1: 'kommer',
    q2: 'c',
    q3: 'vi',
    q4: 'jag söker jobb',
    q5: 'han talar bengaliska',
    q6: 'b',
    q7: 'kommer',
    q8: 'hon',
    q9: 'b',
    q10: 'where are you from?',
  };

  const userAnswers = {
    q1: form.q1?.value.trim().toLowerCase(),
    q2: form.q2?.value?.toLowerCase(),
    q3: form.q3?.value?.toLowerCase(),
    q4: form.q4?.value.trim().toLowerCase(),
    q5: form.q5?.value.trim().toLowerCase(),
    q6: form.q6?.value?.toLowerCase(),
    q7: form.q7?.value.trim().toLowerCase(),
    q8: form.q8?.value?.toLowerCase(),
    q9: form.q9?.value?.toLowerCase(),
    q10: form.q10?.value.trim().toLowerCase(),
  };

  let score = 0;
  Object.entries(answers).forEach(([key, correct]) => {
    if (userAnswers[key] === correct) score++;
  });

  let feedbackHTML = '<h4 style="text-align:left">✅ Your Score:</h4>';
  feedbackHTML += `<p style="text-align:left">You scored ${score} out of ${
    Object.keys(answers).length
  }.</p>`;

  feedbackHTML +=
    '<button id="toggleAnswersBtn" type="button">Show/Hide Correct Answers</button>';
  feedbackHTML +=
    '<div id="answerList" style="display:none"><h4 style="text-align:left">📋 Correct Answers:</h4><ol style="text-align:left">';
  Object.entries(answers).forEach(([key, correct], i) => {
    const userAnswer = userAnswers[key] || '<i>Blank</i>';
    const isCorrect = userAnswer === correct;
    feedbackHTML += `<li><strong>Q${
      i + 1
    }:</strong> Your answer: <code>${userAnswer}</code> — Correct: <code>${correct}</code> ${
      isCorrect ? '✅' : '❌'
    }</li>`;
  });
  feedbackHTML += '</ol></div>';

  // Add navigation for user experience
  feedbackHTML += `
    <div class="quiz-navigation">
      <button id="prevChapterBtn" type="button">⬅️ Previous Chapter</button>
      <button id="nextChapterBtn" type="button">Next Chapter ➡️</button>
    </div>
  `;

  resultDiv.innerHTML = feedbackHTML;

  // Avoid reloading or hiding anything
  const toggleAnswersBtn = document.getElementById('toggleAnswersBtn');
  const answerList = document.getElementById('answerList');
  toggleAnswersBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (answerList) {
      answerList.style.display =
        answerList.style.display === 'none' ? 'block' : 'none';
    }
  });

  document.getElementById('prevChapterBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    alert('Previous chapter navigation not implemented yet.');
  });
  document.getElementById('nextChapterBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    alert('Next chapter navigation not implemented yet.');
  });
}

export function bindChapter1QuizEvents() {
  const toggleBtn = document.getElementById('toggleChapter1QuizBtn');
  const quizDiv = document.getElementById('chapter1Quiz');
  const submitBtn = document.getElementById('submitChapter1QuizBtn');

  if (toggleBtn && quizDiv) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      quizDiv.classList.toggle('hidden');
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      evaluateChapter1Quiz();
    });
  }
}
