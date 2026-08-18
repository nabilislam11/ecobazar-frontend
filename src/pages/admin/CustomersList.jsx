import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

                  {/* Hold / Active Status */}
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
        </div>
      )}
    </div>
  );
}