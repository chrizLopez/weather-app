export const convertDate12HrFormat = (date: Date) => {
  let hours = date.getHours();
  const currentHours = new Date().getHours();

  if (currentHours === hours) return 'Now';

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours} ${ampm}`;
}