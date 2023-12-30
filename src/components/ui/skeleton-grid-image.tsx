import { SkeletonImage } from "@/components/ui/skeleton-image"

export const SkeletonGridImage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
      <SkeletonImage/>
      <SkeletonImage/>
      <SkeletonImage/>
      <SkeletonImage/>
      <SkeletonImage/>
      <SkeletonImage/>
    </div>
  )
}