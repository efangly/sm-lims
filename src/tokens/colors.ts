/**
 * Design Tokens - Color Palette
 * Inspired by ocean and sky pastel tones
 */

export const colors = {
  // Room surfaces
  floor: '#f48fb1',        // Soft sky blue
  backWall: '#f06292',     // Ocean blue
  leftWall: '#7e57c2',     // Lavender
  
  // Furniture - Ocean inspired pastels
  cabinet: {
    primary: '#9575cd',    // Ocean blue pastel
    secondary: '#738ffe',  // Soft steel blue
    tertiary: '#ff8a65',   // Misty blue
  },

  // Interactive elements
  interactive: {
    hover: '#C9E4F5',      // Soft blue highlight
    selected: '#B8D9EE',   // Sky blue highlight
  }
} as const

export type ColorToken = typeof colors
