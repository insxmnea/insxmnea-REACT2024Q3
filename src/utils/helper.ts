const truncate = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num).trim() + "...";
  } else {
    return str;
  }
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export { truncate, range };
