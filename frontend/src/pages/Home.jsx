import Categories from '../components/Categories'
import FeaturedServices from '../components/FeaturedServices'
import AboutSection from '../components/AboutSection'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <main>
      <Categories />
      <FeaturedServices />
      <AboutSection />
      <WhyChoose />
      <Testimonials />
    </main>
  )
}