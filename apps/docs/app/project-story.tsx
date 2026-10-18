'use client';

import { useRef } from 'react';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'react-toolbox/dialog';
import styles from './project-story.module.css';

export default function ProjectStory() {
  const story = useRef<HTMLDivElement>(null);
  return (
    <DialogRoot>
      <DialogTrigger className="inline-flex min-h-toolbox-touch cursor-pointer items-center font-medium hover:text-toolbox-primary focus-visible:outline-2 focus-visible:outline-offset-4">
        What is this?
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className={styles.overlay} />
        <DialogContent
          ref={story}
          className={`${styles.story} translate-none`}
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            /** Start with the story itself; Tab reveals focus on the first control. */
            event.preventDefault();
            story.current?.focus({ preventScroll: true });
          }}
        >
          <div className={styles.page}>
            <div className={styles.header}>
              <span>React Toolbox / A personal note</span>
              <DialogClose className={styles.close} aria-label="Close project story">
                [ Close ]
              </DialogClose>
            </div>
            <div className={styles.body}>
              <div>
                <p className={styles.eyebrow}>Est. 2015 — revisited today</p>
                <DialogTitle className={styles.title}>
                  Some things
                  <br />
                  are worth
                  <br />
                  coming back to.
                </DialogTitle>
              </div>
              <div className={styles.letter}>
                <p>I made React Toolbox in 2015. It opened doors and helped me get to where I am today.</p>
                <p>
                  Watching it slowly fall out of date never felt right. A project that had given me so much was sitting
                  there, frozen in time.
                </p>
                <p>
                  With AI helping with the work, coming back to it finally felt possible. So I modernized the code and
                  kept the design that made it what it was.
                </p>
                <p>
                  This is a tribute. A project with no grand ambitions, just a little care for something that mattered.
                </p>
                <a className={styles.signature} href="https://javivelasco.com">
                  Javi Velasco
                </a>
              </div>
            </div>
            <div className={styles.footer}>
              <span>A small piece of the web, cared for.</span>
              <DialogClose className={styles.close}>[ Back to Material ]</DialogClose>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
