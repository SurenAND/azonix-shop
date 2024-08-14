import { ProductType } from '@/src/api/product/product.type';
import Pagination from '@/src/components/shared/pagination/Pagination';
import ProductCard from '@/src/components/shared/products/product-card/ProductCard';
import { Toaster } from 'sonner';

type ProductsPropsType = {
  products: ProductType[];
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
};

const Products = ({
  products,
  totalPages,
  page,
  setPage,
}: ProductsPropsType) => {
  return (
    <>
      <Toaster richColors />

      {/* products */}
      <section className='ms-3 mt-8 flex flex-wrap justify-center gap-5 sm:ms-14'>
        {products?.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </section>

      {/* pagination */}
      {products && (
        <Pagination
          page={page}
          totalPages={totalPages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
    </>
  );
};

export default Products;
