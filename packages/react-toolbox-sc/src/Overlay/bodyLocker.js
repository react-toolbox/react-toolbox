let totalActivePortals = 0;

function lockDocumentBody() {
  document.body.style.overflow = 'hidden';
}

function unlockDocumentBody() {
  document.body.style.overflow = null;
}

export function addPortal() {
  if (totalActivePortals === 0) {
    lockDocumentBody();
  }
  totalActivePortals += 1;
}

export function removePortal() {
  totalActivePortals -= 1;
  if (totalActivePortals === 0) {
    unlockDocumentBody();
  }
}
