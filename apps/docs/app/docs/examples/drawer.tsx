'use client';
import { Button } from 'react-toolbox/button';
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from 'react-toolbox/drawer';
import DialogComposition from './dialog';

export default function DrawerComposition() {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button raised primary>
          Open account drawer
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent side="right" className="gap-6 p-6">
          <DrawerTitle>Your account</DrawerTitle>
          <DrawerDescription>Manage your profile without leaving this page.</DrawerDescription>
          <DialogComposition />
          <DrawerClose asChild>
            <Button className="mt-auto">Close account drawer</Button>
          </DrawerClose>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
}
