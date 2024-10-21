import React from 'react';

const CategorySkeleton = () => {
  return (
    <section className="box-border border border-white py-8  shadow-lg rounded-lg h-auto w-full flex flex-col justify-between ">
      <h1 className="text-2xl font-semibold text-black mb-4 text-center dark:text-white">
        Categorias mais Assistidas
      </h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-skeleton-fade mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-200 animate-skeleton-fade mb-1 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-200 animate-skeleton-fade rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySkeleton;
