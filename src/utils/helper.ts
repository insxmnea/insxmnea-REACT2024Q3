const truncate = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num).trim() + "...";
  } else {
    return str;
  }
};

export { truncate };
