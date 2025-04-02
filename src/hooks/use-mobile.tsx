
import * as React from "react"

// Mobile breakpoint set to 768px (md) for better responsive behavior with our interactive map
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Run on mount
    checkMobile()
    
    // Create listener for resize events
    window.addEventListener("resize", checkMobile)
    
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return !!isMobile
}
