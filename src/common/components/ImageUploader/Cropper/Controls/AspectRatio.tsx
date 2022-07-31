import React from 'react';
import { Select } from '@chakra-ui/react';

const ASPECT_RATIOS = [{ '1:1': 1 }, { '4:5': 0.8 }, { '19:1': 1.91 }];

interface AspectRatioSelectProps {
  setAspectRatio: (num: number) => void;
}

export const AspectRatio = ({ setAspectRatio }: AspectRatioSelectProps) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAspectRatio(parseFloat(e.target.value));
  };
  return (
    <Select defaultValue={'1'} size={['sm', 'md']} onChange={handleSelect}>
      {ASPECT_RATIOS.map((ob) => {
        const [label, value] = Object.entries(ob)[0];
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};
