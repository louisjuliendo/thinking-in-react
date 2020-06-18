import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// eslint-disable-next-line
const products = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;

    return (
      <tr>
        <th className='category' colSpan='2'>
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{ color: "red" }}>{product.name}</span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}
class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
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
  }
}
class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Search'
          value={this.props.filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
        <input
          id='stockCheck'
          type='checkbox'
          onChange={(e) => this.props.onInStockChange(e.target.checked)}
          checked={this.props.inStockOnly}
        />{" "}
        <label for='stockCheck'>Only show products in stock</label>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterText: "", inStockOnly: false };
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly,
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={(e) => this.handleFilterTextChange(e)}
          onInStockChange={(e) => this.handleInStockChange(e)}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

ReactDOM.render(<FilterableProductTable products={products} />, document.getElementById("root"));
