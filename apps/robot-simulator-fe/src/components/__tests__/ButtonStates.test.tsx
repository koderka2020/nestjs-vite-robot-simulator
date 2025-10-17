import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Tabletop from '../Tabletop'

// Mock the API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Button States Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  it('should disable all buttons when no robot is on the table (no DB records)', async () => {
    // Mock API to return no existing robot position
    mockFetch.mockImplementation((url) => {
      if (url.includes('/latest')) {
        return Promise.resolve({
          json: () => Promise.resolve(null) // No existing robot position
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Check that key buttons are disabled (testing representative buttons)
    const moveButton = screen.getByRole('button', { name: /move/i })
    const leftButton = screen.getByRole('button', { name: /left/i })
    
    expect(moveButton).toBeDisabled()
    expect(leftButton).toBeDisabled()
  })

  it('should enable all buttons when robot is on the table (DB has records)', async () => {
    // Mock API to return existing robot position
    mockFetch.mockImplementation((url) => {
      if (url.includes('/latest')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 'test-id',
            x: 2,
            y: 3,
            direction: 'up'
          })
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Check that key buttons are enabled (testing representative buttons)
    const moveButton = screen.getByRole('button', { name: /move/i })
    const leftButton = screen.getByRole('button', { name: /left/i })
    
    expect(moveButton).not.toBeDisabled()
    expect(leftButton).not.toBeDisabled()
  })
})
