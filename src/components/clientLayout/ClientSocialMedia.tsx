import './ClientSocialMedia.scss'
import Box from '@mui/material/Box'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import IconButton from '@mui/material/IconButton'
import { SocialMediaLink } from '../../enums/socialMediaLink.enum'

const socialMediaList = [
  {
    name: 'youtube',
    url: SocialMediaLink.YOUTUBE,
    icon: YouTubeIcon,
    className: 'socialmedia-youtube'
  },
  {
    name: 'twitter',
    url: SocialMediaLink.TWITTER,
    icon: TwitterIcon,
    className: 'socialmedia-twitter'
  },
  {
    name: 'facebook',
    url: SocialMediaLink.FACEBOOK,
    icon: FacebookIcon,
    className: 'socialmedia-facebook'
  },
  {
    name: 'linkedin',
    url: SocialMediaLink.LINKEDIN,
    icon: LinkedInIcon,
    className: 'socialmedia-linkedin'
  }
]

type PropsType = {
  className?: string
}

export function ClientSocialMedia (props: PropsType): JSX.Element {
  return (
    <Box component='div' {...props}>
      {
        socialMediaList.map((socialMedia) => (
          <IconButton
            key={socialMedia.name}
            color='inherit'
            component='a'
            href={socialMedia.url}
            target='_blank'
            className={socialMedia.className}
          >
            <socialMedia.icon />
          </IconButton>
        ))
      }
    </Box>
  )
}
