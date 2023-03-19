import './ClientFooter.scss'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import TerminalIcon from '@mui/icons-material/Terminal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import Container from '@mui/material/Container'
import { IconMERN } from '../../assets/svg/IconMERN'
import { ClientSocialMedia } from './ClientSocialMedia'
import { NewsletterForm } from '../forms/NewsletterForm'

const technologiesList = [
  ['Javascript', 'Typescript', 'HTML', 'CSS', 'Git'],
  ['React', 'Express', 'SASS', 'PostgreSQL', 'MongoDB']
]

export function ClientFooter (): JSX.Element {
  return (
    <Container maxWidth='md'>
      <Grid container rowSpacing={{ xs: 1, sm: 2 }} columnSpacing={3} className='webfooter-main'>
        {/* INFO SIDE */}
        <Grid xs={12} sm={12} md={4} className='webfooter-box-info'>
          <IconMERN className='logo' />
          <Typography
            component='p'
            variant='caption'
            color='white'
            align='justify'
            sx={{ mt: 2, mb: 1, lineHeight: '1rem', opacity: '0.7' }}
          >
            Enjoy the wonders that the world of web development offers, you can create projects as challenging as they are eye-catching as well as the one you are seeing right now.
          </Typography>
          <ClientSocialMedia className='info-social' />
        </Grid>

        {/* TECHNOLOGIES SIDE */}
        <Grid xs={12} sm={6} md={4} className='webfooter-box-technologies'>
          <Typography
            component='p'
            variant='h6'
            color='white'
            align='left'
            sx={{ mt: 1, mb: 1, fontSize: '1rem', display: 'flex', alignItems: 'center' }}
          >
            <TerminalIcon sx={{ mr: 1 }} />
            TECHNOLOGIES
          </Typography>
          <Typography
            component='div'
            variant='caption'
            color='white'
            align='center'
            className='technologies-side'
          >
            <List dense className='technologies-sideleft'>
              {
                technologiesList[0].map((text) => (
                  <ListItem key={text} sx={{ p: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: '23%', m: 0, ' svg': { fontSize: '1.1rem' } }}
                    >
                      <KeyboardDoubleArrowRightIcon
                        sx={{ color: 'white', opacity: '0.8' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ my: '0.08rem', ' span': { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                ))
              }
            </List>
            <List dense className='technologies-sideright'>
              {
                technologiesList[1].map((text) => (
                  <ListItem key={text} sx={{ p: 0 }}>
                    <ListItemIcon
                      sx={{ minWidth: '23%', m: 0, ' svg': { fontSize: '1.1rem' } }}
                    >
                      <KeyboardDoubleArrowRightIcon
                        sx={{ color: 'white', opacity: '0.8' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ my: '0.08rem', ' span': { fontSize: '0.8rem' } }}
                    />
                  </ListItem>
                ))
              }
            </List>
          </Typography>
        </Grid>

        {/* NEWSLETTER SIDE */}
        <Grid xs={12} sm={6} md={4}>
          <Typography
            component='p'
            variant='h6'
            color='white'
            align='left'
            sx={{ mt: 1, mb: 1, fontSize: '1rem', display: 'flex', alignItems: 'center' }}
          >
            <MarkEmailReadIcon sx={{ mr: 1 }} />
            NEWSLETTER
          </Typography>
          <NewsletterForm />
        </Grid>

        {/* COPYRIGHT SIDE */}
        <Grid xs={12} sm={12} md={12} className='webfooter-lastbox'>
          <Typography variant='body2' color='white' align='center'>
            {'Copyright © '}
            {new Date().getFullYear()}
            {' ALL RIGHTS RESERVED'}
          </Typography>
          <Typography variant='body2' color='white' align='center'>
            S.U.  |  FULLSTACK DEVELOPER
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
