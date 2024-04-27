import { UsersUI } from "features";
import { Preloader } from "components";
import { useState } from "react";
import { product, product2, product3, product4 } from "assets";

const Users = () => {
  const [products, setProducts] = useState<any[]>(
    [
      {
        image: product,
        name: "Samsung Galaxy S21 Ultra 5G - 6.8'' (256GB/12GB) Silver",
        price: "₦ 596,400"
      },
      {
        image: product2,
        name: "iPhone 13 Pro Max - 6.7'' (256GB) - Graphite",
        price: "₦ 724,800"
      },
      {
        image: product3,
        name: "Google Pixel 6 Pro - 6.7'' (128GB/12GB) - Stormy Black",
        price: "₦ 532,900"
      },
      {
        image: product4,
        name: "Xiaomi Redmi Note 10 - 6.43'' (128GB/6GB) - Onyx Gray",
        price: "₦ 89,500"
      },
      {
        image: product,
        name: "OnePlus 9 Pro - 6.7'' (256GB/12GB) - Morning Mist",
        price: "₦ 815,200"
      },
      {
        image: product2,
        name: "Huawei P40 Pro - 6.58'' (256GB/8GB) - Silver Frost",
        price: "₦ 674,600"
      },
      {
        image: product3,
        name: "Sony Xperia 1 III - 6.5'' (256GB/12GB) - Frosted Black",
        price: "₦ 890,300"
      },
      {
        image: product4,
        name: "LG Wing 5G - 6.8'' (256GB/8GB) - Aurora Gray",
        price: "₦ 468,700"
      },
      {
        image: product,
        name: "Motorola Edge 20 Pro - 6.7'' (256GB/12GB) - Midnight Blue",
        price: "₦ 703,900"
      },
      {
        image: product2,
        name: "ASUS ROG Phone 5 - 6.78'' (256GB/16GB) - Phantom Black",
        price: "₦ 952,100"
      },
      {
        image: product3,
        name: "Realme GT - 6.43'' (256GB/12GB) - Racing Yellow",
        price: "₦ 548,700"
      },
      {
        image: product4,
        name: "Oppo Find X3 Pro - 6.7'' (256GB/12GB) - Gloss Black",
        price: "₦ 769,200"
      },
      {
        image: product,
        name: "Vivo X60 Pro+ - 6.56'' (256GB/12GB) - Deep Ocean Blue",
        price: "₦ 812,600"
      },
      {
        image: product2,
        name: "Lenovo Legion Phone Duel 2 - 6.92'' (256GB/18GB) - Titanium White",
        price: "₦ 1,049,800"
      },
      {
        image: product3,
        name: "BlackBerry KEY2 LE - 4.5'' (64GB/4GB) - Atomic Red",
        price: "₦ 185,300"
      },
      {
        image: product4,
        name: "Nokia G50 - 6.82'' (128GB/6GB) - Blue",
        price: "₦ 169,400"
      },
      {
        image: product,
        name: "HTC Desire 20 Pro - 6.5'' (128GB/6GB) - Smoky Black",
        price: "₦ 219,900"
      },
      {
        image: product2,
        name: "ZTE Axon 30 Ultra 5G - 6.67'' (256GB/12GB) - Black",
        price: "₦ 792,400"
      },
      {
        image: product3,
        name: "Tecno Phantom X - 6.7'' (256GB/8GB) - Starry Night Blue",
        price: "₦ 368,200"
      },
      {
        image: product4,
        name: "Infinix Note 11 Pro - 6.95'' (256GB/8GB) - Emerald Green",
        price: "₦ 254,600"
      },
      {
        image: product,
        name: "HTC Desire 20 Pro - 6.5'' (128GB/6GB) - Smoky Black",
        price: "₦ 219,900"
      },
      {
        image: product,
        name: "ZTE Axon 30 Ultra 5G - 6.67'' (256GB/12GB) - Black",
        price: "₦ 792,400"
      },
      {
        image: product2,
        name: "Tecno Phantom X - 6.7'' (256GB/8GB) - Starry Night Blue",
        price: "₦ 368,200"
      },
      {
        image: product3,
        name: "Infinix Note 11 Pro - 6.95'' (256GB/8GB) - Emerald Green",
        price: "₦ 254,600"
      }
    ]
    
  );


  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const info = [];
  for (let i = 1; i <= totalPages; i++) {
    info.push({
      label: i.toString(),
      value: i.toString(),
    });
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <UsersUI
        products={paginatedProducts}
        pagination={{
          handleChange: handlePageChange,
          total: totalPages,
          current: currentPage,
          count: totalProducts,
          limit: productsPerPage,
          info: info,
        }}
      />
    </>
  );
};

export { Users };
