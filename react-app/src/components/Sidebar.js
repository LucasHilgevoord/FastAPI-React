import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ categories, onFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedOption(null); // Reset selected option when category changes
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        // Call the onFilter function with selected category and option
        onFilter(selectedCategory, option);
    };

    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {categories.map((category, index) => (
                        <div key={index}>
                            <a className="nav-link px-0 align-middle">
                                <i className={"fs-4 bi " + category.icon}></i> <span className="ms-1 d-none d-sm-inline">{category.name}</span> 
                            </a>
                            <ul className="nav flex-column ms-1" id={"submenu" + index} data-bs-parent="#menu">
                                {category.options.map((option, optionIndex) => (
                                    <li key={optionIndex} className="w-100">
                                        <div className="ms-1 pt-0">
                                            <input type='checkbox' name={"option" + index} className='me-2' onChange={() => handleOptionChange(option)}/>
                                            <label className="d-none d-sm-inline" > {option[0]} </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
        // <div className="sidebar">
        //   {categories.map((category, index) => (
        //     <div key={index}>
        //       <h3>{category.name}</h3>
        //       <ul>
        //         {category.options.map((option, optionIndex) => (
        //           <li key={optionIndex}>
        //             <button
        //               className={option === selectedOption ? 'active' : ''}
        //               onClick={() => handleOptionChange(option)}>
        //               {option}
        //             </button>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   ))}
        // </div>
    );
};

export default Sidebar;
