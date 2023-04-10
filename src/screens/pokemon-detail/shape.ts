import { Skia, vec } from '@shopify/react-native-skia';

type Degree = number;
type Rad = number;
const toRad = (degree: Degree): Rad => (degree * Math.PI) / 180;

export const calculatePolygonPos = (
  length: number,
  origin: number,
  deg: Degree,
) => ({
  x: origin + Math.sin(toRad(deg % 360)) * length,
  y: origin - Math.cos(toRad(deg % 360)) * length,
});

// gon = 6 -> Hexagon
export const createPolygonPoints = (
  length: number,
  origin: number,
  gon: number,
) => {
  return Array(gon + 1)
    .fill(0)
    .map((_, idx) => {
      const pos = calculatePolygonPos(length, origin, (360 / gon) * idx);
      return vec(pos.x, pos.y);
    });
};

export type StatusArr = Array<number>;
export const createStatusPolygonPath = (
  length: StatusArr,
  origin: number,
  timing: number,
  gon: number,
) => {
  return length.reduce((current, l, idx) => {
    const pos = calculatePolygonPos(l * timing, origin, (360 / gon) * idx);
    current.lineTo(pos.x, pos.y);
    return current;
  }, Skia.Path.Make());
};

export const createStatusPolygonPoints = (
  length: StatusArr,
  origin: number,
  timing: number,
  gon: number,
) => {
  return length.fill(0).map((l, idx) => {
    const pos = calculatePolygonPos(l * timing, origin, (gon / 60) * idx);
    return vec(pos.x, pos.y);
  });
};
