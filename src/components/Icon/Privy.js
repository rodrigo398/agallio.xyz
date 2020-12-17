import { Icon } from '@chakra-ui/react'

export default function PrivyIcon() {
  return (
    <Icon viewBox="0 0 48 31">
      <svg
        width={48}
        height={31}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.623 25.836a14.962 14.962 0 0010.61 4.393c4.145 0 7.896-1.679 10.611-4.393L47.067 4.622A14.962 14.962 0 0036.456.23a14.962 14.962 0 00-10.611 4.393A14.962 14.962 0 0015.234.23C6.329.229.694 6.922.229 15.451a14.95 14.95 0 004.394 10.385z"
          fill="#E42E2C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.944 4.64A15.017 15.017 0 0015.292.23C6.352.229.696 6.949.229 15.516c.06 4.07 1.734 7.75 4.411 10.427L25.944 4.641z"
          fill="url(#prefix__paint0_linear)"
        />
        <defs>
          <linearGradient
            id="prefix__paint0_linear"
            x1={2.078}
            y1={17.609}
            x2={17.837}
            y2={33.823}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopOpacity={0.01} />
            <stop offset={0.103} stopOpacity={0.054} />
            <stop offset={0.197} stopOpacity={0.106} />
            <stop offset={0.303} stopOpacity={0.192} />
            <stop offset={0.387} stopOpacity={0.245} />
            <stop offset={1} />
          </linearGradient>
        </defs>
      </svg>
    </Icon>
  )
}
