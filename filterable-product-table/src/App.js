import './App.css';
import React from 'react';

// Bottom up approach building from the smallest component 
// Component to specify each product's category in the table rows
class ProductCategoryRow extends React.Component{
  render(){
    const category = this.props.category
    return(
      <tr>
        <th colSpan='2'>{category}</th>
      </tr>
    )
  }
}

// Component to specify each product's name and price in the table rows. If the product is out of stock, the name of the product is marked in red
class ProductRow extends React.Component{
  render(){
    const product = this.props.product
    const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
    return(<tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>)
  }
}

// Component which houses the product rows and the product category rows 
// Gets the search text and the checkbox value via props from the parent FilterableProductTable and modifies and passes them back using callbacks
class ProductTable extends React.Component{ 
  render(){
    const filter = this.props.filter
    const inStockOnly = this.props.inStockOnly
    const rows =[]
    let lastCategory = null
    
    this.props.products.forEach(product => {
      if(product.name.toLowerCase().indexOf(filter.toLowerCase()) === -1) return 
      if(inStockOnly && !product.stocked) return 
      if(product.category != lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>)
      }
      rows.push(<ProductRow product={product} key={product.name}/>)
      lastCategory = product.category
    });

    return(<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>)
  }
}

// Component for the search bar 
// Gets the search text and the checkbox value via props from the parent FilterableProductTable and modifies and passes them back using callbacks
class SearchBar extends React.Component{
  constructor(props){
    super(props)
  }

  handleOnFilterChange = (event) => {
    this.props.onFilterChange(event.target.value)
  }

  handleOnInStockChange = (event) => {
    this.props.onInStockChange(event.target.checked)
  }

  render(){
    const filter = this.props.filter
    const inStockOnly = this.props.inStockOnly
    return(<form>
      <input type='text' placeholder='Search for...' value={filter} onChange={this.handleOnFilterChange}/>
      <p>
        <input type='checkbox' checked={inStockOnly} onChange={this.handleOnInStockChange}/>
        {' '}
        Only show products in stock
      </p>
    </form>)
  }
}

// Parent component which houses the search bar and the product table
// This component maintains the state of the search text and the checkbox and passes them to the other child 
// components - SearchBar and ProductTable
class FilterableProductTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {searchText: '', inStockOnly: false}
  }

  handleFilterChange = (filterText) => {
    console.log(filterText)
    this.setState({searchText: filterText})
  }

  handleInStockChange = (inStock) => {
    console.log(inStock)
    this.setState({inStockOnly: inStock})
  }

  render(){ 
    return(<div>
      <SearchBar filter={this.state.searchText} inStockOnly={this.state.inStockOnly}
            onFilterChange={this.handleFilterChange} onInStockChange={this.handleInStockChange}/>
      <ProductTable products={this.props.products} filter={this.state.searchText} inStockOnly={this.state.inStockOnly}/>
    </div>)
  }
}

// Sample products
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

function App() {
  return (
      <FilterableProductTable products={PRODUCTS}/>
  );
}

export default App;
