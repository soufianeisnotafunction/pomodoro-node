export const SESSION_TYPE = Object.freeze({
  WORK: 'work',
  BREAK: 'break',
});

export const SESSIONS = Object.freeze({
  [SESSION_TYPE.WORK]: {
    label: 'TRAVAIL',
    defaultMinutes: 25,
  },
  [SESSION_TYPE.BREAK]: {
    label: 'PAUSE',
    defaultMinutes: 5,
  },
});

export const WORK_DURATION_CHOICES = [15, 20, 25, 30, 45, 50].map((n) => ({
  name: `${n} min`,
  value: n,
}));

export const BREAK_DURATION_CHOICES = [5, 10, 15].map((n) => ({
  name: `${n} min`,
  value: n,
}));
