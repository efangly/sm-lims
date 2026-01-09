/**
 * Design Tokens - Color Palette
 * Soft pastel color scheme for 3D room visualization
 */

export const colors = {
  // Room surfaces
  floor: '#F5E6D3',        // Warm cream
  backWall: '#E8DDD4',     // Soft taupe
  leftWall: '#DFE8E6',     // Pale sage
  
  // Furniture - Soft pastel palette
  cabinet: {
    primary: '#B8D4E3',    // Soft sky blue
    secondary: '#D4C4E3',  // Lavender mist
    tertiary: '#C8E3C4',   // Mint green
  },

  // Interactive elements
  interactive: {
    hover: '#E8F4F8',      // Soft blue highlight
    selected: '#F0E8F8',   // Soft lavender highlight
  }
} as const

export type ColorToken = typeof colors
