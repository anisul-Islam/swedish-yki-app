// @ts-nocheck
export const renderChapterNavigation = (currentChapter) => {
  const container = document.createElement('div');
  container.className = 'quiz-navigation';

  if (currentChapter > 1) {
    const prev = document.createElement('button');
    prev.textContent = '⬅️ Previous Chapter';
    prev.addEventListener('click', () => {
      document.querySelector(`[data-chapter="${currentChapter - 1}"]`)?.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(prev);
  }

  const next = document.createElement('button');
  next.textContent = 'Next Chapter ➡️';
  next.addEventListener('click', () => {
    document.querySelector(`[data-chapter="${currentChapter + 1}"]`)?.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  container.appendChild(next);

  return container;
}
