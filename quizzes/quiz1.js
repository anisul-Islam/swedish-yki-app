// @ts-nocheck
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
    q11: 'b',
    q12: 'b',
    q13: 'a',
    q14: 'c',
    q15: 'b',
    q16: 'b',
    q17: 'jag har två barn',
    q18: 'a',
    q19: 'b',
    q20: 'hon har en bror',
  };

  const userAnswers = {};
  for (let i = 1; i <= 20; i++) {
    const key = `q${i}`;
    const el = form[key];
    if (el?.type === 'radio' || el?.type === 'select-one') {
      userAnswers[key] = form[key]?.value?.toLowerCase();
    } else {
      userAnswers[key] = form[key]?.value.trim().toLowerCase();
    }
  }

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

  resultDiv.innerHTML = feedbackHTML;

  const toggleAnswersBtn = document.getElementById('toggleAnswersBtn');
  const answerList = document.getElementById('answerList');
  toggleAnswersBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (answerList) {
      answerList.style.display =
        answerList.style.display === 'none' ? 'block' : 'none';
    }
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
