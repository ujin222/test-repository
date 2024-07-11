function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}

export default function generatecolorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}
