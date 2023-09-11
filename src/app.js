import { createRoot } from 'react-dom/client';
import Canvas from './Canvas.tsx';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<Canvas />);
