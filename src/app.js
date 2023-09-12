import { createRoot } from 'react-dom/client';
import Main from './Main.tsx';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<Main />);
