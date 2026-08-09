import { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '4140 Parker Rd. Allentown, New Mexico 31134' },
  ]);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Addresses</h1>
        <Button size="sm" onClick={() => setOpen(true)}>Add Address</Button>
      </div>
      <div className="space-y-3">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-lg border border-gray-100 p-4">
            <p className="text-small font-medium text-gray-900">{a.label}</p>
            <p className="text-small text-gray-400">{a.address}</p>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add Address">
        <div className="space-y-3">
          <Input label="Label" placeholder="Home / Work" />
          <Input label="Address" />
          <Button
            className="w-full"
            onClick={() => {
              setAddresses((prev) => [...prev, { id: prev.length + 1, label: 'New Address', address: '—' }]);
              setOpen(false);
              toast.success('Address added');
            }}
          >
            Save Address
          </Button>
        </div>
      </Modal>
    </div>
  );
}
