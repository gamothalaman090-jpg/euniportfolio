// Reusable hexagon logo mark with "EJ" monogram
// animate=true → draws the hex stroke on mount (for loading screen)
// animate=false → static version (for navbar)

interface LogoIconProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function LogoIcon({ size = 48, animate = false, className = "" }: LogoIconProps) {
  // Regular hexagon circumradius = 45, center = (50, 50), viewBox 0 0 100 100
  // Perimeter ≈ 6 × 45 = 270
  const perim = 270;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EJ logo"
    >
      {/* Hex outline */}
      <polygon
        points="95,50 72.5,88.97 27.5,88.97 5,50 27.5,11.03 72.5,11.03"
        fill="none"
        stroke="#64FFDA"
        strokeWidth="2"
        strokeLinejoin="round"
        style={
          animate
            ? {
                strokeDasharray: perim,
                strokeDashoffset: perim,
                animation: "drawHex 1s cubic-bezier(0.65,0,0.35,1) forwards 0.4s",
              }
            : undefined
        }
      />

      {/* Monogram "EJ" */}
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#64FFDA"
        fontFamily="'Fira Code', 'Courier New', monospace"
        fontSize="22"
        fontWeight="500"
        letterSpacing="1"
        style={
          animate
            ? {
                opacity: 0,
                animation: "fadeInText 0.5s ease forwards 1.5s",
              }
            : { opacity: 1 }
        }
      >
        EJ
      </text>
    </svg>
  );
}
