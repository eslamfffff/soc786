
import * as React from "react"

// Reduced mobile breakpoint to better target phones
const MOBILE_BREAKPOINT = 640

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
