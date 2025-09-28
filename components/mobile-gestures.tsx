"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface TouchPoint {
  x: number
  y: number
  time: number
}

interface SwipeDirection {
  direction: 'up' | 'down' | 'left' | 'right' | 'none'
  distance: number
  velocity: number
}

interface MobileGesturesProps {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  onPinch?: (scale: number) => void
  children: React.ReactNode
  className?: string
  swipeThreshold?: number
  velocityThreshold?: number
  longPressDelay?: number
}

export function MobileGestures({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTap,
  onLongPress,
  onPinch,
  children,
  className = "",
  swipeThreshold = 50,
  velocityThreshold = 0.3,
  longPressDelay = 500
}: MobileGesturesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null)
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLongPressing, setIsLongPressing] = useState(false)

  const getTouchPoint = (touch: Touch): TouchPoint => ({
    x: touch.clientX,
    y: touch.clientY,
    time: Date.now()
  })

  const getSwipeDirection = (start: TouchPoint, end: TouchPoint): SwipeDirection => {
    const deltaX = end.x - start.x
    const deltaY = end.y - start.y
    const deltaTime = end.time - start.time
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const velocity = distance / deltaTime

    if (distance < swipeThreshold || velocity < velocityThreshold) {
      return { direction: 'none', distance, velocity }
    }

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (absDeltaX > absDeltaY) {
      return {
        direction: deltaX > 0 ? 'right' : 'left',
        distance,
        velocity
      }
    } else {
      return {
        direction: deltaY > 0 ? 'down' : 'up',
        distance,
        velocity
      }
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const point = getTouchPoint(touch)
    setTouchStart(point)
    setTouchEnd(null)

    // Long press detection
    const timer = setTimeout(() => {
      setIsLongPressing(true)
      onLongPress?.()
      toast.success("Appui long détecté")
    }, longPressDelay)
    setLongPressTimer(timer)
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (isLongPressing) return

    const touch = e.touches[0]
    const point = getTouchPoint(touch)
    setTouchEnd(point)

    // Cancel long press if moved
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()
    
    // Clear long press timer
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      setLongPressTimer(null)
    }

    if (isLongPressing) {
      setIsLongPressing(false)
      return
    }

    if (!touchStart) return

    const touch = e.changedTouches[0]
    const point = getTouchPoint(touch)
    setTouchEnd(point)

    // Double tap detection
    const now = Date.now()
    const timeDiff = now - lastTap
    if (timeDiff < 300 && timeDiff > 0) {
      onDoubleTap?.()
      toast.success("Double tap détecté")
      setLastTap(0)
      return
    }
    setLastTap(now)

    // Swipe detection
    if (touchStart && touchEnd) {
      const swipe = getSwipeDirection(touchStart, touchEnd)
      
      if (swipe.direction !== 'none') {
        switch (swipe.direction) {
          case 'up':
            onSwipeUp?.()
            toast.success("Swipe vers le haut")
            break
          case 'down':
            onSwipeDown?.()
            toast.success("Swipe vers le bas")
            break
          case 'left':
            onSwipeLeft?.()
            toast.success("Swipe vers la gauche")
            break
          case 'right':
            onSwipeRight?.()
            toast.success("Swipe vers la droite")
            break
        }
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleWheel = (e: WheelEvent) => {
    // Handle mouse wheel for desktop testing
    if (e.deltaY < -50) {
      onSwipeUp?.()
    } else if (e.deltaY > 50) {
      onSwipeDown?.()
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: false })
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [touchStart, touchEnd, lastTap, longPressTimer, isLongPressing])

  return (
    <div
      ref={containerRef}
      className={`touch-none select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {children}
    </div>
  )
}

// Hook for mobile gestures
export function useMobileGestures() {
  const [gestures, setGestures] = useState({
    swipeUp: 0,
    swipeDown: 0,
    swipeLeft: 0,
    swipeRight: 0,
    doubleTap: 0,
    longPress: 0
  })

  const handleSwipeUp = () => {
    setGestures(prev => ({ ...prev, swipeUp: prev.swipeUp + 1 }))
  }

  const handleSwipeDown = () => {
    setGestures(prev => ({ ...prev, swipeDown: prev.swipeDown + 1 }))
  }

  const handleSwipeLeft = () => {
    setGestures(prev => ({ ...prev, swipeLeft: prev.swipeLeft + 1 }))
  }

  const handleSwipeRight = () => {
    setGestures(prev => ({ ...prev, swipeRight: prev.swipeRight + 1 }))
  }

  const handleDoubleTap = () => {
    setGestures(prev => ({ ...prev, doubleTap: prev.doubleTap + 1 }))
  }

  const handleLongPress = () => {
    setGestures(prev => ({ ...prev, longPress: prev.longPress + 1 }))
  }

  return {
    gestures,
    handlers: {
      onSwipeUp: handleSwipeUp,
      onSwipeDown: handleSwipeDown,
      onSwipeLeft: handleSwipeLeft,
      onSwipeRight: handleSwipeRight,
      onDoubleTap: handleDoubleTap,
      onLongPress: handleLongPress
    }
  }
}

