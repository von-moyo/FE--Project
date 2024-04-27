import {
  MiniCard,
  Pagination,
} from "components";
import styles from "./styles.module.scss";
import * as React from "react";

interface UsersProps {
  products: any[];
  pagination: {
    handleChange: (page: any) => void;
    total: number;
    current: number;
    count: number;
    limit: number;
    info: any[];
  };
}

const UsersUI: React.FC<UsersProps> = ({
  products,
  pagination,
}) => {

  return (
    <div className={styles.users}>
      <h1 className={styles.ttl}>Products</h1>
      <section className={styles.miniCard}>
        {products.map((item, index) => (
          <MiniCard
            key={index}
            header={item.name}
            users={item.price}
            image={item.image}
          />
        ))}
      </section>

      <Pagination
        info={pagination.info}
        currentPage={pagination.current}
        totalPages={pagination.total}
        handleChange={pagination.handleChange}
        totalCount={pagination.count}
        pageLimit={pagination.limit}
        name={"Users"}
      />
    </div>
  );
};

export { UsersUI };
