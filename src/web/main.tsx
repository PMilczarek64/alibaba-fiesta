import { createRoot } from 'react-dom/client';
import.meta.glob('./css/**/*.css', { eager: true });

createRoot(document.getElementById('root')!).render(<h1>Alibaba project</h1>);
