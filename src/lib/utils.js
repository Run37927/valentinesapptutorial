import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @param {number} price
 * @returns {string}
 * @example
 *  formatPrice(10.99)    // Returns "CA$10.99"
 *  formatPrice(1000)     // Returns "CA$1,000.00"
 *  formatPrice(50.5)     // Returns "CA$50.50"
 */
export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });

  return formatter.format(price);
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TODO: update this
export function constructMetadata({
  title = "can you go out with me",
  description = "customize your questions and images to create a unique experience for your special someone",
  image = "/openGraph.png",
  icons = "/favicon.ico",
} = {}) {
  return {
    title,
    description,
    icons,
    openGraph: {
      title,
      description,
      siteName: "can you go out with me",
      url: "https://valentinesapptutorial.vercel.app",
      type: "website",
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@hairunhuang",
    },
    metadataBase: new URL('https://valentinesapptutorial.vercel.app')
  };
}