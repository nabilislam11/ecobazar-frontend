import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import {
  getAllUsers,
  holdUser,
  updateProfile,
  searchUser,
} from '../../services/authService';

export default function CustomersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

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

  // =========================
  // HOLD USER
  // =========================
  const handleHold = async (id) => {
    try {
      const response = await holdUser(id);

      toast.success(
        response?.message || 'User put on hold'
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, isHold: true }
            : user
        )
      );
    } catch (error) {
      console.error('Hold user error:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to hold user'
      );
    }
  };

  // =========================
  // ACTIVE USER
  // =========================
  const handleActive = async (id) => {
    try {
      await updateProfile(id, {
        isHold: false,
      });

      toast.success('User activated successfully');

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, isHold: false }
            : user
        )
      );
    } catch (error) {
      console.error('Activate user error:', error);

      toast.error(
        error.response?.data?.message ||
        'Failed to activate user'
      );
    }
  };

  // =========================
  // SEARCH USER
  // =========================
  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchUsers();
      return
    }
    try {
      setLoading(true);

      const response = await searchUser(searchText);

      console.log('Search result:', response);

      if (response?.success) {
        setUsers(response.userData || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("SERVER RESPONSE:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Failed to search users"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET SEARCH
  // =========================
  const handleReset = () => {
    setSearchText('');
    fetchUsers();
  };

  // =========================
  // FETCH USERS ON PAGE LOAD
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="p-6">
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Customers
        </h1>

        <p className="mt-1 text-small text-gray-500">
          Manage all registered customers.
        </p>
      </div>

      {/* =========================
          SEARCH
      ========================= */}
      <div className="mb-6 flex gap-3">

        <input
          type="text"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          placeholder="Search by name or email..."
          className="w-full max-w-md rounded-md border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <button
          type="button"
          onClick={handleSearch}
          className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border border-gray-200 px-5 py-2 text-sm"
        >
          Reset
        </button>
      </div>

      {/* =========================
          USERS TABLE
      ========================= */}
      {users.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No customers found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

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
                  Verification
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Status
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Role
                </th>

                <th className="px-4 py-3 text-small font-medium">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-50"
                >

                  {/* Name */}
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.email}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.phoneNumber || 'N/A'}
                  </td>

                  {/* Verification */}
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
                    <div className="flex items-center gap-2">

                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="rounded-md bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        title="View customer details"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Hold / Active */}
                      {user.isHold ? (
                        <button
                          type="button"
                          onClick={() => handleActive(user._id)}
                          className="rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-100"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleHold(user._id)}
                          className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                        >
                          Hold
                        </button>
                      )}

                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-4 text-small text-gray-600">
                    {user.role || 'user'}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4">

                    {user.isHold ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleActive(user._id)
                        }
                        className="rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-100"
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          handleHold(user._id)
                        }
                        className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        Hold
                      </button>
                    )}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
          {selectedUser && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedUser(null)}
            >
              <div
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Customer Details
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      View complete information about this customer
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                {/* ================= PROFILE HEADER ================= */}
                <div className="border-b border-gray-100 px-6 py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-xl font-semibold text-green-700">
                        {selectedUser.firstName?.charAt(0)?.toUpperCase() || 'U'}
                        {selectedUser.lastName?.charAt(0)?.toUpperCase() || ''}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {selectedUser.firstName || ''}{' '}
                          {selectedUser.lastName || ''}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex gap-2">
                      {selectedUser.isVerified ? (
                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
                          Verified
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-600">
                          Unverified
                        </span>
                      )}

                      {selectedUser.isHold ? (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                          On Hold
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
                          Active
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* ================= PERSONAL INFORMATION ================= */}
                <div className="px-6 py-6">

                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 gap-5 rounded-xl border border-gray-100 p-5 sm:grid-cols-2">

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        First Name
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.firstName || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Last Name
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.lastName || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Email Address
                      </p>

                      <p className="mt-1 break-all text-sm text-gray-900">
                        {selectedUser.email || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Phone Number
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.phoneNumber || 'N/A'}
                      </p>
                    </div>

                  </div>
                  {/* ================= ACCOUNT INFORMATION ================= */}

                  <h3 className="mb-4 mt-7 text-lg font-semibold text-gray-900">
                    Account Information
                  </h3>

                  <div className="grid grid-cols-1 gap-5 rounded-xl border border-gray-100 p-5 sm:grid-cols-3">

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        User ID
                      </p>

                      <p className="mt-1 break-all text-xs text-gray-900">
                        {selectedUser._id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Role
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                        {selectedUser.role || 'user'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Email Verification
                      </p>

                      <p
                        className={`mt-1 text-sm font-medium ${selectedUser.isVerified
                            ? 'text-green-600'
                            : 'text-yellow-600'
                          }`}
                      >
                        {selectedUser.isVerified
                          ? 'Verified'
                          : 'Not Verified'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Account Status
                      </p>

                      <p
                        className={`mt-1 text-sm font-medium ${selectedUser.isHold
                            ? 'text-red-600'
                            : 'text-green-600'
                          }`}
                      >
                        {selectedUser.isHold
                          ? 'On Hold'
                          : 'Active'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Created At
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.createdAt
                          ? new Date(
                            selectedUser.createdAt
                          ).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Updated At
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {selectedUser.updatedAt
                          ? new Date(
                            selectedUser.updatedAt
                          ).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>

                  </div>

                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex justify-end border-t border-gray-100 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}