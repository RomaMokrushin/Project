export const convertDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
};
