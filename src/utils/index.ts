/**
 * Returns the initials from username
 */
export function getInitials(username: string) {
  if (!username) return '';
  return username
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .join('')
    .slice(0, 2);
}