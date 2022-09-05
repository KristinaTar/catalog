/// <reference types="react-scripts" />

type Good = {
  id: number,
  title: string,
  href: string,
  description: {
    diagonal: string,
    brightness: string,
    resolution: string,
    matrixType: string,
  },
  comments: number,
  comments_mark: number,
  price: number,
  image: string,
  brand: string,
}

type Filter = {
  priceMin: number;
  priceMax: number;
  diagonalMin: number;
  diagonalMax: number;
  brightnessMin: number;
  brightnessMax: number;
  resolution: string[];
  matrixType: string[];
  brand: string[];
}
