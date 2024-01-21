import { useState } from 'react';

const useRandomColor = () => {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  const [currentColor, setCurrentColor] = useState<string>('');

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  setCurrentColor(color);
  return currentColor;
};

export default useRandomColor;
