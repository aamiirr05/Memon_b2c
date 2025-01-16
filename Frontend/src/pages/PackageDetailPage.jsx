import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePackageStore } from '../store/usePackageStore';
import ErrorPage from './ErrorPage';

const PackageDetailPage = () => {
  const { packageId } = useParams();
  const { packages, selectedPackage, setSelectedPackage } = usePackageStore();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!selectedPackage || selectedPackage.id !== packageId) {
      const pkg = packages.find((pkg) => pkg.id === packageId);

      if (pkg) {
        setSelectedPackage(pkg);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }
  }, [packageId, selectedPackage, packages, setSelectedPackage]);

  if (notFound) return <ErrorPage />;

  if (!selectedPackage || selectedPackage.id !== packageId) {
    return <div>Loading package details...</div>;
  }

  return (
    <div>
      PackageDetailPage:
      <pre>{JSON.stringify(selectedPackage, null, 2)}</pre>
    </div>
  );
};

export default PackageDetailPage;
