import { memo } from "react";
import { useOffering } from "@Providers/OfferingProvider";
import useOfferingState from "@State/useOfferingState";
import { ImageFile } from "@Types/image";
import ImageGallery from "@Components/UI/organisms/ImageGallery";
import Loading from "@Components/UI/molecules/Loading";
import { sortImagesByDefault } from "@Tools/utils";
import "./index.less";
import Alert from "@Components/UI/atoms/Alert";

export interface OfferingGalleryPanelProps {
  loading: boolean;
  error: any;
  images: ImageFile[];
}
export interface OfferingGalleryPanelState {
  imagePreviewVisible: boolean;
  galleryModalVisible: boolean;
  previewImageIndex: number;
}

export const OfferingGalleryPanel = memo(
  ({ loading, error, images }: OfferingGalleryPanelProps) => {
    return !error ? (
      loading ? (
        <Loading size={30} className="w-100" />
      ) : images?.length > 0 ? (
        <ImageGallery loading={loading} error={error} images={images} />
      ) : null
    ) : (
      <Alert type="error" showIcon message={error?.message} />
    );
  }
);

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingState(id);
  let { images } = data?.data || {};
  images = sortImagesByDefault(images);

  return (
    <OfferingGalleryPanel
      loading={isLoading}
      error={error}
      images={images}
      {...props}
    />
  );
};
