import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Tabletop from '../Tabletop'

// Mock the API calls
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Tabletop Click Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    
    // Mock successful API responses
    mockFetch.mockImplementation((url) => {
      if (url.includes('/latest')) {
        return Promise.resolve({
          json: () => Promise.resolve(null) // No existing robot position
        })
      }
      if (url.includes('/robot-history')) {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 'test-id',
            x: 1,
            y: 1,
            direction: 'up'
          })
        })
      }
      return Promise.reject(new Error('Unknown URL'))
    })
  })

  it('should place robot on table when clicking within tabletop area', async () => {
    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Find a square within the tabletop (5x5 grid)
    const square = screen.getByTestId('square-1-1')
    
    // Click on the square
    await act(async () => {
      fireEvent.click(square)
    })
    
    // Wait for async operations to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Verify API calls were made (simplified check)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/robot-history',
      expect.objectContaining({
        method: 'DELETE'
      })
    )
    
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/robot-history',
      expect.objectContaining({
        method: 'POST'
      })
    )
  })

  it('should not place robot when clicking outside tabletop area', async () => {
    await act(async () => {
      render(<Tabletop />)
    })
    
    // Wait for component to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50))
    })
    
    // Get the instruction text (outside the grid area)
    const instructionText = screen.getByText('Click on the table to place the robot, use the buttons or arrows to move the robot')
    
    // Click on the instruction text (outside the grid)
    await act(async () => {
      fireEvent.click(instructionText)
    })
    
    // Verify no POST call was made for robot placement
    const robotHistoryCalls = mockFetch.mock.calls.filter(call => 
      call[0].includes('/robot-history') && call[1]?.method === 'POST'
    )
    expect(robotHistoryCalls).toHaveLength(0)
  })
})
