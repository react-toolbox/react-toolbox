Object.defineProperty(window, 'requestAnimationFrame', { value: fn => fn() });
