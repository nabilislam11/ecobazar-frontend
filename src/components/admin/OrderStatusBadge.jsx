import Badge from '../common/Badge';

const toneMap = {
  'Order received': 'gray',
  Processing: 'warning',
  'On the way': 'warning',
  Delivered: 'success',
  Cancelled: 'error',
};

export default function OrderStatusBadge({ status }) {
  return <Badge tone={toneMap[status] ?? 'gray'}>{status}</Badge>;
}
