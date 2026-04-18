import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import { ClickTimer } from '../../../features/refExamples/ClickTimer';

export const DemoPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 16 }}>
      <h1 className="header-title">Demo page</h1>

      <h2 style={{ marginTop: 18 }}>Portal Modal</h2>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={open}
        title="Portal modal"
        onClose={() => setOpen(false)}
      >
        <p>
          This modal is rendered via <b>ReactDOM.createPortal</b> into #modal-root.
        </p>
        <p>
          Close via: ✕ button, overlay click, or ESC. Focus goes to close button on open and returns to trigger on close.
        </p>
      </Modal>

      <h2 style={{ marginTop: 18 }}>useRef example (no re-render)</h2>
      <ClickTimer />
      <p style={{ marginTop: 8, opacity: 0.7 }}>
        Open DevTools Console to see logs (time difference + clicks).
      </p>

      <h2 style={{ marginTop: 18 }}>React 19 hooks</h2>
      <p style={{ opacity: 0.7 }}>
        Add your React 19 examples here (useActionState / useOptimistic). 
        See: src/features/react19Examples (created in this solution).
      </p>
    </div>
  );
};
