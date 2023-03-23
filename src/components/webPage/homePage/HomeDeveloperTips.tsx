import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CodeIcon from '@mui/icons-material/Code'
import PsychologyIcon from '@mui/icons-material/Psychology'
import LoopIcon from '@mui/icons-material/Loop'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import TranslateIcon from '@mui/icons-material/Translate'

const tipsList = [
  {
    name: 'tipOne',
    icon: AccessTimeIcon,
    title: 'Spend time on the fundamentals',
    description: 'The fundamentals of programming are a basic subject in the field of computer engineering and with it you will learn the procedure to develop the cleanest codes, through the use of good practices.'
  },
  {
    name: 'tipTwo',
    icon: CodeIcon,
    title: 'Write code manually',
    description: 'It is important to review each line of your code on paper before running it on the computer. This habit improves logical thinking and makes learning levels easier and faster.'
  },
  {
    name: 'tipThree',
    icon: PsychologyIcon,
    title: 'Practice and think different',
    description: 'Your attitude is decisive. Like everything in life, practice is essential and starting to write many lines of code each week will help you in the process. Practice will become you master the art of coding.'
  },
  {
    name: 'tipFour',
    icon: LoopIcon,
    title: 'Get organized and create a habit',
    description: 'It is said that it takes about 21 days on average to establish a habit in your daily life. So try to keep up with your work and keep track of your progress.'
  },
  {
    name: 'tipFive',
    icon: IntegrationInstructionsIcon,
    title: 'Create a portfolio of work',
    description: 'Any personal project in which you have used your creativity and professional skills. This will build confidence in those who see your portfolio to be able to entrust you with jobs that require work experience.'
  },
  {
    name: 'tipSix',
    icon: TranslateIcon,
    title: 'Improve your English skills',
    description: 'Many programs are configured only in this language, so writing and speaking in English becomes extremely necessary. In addition, work teams usually communicate using this language.'
  }
]

export function HomeDeveloperTips (): JSX.Element {
  return (
    <Container maxWidth='md' sx={{ textAlign: 'center', mt: 2, mb: 5 }}>
      <h2
        style={{ textAlign: 'center', paddingTop: '1rem', marginBottom: '0' }}
      >
        DEVELOPER TIPS
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
        Review these suggestions that can help you improve your learning process
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
          tipsList?.map((tip) => (
            <Card
              key={tip.name}
              sx={{
                width: { xs: '80%', sm: '31.5%' },
                minWidth: '152px',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'transparent',
                boxShadow: '0 0 10px 2px rgb(0 0 0 / 75%)'
              }}
            >
              <CardContent
                sx={{
                  flexGrow: '1',
                  p: { xs: '1.4rem 1.6rem !important', sm: '1rem 0.8rem !important' }
                }}
              >
                <Typography
                  component='p'
                  variant='body2'
                  sx={{ m: 0, color: 'white', textAlign: 'center' }}
                >
                  <tip.icon
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '2.5rem', md: '3.1rem' },
                      color: 'white'
                    }} />
                </Typography>
                <Typography
                  component='p'
                  gutterBottom
                  variant='body1'
                  sx={{
                    maxWidth: '9.2rem',
                    mx: 'auto',
                    textAlign: 'center',
                    lineHeight: '1.1rem',
                    fontWeight: 'bold',
                    color: 'white',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '4'
                  }}
                >
                  {tip.title}
                </Typography>
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
                  {tip.description}
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </Box>
    </Container>
  )
}
