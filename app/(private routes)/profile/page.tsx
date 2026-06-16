import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import Image from 'next/image';
import { Metadata } from 'next';

type Props = {
  params: Promise<Record<string, string>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;

  try {
    const user = await getMe();
    const userName = user.username || 'User';

    const title = `${userName} | NoteHub`;
    const description = `Personal profile of ${userName} | NoteHub`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.com/profile/`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: `${userName}'s personal profile`,
          },
        ],
        type: 'profile',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch (error) {
    return {
      title: 'Profile | NoteHub',
      description: 'Personal profile | NoteHub',
    };
  }
}

const Profile = async () => {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
