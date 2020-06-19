import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const products = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <th className='category' colSpan='2'>
        {category}
      </th>
    </tr>
  );
};

const ProductRow = ({ product }) => {
  const name = product.stocked ? product.name : <span style={{ color: "red" }}>{product.name}</span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

const ProductTable = (props) => {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const rows = [];
  let lastCategory = null;

  props.products.forEach((product) => {
    const name = product.name.toLowerCase();

    if (name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const SearchBar = (props) => {
  return (
    <form>
      <input type='text' placeholder='Search' value={props.filterText} onChange={(e) => props.onFilterTextChange(e)} />
      <input
        id='stockCheck'
        type='checkbox'
        onChange={(e) => props.onInStockChange(e)}
        checked={props.inStockOnly}
      />{" "}
      <label htmlFor='stockCheck'>Only show products in stock</label>
    </form>
  );
};

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextChange(e) {
    setFilterText(e.target.value);
  }

  function handleInStockChange(e) {
    setInStockOnly(e.target.checked);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={(e) => handleFilterTextChange(e)}
        onInStockChange={(e) => handleInStockChange(e)}
      />
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

ReactDOM.render(<FilterableProductTable products={products} />, document.getElementById("root"));
