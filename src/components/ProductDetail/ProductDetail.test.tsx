import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductDetail } from './index';

// Mock the child components to isolate ProductDetail behavior
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">Navigation</div>,
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => <div data-testid="product-image">Image</div>,
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => <div data-testid="product-info">Info</div>,
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => <div data-testid="product-meta">Meta</div>,
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => <div data-testid="product-actions">Actions</div>,
}));

describe('ProductDetail Component', () => {
  it('renders all child components in the correct structure', () => {
    render(<ProductDetail />);

    // Test Behavior: Verify that all child components are rendered
    // This tests the key user-facing behavior that all parts of the product detail are visible
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();
  });

  it('renders with correct layout structure for proper visual organization', () => {
    const { container } = render(<ProductDetail />);

    // Test Behavior: Verify the component has the correct layout structure
    // This ensures the UI is organized correctly for users
    const containerDiv = container.querySelector('[class*="container"]');
    expect(containerDiv).toBeInTheDocument();

    const productDiv = container.querySelector('[class*="product"]');
    expect(productDiv).toBeInTheDocument();

    const infoSection = container.querySelector('[class*="infoSection"]');
    expect(infoSection).toBeInTheDocument();
  });

  it('displays product navigation as the first element for easy access', () => {
    const { container } = render(<ProductDetail />);

    // Test Behavior: Verify navigation is displayed first for user accessibility
    // This ensures users can easily navigate back to the product list
    const containerDiv = container.querySelector('[class*="container"]');
    const firstChild = containerDiv?.firstElementChild;
    expect(firstChild).toContainElement(screen.getByTestId('product-navigation'));
  });

  it('groups info, meta, and actions in the same section for cohesive display', () => {
    const { container } = render(<ProductDetail />);

    // Test Behavior: Verify info section contains the expected child components
    // This ensures product details are logically grouped for better user experience
    const infoSection = container.querySelector('[class*="infoSection"]');
    expect(infoSection).toBeInTheDocument();

    // All three components should be within the infoSection
    const info = screen.getByTestId('product-info');
    const meta = screen.getByTestId('product-meta');
    const actions = screen.getByTestId('product-actions');

    expect(infoSection?.contains(info)).toBe(true);
    expect(infoSection?.contains(meta)).toBe(true);
    expect(infoSection?.contains(actions)).toBe(true);
  });
});
