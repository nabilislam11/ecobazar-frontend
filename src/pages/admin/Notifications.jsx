import { useEffect, useState } from 'react';
import * as notificationService from '../../services/notificationService';
import Loader from '../../components/common/Loader';

const icons = { order: '🛒', stock: '⚠️', review: '⭐', customer: '👤' };

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(null);
  const load = () => notificationService.getNotifications().then(setNotifications);
  useEffect(() => { load(); }, []);
  if (!notifications) return <Loader />;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
      <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white">
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => notificationService.markAsRead(n.id).then(load)}
            className={`flex w-full items-start gap-3 p-4 text-left hover:bg-gray-50 ${!n.read ? 'bg-success/5' : ''}`}
          >
            <span className="text-lg">{icons[n.type]}</span>
            <div>
              <p className="text-small text-gray-900">{n.message}</p>
              <p className="text-tiny text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
