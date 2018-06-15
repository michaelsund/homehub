import * as React from 'react'

type Props = {
  color: string,
  height: number,
  width: number
}

const SvgRect = (props: Props) => (
  <svg height={props.height} width={props.width} xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0"
      y="0"
      width={props.width}
      height={props.height}
      rx="4"
      ry="4"
      fill={props.color}
    />
  </svg>
)

export default SvgRect
