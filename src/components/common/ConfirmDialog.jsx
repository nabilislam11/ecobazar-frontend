import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Are you sure?', description }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {description && <p className="mb-6 text-small text-gray-700">{description}</p>}
      <div className="flex justify-end gap-3">
        <Button variant="border" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="fill" size="sm" className="!bg-error hover:!bg-error" onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
}
