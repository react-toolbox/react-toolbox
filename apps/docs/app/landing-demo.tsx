'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  IconButton,
  Input,
  Slider,
  Snackbar,
  Switch,
} from 'react-toolbox';

export default function LandingDemo() {
  const [name, setName] = useState('Weekend notes');
  const [minutes, setMinutes] = useState(45);
  const [quiet, setQuiet] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [notification, setNotification] = useState('');

  const reset = () => {
    setName('Weekend notes');
    setMinutes(45);
    setQuiet(true);
    setFavorite(false);
    setNotification('A fresh start. Make it yours.');
  };

  return (
    <figure className="m-0 mx-auto w-full max-w-md min-w-0" aria-label="Interactive Material Design example">
      <div className="relative pt-6 pr-4 pb-4 sm:pr-6">
        <div className="absolute inset-0 bottom-12 left-8 rounded-toolbox bg-toolbox-primary/8" aria-hidden="true" />
        <Card className="relative">
          <CardTitle
            className="pr-16 toolbox-desktop:pr-20"
            title="Make time for an idea."
            subtitle="A little space for your next big thing."
          />
          <CardText>
            <Input label="Project name" value={name} onChange={setName} />
            <div className="mt-4">
              <div className="flex items-baseline justify-between gap-4 text-xs leading-4 text-toolbox-text-secondary">
                <span id="focus-duration-label">Focus time</span>
                <span className="font-medium text-toolbox-primary" aria-live="polite">
                  {minutes} minutes
                </span>
              </div>
              <Slider
                aria-labelledby="focus-duration-label"
                min={15}
                max={90}
                step={15}
                value={minutes}
                onChange={setMinutes}
              />
            </div>
            <Switch
              className="m-0 flex min-h-12 items-center gap-4"
              theme={{ input: 'absolute', on: 'mt-0 shrink-0', off: 'mt-0 shrink-0', text: 'p-0' }}
              label="Do not disturb"
              checked={quiet}
              onChange={setQuiet}
            />
          </CardText>
          <CardActions className="toolbox-desktop:px-4">
            <Button
              primary
              label="Start a session"
              onClick={() =>
                setNotification(
                  `${minutes} minutes for ${name.trim() || 'your next idea'}. ${quiet ? 'Distractions off.' : 'Make yourself at home.'}`,
                )
              }
            />
            <Button label="Reset" onClick={reset} />
          </CardActions>
          <IconButton
            className="absolute top-4 right-2 toolbox-desktop:right-4"
            icon={favorite ? 'favorite' : 'favorite_border'}
            accent={favorite}
            aria-label={favorite ? 'Remove project from favorites' : 'Favorite this project'}
            aria-pressed={favorite}
            onClick={() => setFavorite((current) => !current)}
          />
        </Card>
      </div>
      <figcaption className="mt-4 text-center text-xs leading-4 text-toolbox-text-secondary">
        Real components. Try them out.
      </figcaption>
      <Snackbar
        active={Boolean(notification)}
        label={notification}
        timeout={4500}
        onTimeout={() => setNotification('')}
      />
    </figure>
  );
}
