import { Author } from '@/types';
import Image from 'next/image';
import * as React from 'react';

interface ProfileProps extends Author {}

const Profile: React.FC<ProfileProps> = ({ name, title, profilePicture }) => {
  return (
    <div
      id={`profile-${name.toLowerCase().replace(' ', '-')}`}
      className="flex flex-row items-center gap-2"
    >
      <div
        className="flex h-[48px] w-[48px]"
        style={{
          position: 'relative',
        }}
      >
        <Image
          src={profilePicture.url}
          alt={profilePicture.description}
          fill
          style={{
            objectFit: 'cover',
            borderRadius: '100px',
          }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-body1 text-label-light-primary">{name}</p>
        <p className="text-small text-label-light-secondary">{title}</p>
      </div>
    </div>
  );
};

export default Profile;
