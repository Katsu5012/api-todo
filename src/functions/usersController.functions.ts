export function zeroPaddingDate(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${('0000' + year).slice(-4)}-${('00' + month).slice(-2)}-${(
    '00' + day
  ).slice(-2)}`;
}
