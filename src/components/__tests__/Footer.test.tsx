import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
