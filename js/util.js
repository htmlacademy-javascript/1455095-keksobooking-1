const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export const isEscEvent = (evt) => evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
