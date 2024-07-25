import { ProductType } from "@/src/api/product/product.type";
import Pagination from "@/src/components/shared/pagination/Pagination";
import ProductCard from "@/src/components/templates/shop/products/product-card/ProductCard";
import { Dispatch, SetStateAction } from "react";

type ProductsPropsType = {
  products: ProductType[];
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Products = ({
  products,
  totalPages,
  page,
  setPage,
}: ProductsPropsType) => {
  return (
    <>
      <section className="flex gap-5 justify-center flex-wrap ms-14 mt-8">
        {products.map((product, index) => (
          <ProductCard product={product} index={index} />
        ))}
      </section>
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
