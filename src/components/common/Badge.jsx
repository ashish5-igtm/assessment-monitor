import { getStatusBadgeColor } from '../../utils/helpers';

export default function Badge({ status, children }) {
  const colorClass = getStatusBadgeColor(status);
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {children || status}
    </span>
  );
}
