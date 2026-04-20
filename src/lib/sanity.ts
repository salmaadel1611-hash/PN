import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const sanityConfig =
  typeof projectId === 'string' && projectId.length > 0 && typeof dataset === 'string' && dataset.length > 0
    ? { projectId, dataset }
    : null;

export const sanityEnabled = sanityConfig !== null;

export const client = sanityConfig
  ? createClient({
      ...sanityConfig,
      apiVersion: '2025-01-01',
      useCdn: true
    })
  : null;

// Backward-compatible alias.
export const sanityClient = client;

export const imageBuilder = client ? imageUrlBuilder(client) : null;

function isSanityImageSource(source: unknown): source is SanityImageSource {
  if (typeof source === 'string') {
    return source.length > 0;
  }

  if (!source || typeof source !== 'object') {
    return false;
  }

  const value = source as Record<string, unknown>;

  if (typeof value._ref === 'string' || typeof value._id === 'string' || typeof value.url === 'string') {
    return true;
  }

  if (!value.asset || typeof value.asset !== 'object') {
    return false;
  }

  const asset = value.asset as Record<string, unknown>;

  return typeof asset._ref === 'string' || typeof asset._id === 'string' || typeof asset.url === 'string';
}

export function urlFor(source: unknown) {
  if (!imageBuilder || !isSanityImageSource(source)) {
    return null;
  }

  return imageBuilder.image(source);
}
