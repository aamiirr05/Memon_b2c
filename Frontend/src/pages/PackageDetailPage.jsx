import { usePackageStore } from '../store/usePackageStore';

const PackageDetailPage = () => {
  const { selectedPackage } = usePackageStore();

  return (
    <div>
      PackageDetailPage:
      <pre>{JSON.stringify(selectedPackage, null, 2)}</pre>
    </div>
  );
};

export default PackageDetailPage;
