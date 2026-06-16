'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/lib/api/api';

import css from './EditProfilePage.module.css';

export const EditProfile = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    getMe().then(user => {
      setUsername(user.username ?? '');
      setAvatar(user.avatar);
      setEmail(user.email);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              onChange={handleChange}
              type="text"
              value={username}
              className={css.input}
            />
          </div>
          {error && <p className={css.error}>{error}</p>}

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => {
                router.back();
              }}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
