export default function ExternalLink(props) {
  return (
    <a
      className={`hover:underline ${props.className}`}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  )
}
