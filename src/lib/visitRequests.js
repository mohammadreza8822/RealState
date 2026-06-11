import { getVisitRequests, getProfileById } from "@/lib/repository";

export async function getEnrichedVisitRequests() {
  const requests = await getVisitRequests();

  const enriched = await Promise.all(
    requests.map(async (req) => {
      const listing = await getProfileById(req.listingId);
      const listingImage = Array.isArray(listing?.image)
        ? listing.image[0]
        : listing?.image || null;

      return {
        ...req,
        listingTitle: listing?.title || "آگهی حذف شده",
        listingImage,
      };
    })
  );

  return enriched;
}
