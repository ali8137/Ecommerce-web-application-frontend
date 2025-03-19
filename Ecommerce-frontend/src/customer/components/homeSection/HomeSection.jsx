import MemorizedHomeSectionCarousel from './MemorizedHomeSectionCarousel'

const HomeSection = () => {
  // TODO: the below list must be better made dynamic by fetching the categories from the backend, and then pass there ids to the below components

  return (
    <section>
      <MemorizedHomeSectionCarousel categoryId={29} />
      {/* TODO: developer-constraint: the values of the categoryId are based on the values of the categories in the database  */}
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
      <MemorizedHomeSectionCarousel categoryId={10} />
    </section>
  )
}

export default HomeSection
