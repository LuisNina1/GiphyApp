import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('SearchBAr', () => {
  test('should render searchBar correctly', () => {
    const { container } = render(<SearchBar onQuery={() => { }} />)
    expect(container).toMatchSnapshot()
  })
  test('shopuld call onQuery with the correct value after 700ms', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />)

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled()
      expect(onQuery).toHaveBeenCalledWith('test')

    })
  })

  test('should call only once with the last value (debaunce)', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />)

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 't' } })
    fireEvent.change(input, { target: { value: 'te' } })

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1)
      expect(onQuery).toHaveBeenCalledWith('te')

    })
  })

  test('should call onQUery when button clicked with the input value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith('test');


  })

  test('should the input has the correct placeholder value', () => {
    render(<SearchBar onQuery={()=>{}} placeHolder="buscar"/>)
    expect(screen.getByPlaceholderText('buscar')).toBeDefined()
  })

}) 