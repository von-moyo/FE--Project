import { SearchIcon } from "assets";
import styles from "./styles.module.scss";
import { Button } from "components/button";

interface SearchProps {
  className?: string;
  value: string;
  placeholder: string;
  handleChange: (val: string) => void;
  submit: (val: string) => void;
}

const Search: React.FC<SearchProps> = ({
  className,
  handleChange,
  submit,
  value,
  placeholder,
}) => {
  return (
    <div
      className={`${styles.searchContainer} ${className}`}
    >
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        type="search"
      />
      <div className={styles.icon}>
        <Button
          type="primary"
          onClick={()=>{submit(value)}}
          className={styles.btn}
        >
          <SearchIcon/>
        </Button>
      </div>
    </div>
  );
};

export { Search };
