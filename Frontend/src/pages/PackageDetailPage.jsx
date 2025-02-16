import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePackageStore } from '../store/usePackageStore';
import ErrorPage from './ErrorPage';
import ShareButton from '../components/ShareButton';
import BentoGrid from '../components/PackageDetailPage/BentoGrid';
import TabComponent from '../components/PackageDetailPage/TabComponent';
import Loader from '../components/Loader';

const PackageDetailPage = () => {
  const { packageId } = useParams();
  const {
    packages,
    selectedPackage,
    setSelectedPackage,
    fetchPackageById,
    isFetching,
  } = usePackageStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

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

  if (isFetching)
    return (
      <div className="w-screen h-[calc(100dvh-116px)] flex justify-center items-center">
        <Loader />
      </div>
    );

  if (!isFetching && selectedPackage === null) return <ErrorPage />;

  const pageUrl = window.location.href;
  const pageTitle = selectedPackage.package_name;

  return (
    <main className="bg-peach/10">
      <section>
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="flex justify-between items-start lg:items-center py-12">
            <h1 className="text-4xl text-darkgreen font-medium flex-1 font-zodiak">
              {selectedPackage.package_name}
            </h1>
            <ShareButton url={pageUrl} title={pageTitle} />
          </div>
          <BentoGrid images={selectedPackage.package_image} />
          <TabComponent />
          {/* <pre>{JSON.stringify(selectedPackage, null, 2)}</pre> */}
        </div>
      </section>
    </main>
  );
};

export default PackageDetailPage;
