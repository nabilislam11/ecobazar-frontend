import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getAllUsers, deleteUser } from '../../services/authService';

export default function CustomersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      console.log('Users:', response);

      if (response?.success) {
        setUsers(response.userData || []);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to load customers'
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this customer ?"
    );
    if (!confirm) return;
    try {
      const response = await deleteUser(id);
      toast.success(
        response?.message || 'Customer deleted successfully'
      );

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error('Delete customer error:', error);
      toast.error(
        error.response?.data?.message ||
        'Failed to delete customer'
      );

    }


  }
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-small text-gray-500">
          Manage all registered customers.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No customers found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 text-small font-medium">
                  Name
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Email
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Phone
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-small font-medium">
                  Verification
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-50"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.phoneNumber || 'N/A'}
                  </td>

                  <td className="px-4 py-4">
                    {user.isVerified ? (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">
                        Verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs text-yellow-600">
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {user.isHold ? (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600">
                        On Hold
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.role || 'user'}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                      className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}