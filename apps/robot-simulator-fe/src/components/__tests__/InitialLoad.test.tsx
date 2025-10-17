import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Tabletop from '../Tabletop'

// Mock the API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Initial Load Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  it('should fetch and display robot position on page load when robot exists in database', async () => {
    // Mock API to return existing robot position
    mockFetch.mockImplementation((url) => {
      if (url.includes('/latest')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 'test-id',
            x: 2,
            y: 3,
            direction: 'right'
          })
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load and fetch data
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Verify API call was made to fetch latest position
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/robot-history/latest')
    
    // Verify robot is displayed at the correct position (2,3)
    const robotSquare = screen.getByTestId('square-2-3')
    expect(robotSquare).toBeInTheDocument()
    
    // Verify at least one button is enabled (Move button as example)
    const moveButton = screen.getByRole('button', { name: /move/i })
    expect(moveButton).not.toBeDisabled()
  })

  it('should handle empty database gracefully on page load', async () => {
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
    
    // Wait for component to load and fetch data
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Verify API call was made to fetch latest position
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/robot-history/latest')
    
    // Verify grid squares exist
    const square00 = screen.getByTestId('square-0-0')
    expect(square00).toBeInTheDocument()
    
    // Verify buttons are disabled since no robot exists
    const moveButton = screen.getByRole('button', { name: /move/i })
    expect(moveButton).toBeDisabled()
  })

  it('should handle API error gracefully on page load', async () => {
    // Mock API to return an error
    mockFetch.mockImplementation((url) => {
      if (url.includes('/latest')) {
        return Promise.reject(new Error('Network error'))
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load and handle error
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Verify API call was attempted
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/robot-history/latest')
    
    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error))
    
    // Verify component still renders and buttons are disabled (default state)
    const moveButton = screen.getByRole('button', { name: /move/i })
    expect(moveButton).toBeDisabled()
    
    // Clean up
    consoleSpy.mockRestore()
  })
})
