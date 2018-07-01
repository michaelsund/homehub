import * as React from 'react'

type Props = {
  color: string,
  height: number,
  width: number
}

const SvgCircle = (props: Props) => (
  <svg height={props.height} width={props.width} xmlns="http://www.w3.org/2000/svg">
    <circle
      cx={props.width / 2}
      cy={props.height / 2}
      r={(props.width / 2) - 10}
      fill={props.color}
    />
  </svg>
)

export default SvgCircle
