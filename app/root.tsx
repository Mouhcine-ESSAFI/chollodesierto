import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import favicon from '~/assets/favicon.svg';
import tailwindCss from '~/styles/tailwind.css?url';

export type RootLoader = typeof loader;

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod, currentUrl, nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export function links() {
  return [
    {rel: 'stylesheet', href: tailwindCss},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const},
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Patua+One&family=Nunito:wght@400;600;700;800&display=swap',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, customerAccount, cart, env} = context;
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({storefront, publicStorefrontId: env.PUBLIC_STOREFRONT_ID}).catch(() => null),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root');
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {data?.shop ? (
          <Analytics.Provider cart={data.cart} shop={data.shop} consent={data.consent}>
            {children}
          </Analytics.Provider>
        ) : children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;
  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#F5EDE0'}}>
      <div style={{textAlign:'center'}}>
        <p style={{fontSize:'6rem',color:'#C45A2C',fontFamily:'sans-serif'}}>{errorStatus}</p>
        <p style={{color:'#1A1F2E'}}>{errorMessage}</p>
      </div>
    </div>
  );
}
