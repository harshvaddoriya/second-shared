export default function MediaPreview({ mediaData, previewComponentMap }) {
  if (!mediaData) return null;

  const typeKey =
    mediaData.type?.toLowerCase() || mediaData.detectedType?.toLowerCase();
  const renderComponent =
    previewComponentMap?.[typeKey] || previewComponentMap?.photo;

  return (
    <div style={{ margin: "2rem 0" }}>
      {renderComponent?.({ data: mediaData })}
    </div>
  );
}
