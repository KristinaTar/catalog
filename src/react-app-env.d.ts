/// <reference types="react-scripts" />

type Good = {
  id: number,
  title: string,
  description: {
    diagonal?: string,
    brightness?: string,
    resolution?: string,
  },
  comments: number,
  comments_mark: number,
  price: number,
  image: string,
  brand: string,
}

type Filter = {
  diagonal: number;
  brightness: number;
  resolution: string;
  matrixType: string;
  brand: string;


}
