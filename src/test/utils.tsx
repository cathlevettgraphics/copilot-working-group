import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
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
  productId?: string;
}

// Create a wrapper that includes all necessary providers
export const createTestWrapper = ({ queryClient, route = '/', productId = '1' }: TestWrapperOptions = {}) => {
  const client = queryClient || createTestQueryClient();

  // Create routes for testing
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => null,
  });
  const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products/$productId',
    component: () => null,
  });

  const routeTree = rootRoute.addChildren([indexRoute, productRoute]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [route],
    }),
    context: undefined,
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <CartProvider>
        <RouterProvider router={router as any}>
          {children}
        </RouterProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

// Custom render function
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & TestWrapperOptions
) {
  const { queryClient, route, productId, ...renderOptions } = options || {};
  const Wrapper = createTestWrapper({ queryClient, route, productId });

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export { createTestQueryClient };
