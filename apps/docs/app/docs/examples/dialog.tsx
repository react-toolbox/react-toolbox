'use client';
import { useState } from 'react';
import { Button } from 'react-toolbox/button';
import { Input } from 'react-toolbox/input';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from 'react-toolbox/dialog';

export default function DialogComposition() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Javi');
  return (
    <div className="space-y-4">
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button raised primary>
            Edit profile
          </Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogBody className="flex flex-col gap-5">
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Change the name shown to your teammates.</DialogDescription>
              <form
                id="profile-composition"
                onSubmit={(event) => {
                  event.preventDefault();
                  setName(String(new FormData(event.currentTarget).get('name')));
                  setOpen(false);
                }}
              >
                <Input label="Display name" name="name" defaultValue={name} required />
              </form>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button primary type="submit" form="profile-composition">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <p className="text-toolbox-body">
        Current name: <output>{name}</output>
      </p>
    </div>
  );
}
