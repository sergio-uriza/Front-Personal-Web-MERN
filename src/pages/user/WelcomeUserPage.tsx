import { GetMyUserType } from '../../services/types/api-res'

type PropsType = {
  loggedUser: GetMyUserType | null
}

export function WelcomeUserPage ({ loggedUser }: PropsType): JSX.Element {
  return (
    <div>
      Welcome
      {loggedUser != null
        ? ` ${loggedUser.firstname} ${loggedUser.lastname}`
        : null
      }
      , from here you can customize your account information, you can also publish, edit and delete your own personal blogs.
    </div>
  )
}
