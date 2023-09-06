import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'next-auth'
import { FC } from 'react'
import Image from 'next/image'
import { AiOutlineUser } from 'react-icons/ai'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.image}
            alt="Profile Picture"
            referrerPolicy="no-referrer"
            fill
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <AiOutlineUser className="text-secondary" size={24} />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export default UserAvatar
