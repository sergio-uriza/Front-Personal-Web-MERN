import { HomeBanner } from '../../components/webPage/homePage/HomeBanner'
import { HomeCourses } from '../../components/webPage/homePage/HomeCourses'
import { HomeDeveloperTips } from '../../components/webPage/homePage/HomeDeveloperTips'
import { HomeDevelopmentAreas } from '../../components/webPage/homePage/HomeDevelopmentAreas'

export function HomePage (): JSX.Element {
  return (
    <>
      {/* BANNER SIDE */}
      <HomeBanner />

      {/* CONTENT SIDE */}
      <HomeCourses />

      {/* TIPS SIDE */}
      <HomeDeveloperTips />

      {/* AREAS SIDE */}
      <HomeDevelopmentAreas />
    </>
  )
}
