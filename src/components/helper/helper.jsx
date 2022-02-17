const loadingSVG = (
  <svg
    style={{
      margin: "auto",
      display: "block",
      shapeRendering: "auto",
    }}
    width="31px"
    height="31px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g>
      <circle cx="60" cy="50" r="4" fill="#aaa">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="95;35"
          keyTimes="0;1"
          begin="-0.7303000000000001s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0;1;1"
          keyTimes="0;0.2;1"
          begin="-0.7303000000000001s"
        ></animate>
      </circle>
      <circle cx="60" cy="50" r="4" fill="#aaa">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="95;35"
          keyTimes="0;1"
          begin="-0.3597s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0;1;1"
          keyTimes="0;0.2;1"
          begin="-0.3597s"
        ></animate>
      </circle>
      <circle cx="60" cy="50" r="4" fill="#aaa">
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="95;35"
          keyTimes="0;1"
          begin="0s"
        ></animate>
        <animate
          attributeName="fill-opacity"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0;1;1"
          keyTimes="0;0.2;1"
          begin="0s"
        ></animate>
      </circle>
    </g>
    <g transform="translate(-15 0)">
      <path
        d="M50 50L20 50A30 30 0 0 0 80 50Z"
        fill="#0051a2"
        transform="rotate(90 50 50)"
      ></path>
      <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#ddd">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0 50 50;45 50 50;0 50 50"
          keyTimes="0;0.5;1"
        ></animateTransform>
      </path>
      <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#ddd">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.9174311926605504s"
          values="0 50 50;-45 50 50;0 50 50"
          keyTimes="0;0.5;1"
        ></animateTransform>
      </path>
    </g>
  </svg>
);

export { loadingSVG };
