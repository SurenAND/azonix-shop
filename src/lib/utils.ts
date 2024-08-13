export function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}`;
}

export function createIdByDate(date: string) {
  return new Date(date)
    .getTime()
    .toString()
    .split('')
    .reverse()
    .slice(0, 3)
    .join('');
}
