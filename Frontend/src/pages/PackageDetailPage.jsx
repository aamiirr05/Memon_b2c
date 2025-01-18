import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePackageStore } from '../store/usePackageStore';
import ErrorPage from './ErrorPage';

const PackageDetailPage = () => {
  const { packageId } = useParams();
  const { packages, selectedPackage, setSelectedPackage, fetchPackageById } =
    usePackageStore();

  useEffect(() => {
    if (!selectedPackage || selectedPackage.package_id !== packageId) {
      const pkg = packages.find((pkg) => pkg.package_id === packageId);

      if (pkg) {
        setSelectedPackage(pkg);
      } else {
        fetchPackageById(packageId);
      }
    }
  }, [packageId, selectedPackage, packages, setSelectedPackage]);

  if (selectedPackage === null) return <ErrorPage />;

  return (
    <div>
      PackageDetailPage:
      <pre>{JSON.stringify(selectedPackage, null, 2)}</pre>
    </div>
  );
};

export default PackageDetailPage;
