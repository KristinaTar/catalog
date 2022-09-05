const NUMBERS = "0123456789";

export function getFirstNumber(srt: string): number {
  let res = "";
  let lastIndex = -1;

  for (let i = 0; i < srt.length; i++) {
    if (!isNaN(Number(srt[i])) || srt[i] === ".") {
      if (res.includes(".")) {
        break;
      }
      res += srt[i];
      lastIndex = i;
    } else if (lastIndex !== -1 && i > lastIndex + 1) {
      break;
    }
  }

  return Number(res);
}
