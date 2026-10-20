'use client';
import { useState } from 'react';
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'react-toolbox/slider';

export default function SliderComposition() {
  const [range, setRange] = useState([16, 26]);
  return (
    <div className="flex flex-wrap items-center gap-12">
      <div className="w-64 max-w-full">
        <p className="text-toolbox-body">
          Temperature: {range[0]}–{range[1]} °C
        </p>
        <SliderRoot
          name="temperature"
          value={range}
          onValueChange={setRange}
          min={0}
          max={40}
          minStepsBetweenThumbs={2}
        >
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb aria-label="Minimum temperature" />
          <SliderThumb aria-label="Maximum temperature" />
        </SliderRoot>
      </div>
      <SliderRoot orientation="vertical" defaultValue={[50]} className="h-40">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb aria-label="Volume" />
      </SliderRoot>
    </div>
  );
}
