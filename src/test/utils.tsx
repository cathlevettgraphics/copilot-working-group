import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { CartProvider } from '../contexts/CartContext';

// Create a test QueryClient with no retries
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface TestWrapperOptions {
  queryClient?: QueryClient;
  route?: string;
}

/**
 * Custom render function that wraps component with all necessary providers.
 * 
 * This function sets up the component for testing with:
 * - QueryClient for React Query
 * - RouterProvider for TanStack Router
 * - CartProvider for cart context
 * 
 * Note: The component is rendered through the router's route configuration
 * rather than as children, to properly simulate the routing behavior.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & TestWrapperOptions
) {
  const { queryClient, route = '/products/1', ...renderOptions } = options || {};
  const client = queryClient || createTestQueryClient();

  // Create routes for testing - component is rendered via route configuration
  const rootRoute = createRootRoute();
  
  const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products/$productId',
    component: () => ui,
  });

  const routeTree = rootRoute.addChildren([productRoute]);
  
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [route],
    }),
  });

  // Render with all providers - RouterProvider handles component rendering
  return {
    ...render(
      <QueryClientProvider client={client}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryClientProvider>,
      renderOptions
    ),
  };
}

export { createTestQueryClient };
