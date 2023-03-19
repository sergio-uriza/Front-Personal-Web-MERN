import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import WebhookIcon from '@mui/icons-material/Webhook'
import AndroidIcon from '@mui/icons-material/Android'
import MemoryIcon from '@mui/icons-material/Memory'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import StorageIcon from '@mui/icons-material/Storage'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'

const developmentAreasList = [
  {
    name: 'areaOne',
    icon: WebhookIcon,
    title: 'Web development',
    description: 'Discipline in charge of the building and maintaining websites involves background work that allows a page to look flawless, run fast, and perform well to allow for the best user experience.'
  },
  {
    name: 'areaTwo',
    icon: AndroidIcon,
    title: 'Mobile development',
    description: 'Discipline in charge of the set of processes involved in writing software or applications for small wireless computing devices, such as smartphones and other portable devices.'
  },
  {
    name: 'areaThree',
    icon: MemoryIcon,
    title: 'Machine learning',
    description: 'Discipline in the field of Artificial Intelligence that, through algorithms, gives computers the ability to identify patterns in massive data. This learning allows computers to perform specific tasks autonomously.'
  },
  {
    name: 'areaFour',
    icon: LeaderboardIcon,
    title: 'Big data analyst',
    description: 'Discipline that through the massive interpretation of data manages to establish appropriate strategies within a company. Therefore, you must know how to collect data as well as analyze it statistically.'
  },
  {
    name: 'areaFive',
    icon: StorageIcon,
    title: 'Database administrator',
    description: 'Discipline responsible for the management, maintenance, performance, reliability and protection of the information in the databases. Also, they are in charge of the improvement and design of new models of these.'
  },
  {
    name: 'areaSix',
    icon: LocalPoliceIcon,
    title: 'Cybersecurity',
    description: 'Discipline in charge of defending computers, servers, mobile devices, electronic systems, networks and data from malicious attacks and strengthening them against possible vulnerabilities.'
  }
]

export function HomeDevelopmentAreas (): JSX.Element {
  return (
    <Container maxWidth='md' sx={{ textAlign: 'center', mt: 2, mb: '5rem' }}>
      <h2
        style={{ textAlign: 'center', paddingTop: '1rem', marginBottom: '0' }}
      >
        AREAS OF DEVELOPMENT
      </h2>
      <h5
        style={{
          textAlign: 'center',
          paddingBottom: '0.5rem',
          marginTop: '0',
          fontWeight: '400',
          color: '#1890ff'
        }}
      >
        These are some of the main areas in the technology sector
      </h5>

      <Box
        component='div'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'space-between' },
          rowGap: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' }
        }}
      >
        {
          developmentAreasList?.map((developmentArea) => (
            <Card
              key={developmentArea.name}
              sx={{
                width: { xs: '80%', sm: '31.5%' },
                minWidth: '152px',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'transparent',
                border: '1px groove white'
              }}
            >
              <CardContent
                sx={{
                  flexGrow: '1',
                  p: { xs: '1.4rem 1.6rem !important', sm: '1rem 0.8rem !important' }
                }}
              >
                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#1890ff',
                      my: 1,
                      width: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                      MinWidth: 45,
                      aspectRatio: '1/1',
                      height: 'auto',
                      fontSize: '28px'
                    }}
                  >
                    <developmentArea.icon
                      sx={{
                        fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
                        color: 'white'
                      }}
                    />
                  </Avatar>
                  <Typography
                    component='p'
                    gutterBottom
                    variant='body1'
                    sx={{
                      maxWidth: '6.5rem',
                      m: '0 0 0 0.5rem',
                      textAlign: 'center',
                      lineHeight: '1.1rem',
                      fontWeight: 'bold',
                      color: '#1890ff',
                      wordBreak: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: '4'
                    }}
                  >
                    {developmentArea.title}
                  </Typography>
                </Box>
                <Typography
                  component='p'
                  variant='caption'
                  color='text.secondary'
                  sx={{
                    textAlign: 'justify',
                    lineHeight: '0.9rem',
                    color: 'white',
                    opacity: '0.6',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '10'
                  }}
                >
                  {developmentArea.description}
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </Box>
    </Container>
  )
}
