
interface Props {
  text: String
}
const PageCardHeading = ({ text }: Props) => {
  return (

    <h1 className="text-5xl font-extrabold dark:text-black mb-3 text-center">{text}</h1>

  )
}

export default PageCardHeading