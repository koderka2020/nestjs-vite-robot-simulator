// Basic test setup for Vitest
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock fetch globally for API calls
global.fetch = vi.fn()

// Mock Audio for sound effects
global.Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
  pause: vi.fn(),
  currentTime: 0,
  duration: 0,
  volume: 1,
}))
