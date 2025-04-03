
import * as React from "react"

// Mobile breakpoint set to 768px (md) for better responsive behavior
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    // More efficient check with debouncing
    let timeoutId: number | null = null;
    
    const checkMobile = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, 100); // 100ms debounce
    }
    
    // Run on mount
    checkMobile()
    
    // Create listener for resize events
    window.addEventListener("resize", checkMobile)
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile)
      if (timeoutId) window.clearTimeout(timeoutId);
    }
  }, [])

  return isMobile
}
