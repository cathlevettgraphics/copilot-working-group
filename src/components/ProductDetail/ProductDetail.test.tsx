import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ProductDetail } from './index';
import { renderWithProviders, createTestQueryClient } from '../../test/utils';
import { QueryClient } from '@tanstack/react-query';
import type { Product } from '../../types/product';

// Mock product data for testing
const mockProduct: Product = {
  id: 1,
  title: 'Smartphone X Pro',
  description: 'A powerful smartphone with amazing features',
  category: 'smartphones',
  price: 899.99,
  rating: 4.5,
  stock: 25,
  brand: 'TechBrand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 day return policy',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

describe('ProductDetail Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    // Pre-populate the cache with mock product data
    queryClient.setQueryData(['product', 1], mockProduct);
  });

  it('renders product information correctly when data is loaded', async () => {
    renderWithProviders(<ProductDetail />, {
      queryClient,
      route: '/products/1',
    });

    // Test Behavior: Verify that product information is displayed to the user
    await waitFor(() => {
      expect(screen.getByText('Smartphone X Pro')).toBeInTheDocument();
    });
    
    expect(screen.getByText('$899.99')).toBeInTheDocument();
    expect(screen.getByText('A powerful smartphone with amazing features')).toBeInTheDocument();
  });

  it('displays product metadata including brand, category, stock and rating', async () => {
    renderWithProviders(<ProductDetail />, {
      queryClient,
      route: '/products/1',
    });

    // Test Behavior: Verify that product metadata is visible to users
    await waitFor(() => {
      expect(screen.getByText('Brand')).toBeInTheDocument();
    });
    
    expect(screen.getByText('TechBrand')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('Stock')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText(/4\.5/)).toBeInTheDocument();
  });

  it('provides navigation back to products list', async () => {
    renderWithProviders(<ProductDetail />, {
      queryClient,
      route: '/products/1',
    });

    // Test Behavior: Verify users can navigate back to the product list
    const backLink = await screen.findByText('← Back to Products');
    expect(backLink).toBeInTheDocument();
    expect(backLink.tagName).toBe('A');
  });

  it('displays add to cart button for user interaction', async () => {
    renderWithProviders(<ProductDetail />, {
      queryClient,
      route: '/products/1',
    });

    // Test Behavior: Verify that an enabled add-to-cart button is displayed
    await waitFor(() => {
      expect(screen.getByText('Smartphone X Pro')).toBeInTheDocument();
    });
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeEnabled();
  });
});
