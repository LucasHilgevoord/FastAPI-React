const Content = () => {

    const onSearch = async (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.searchInput.value;

        console.log('Search term:', searchTerm);
    };

    const onSearchChanged = async (event) => {
        const searchValue = event.target.value;

        // Return possible matches
        console.log('Search value:', searchValue);
    };

    return (
        <div className='container blox'>
            <form className="d-flex" onSubmit={onSearch}>
                <input className="form-control me-2" type="search" name="searchInput" placeholder="Search" aria-label="Search" onChange={onSearchChanged} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Content;