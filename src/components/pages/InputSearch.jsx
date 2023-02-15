
const InputSearch = (props) => {
    return ( 
        <div>
              <label htmlFor='filterClothes'>Clothes:</label>

                <input
                    type='text'
                    id='filterClothes'
                    // control the input using the method and value pass in as props
                    value={props.value}
                    onChange={props.handleFilterChange}
                />   
        </div>
     );
}
 
export default InputSearch;