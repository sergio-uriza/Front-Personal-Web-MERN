import { GetMyUserType } from '../../services/types/api-res'

type PropsType = {
  loggedUser: GetMyUserType | null
}

export function WelcomeAdminPage ({ loggedUser }: PropsType): JSX.Element {
  return (
    <div>
      Welcome
      {loggedUser != null
        ? ` ${loggedUser.firstname} ${loggedUser.lastname}`
        : null
      }
      , has administrative control of the entire application through the tools provided in this section.
    </div>
  )
}
