import PropertyCard from './PropertyCard';import PropertyCard from './PropertyCard';

import PropertyCardSkeleton from './PropertyCardSkeleton';import PropertyCardSkeleton from './PropertyCardSkeleton';



export default function PropertyGrid({ loading, properties }) {export default function PropertyGrid({ loading, properties }) {

  if (loading) {  if (loading) {

    return (    return (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {Array.from({ length: 6 }).map((_, i) => (        {Array.from({ length: 6 }).map((_, i) => (

          <PropertyCardSkeleton key={i} />          <PropertyCardSkeleton key={i} />

        ))}        ))}

      </div>      </div>

    );    );

  }  }



  return (  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {properties.map((property) => (      {properties.map((property) => (

        <PropertyCard key={property.id} property={property} />        <PropertyCard key={property.id} property={property} />

      ))}      ))}

    </div>    </div>

  );  );

}}

